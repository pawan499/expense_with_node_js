import ValidationError from "../errors/ValidationError";
import UserRegisterRequest, { validateUser } from "../interfaces/userinterfaces/UserRegisterRequest";
import UserRepository from "../repositories/userRepository";
import UserRegisterResponse from "../interfaces/userinterfaces/UserRegisterResponse";
import bcrypt from 'bcryptjs';
import LoginRequest, { validateLoginRequest } from "../interfaces/userinterfaces/LoginRequest";
import AuthError from "../errors/AuthError";
import LoginResponse from "../interfaces/userinterfaces/LoginResponse";
import JwtUtil from "./jwtimpl/jwtUtil";
import UserData from "../interfaces/userinterfaces/UserData";
import RadisUtil from "../utils/RadisUtil";
import LogoutResponse from "../interfaces/userinterfaces/LogoutResponse";
import { Request } from "express";
export default class AuthService {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }
    private static saltRound = 10;
    async registerUser(userData: UserRegisterRequest) {
        const { isValid, error } = validateUser(userData)
        if (!isValid) {
            throw new ValidationError({ status: 400, message: "User registration failed!", errors: error, error: undefined })
        }
        const exisingUser = await this.userRepository.findUserByEmail(userData.email)
        if (exisingUser) {
            throw new ValidationError({
                status: 409,
                message: "User registration failed !",
                error: {
                    type: "conflict",
                    message: "Email is already in use"
                },
            })
        }

        const hashPassword = await bcrypt.hash(userData.password, AuthService.saltRound)
        const createdUser = await this.userRepository.createUser({
            ...userData, password: hashPassword
        });
        const userResponse = new UserRegisterResponse({
            id: createdUser._id.toString(),
            name: createdUser.name,
            email: createdUser.email,
            mobile: createdUser.mobile
        })
        return userResponse;
    }

    async login(loginRequest: LoginRequest) {
        const { isValid, error } = validateLoginRequest(loginRequest)
        if (!isValid) {
            throw new ValidationError({
                status: 400,
                message: "Login failed !",
                errors: error
            })
        }
        const { email, password } = loginRequest
        const exisingUser = await this.userRepository.findUserByEmail(email);
        if (!exisingUser) {
            throw new AuthError({
                message: "User login failed",
                error: {
                    type: "Authentication",
                    message: "Invalid Username/Password"
                }
            })
        }
        const isAuthenticate = await bcrypt.compare(password, exisingUser.password);
        if (!isAuthenticate) {
            throw new AuthError({
                message: "User login failed",
                error: {
                    type: "Authentication",
                    message: "Invalid Username/Password"
                }
            })
        }
        const access_token = JwtUtil.generateToken({ id: exisingUser._id.toString(), email: exisingUser.email })
        const refresh_token = JwtUtil.generateRefreshToken({ id: exisingUser._id.toString(), email: exisingUser.email })

        const userData = new UserData({
            id: exisingUser._id.toString(),
            name: exisingUser.name,
            email: exisingUser.email,
            mobile: exisingUser.mobile,
            roles: ["User"]
        })
        return new LoginResponse({ token: access_token, refreshToken: refresh_token, user: userData })
    }

    async refreshToken(oldRefreshToken: string) {
        if (!oldRefreshToken) throw new AuthError({ message: "Refresh token required", error: { type: "Authorization" } });

        const isBlacklisted = await RadisUtil.isTokenBlacklisted(oldRefreshToken);
        if (isBlacklisted) throw new AuthError({ message: "Refresh token invalidated", error: { type: "Authorization" } });

        try {
            const decoded: any = JwtUtil.verifyRefreshToken(oldRefreshToken);
            const newAccessToken = JwtUtil.generateToken({ id: decoded.id, email: decoded.email });
            return { accessToken: newAccessToken };
        } catch (err) {
            throw new AuthError({ message: "Invalid refresh token", error: { type: "Authorization" } });
        }
    }


    async logout(refreshToken: string | null) {
    
            if (!refreshToken) {
                throw new AuthError({
                    message: "Failed to logout!",
                    error: {
                        type: "Authorization",
                        message: "Token required for logout!"
                    }
                })
            }

            try {
                const decoded: any = JwtUtil.verifyRefreshToken(refreshToken)
                const expInSec = decoded.exp - Math.floor(Date.now() / 1000);
                await RadisUtil.blacklistToken(refreshToken, expInSec)
                console.log("✅ Token blacklisted successfully");
                return new LogoutResponse({
                    status: 200,
                    message: "Logout successfully"
                })
            } catch (err) {
                console.log(err);
                throw new AuthError({
                    message: "Failed to logout!",
                    error: {
                        type: "Authorization",
                        message: "Invalid or missing token"
                    }
                })

            }
        }
}

