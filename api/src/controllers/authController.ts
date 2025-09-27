import AuthService from "../auth/authService";
import { Request,Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import JwtUtil from "../auth/jwtimpl/jwtUtil";
export default class AuthController{
    private authService:AuthService;
    constructor(){
        this.authService=new AuthService()
    }

    async register(req:Request,res:Response){
        const data=await this.authService.registerUser(req.body)
        res.status(201).json(ApiResponse.successResponse({
            status:201,
            message:"User registered successfully!",
            data:data
        }))
    }

    async login(req:Request,res:Response){
        const data= await this.authService.login(req.body);
        res.status(200).json(ApiResponse.successResponse({
            status:200,
            message:"User logged in successfully!",
            data:data
        }))
    }

    async refreshToken(req:Request,res:Response){
        const oldRefreshToken= req.body.refreshToken
        const refreshtoken=await this.authService.refreshToken(oldRefreshToken)
        res.status(200).json(ApiResponse.successResponse({
            message:"token generated",
            status:200,
            data:refreshtoken
        }))
    }
    async logout(req:Request,res:Response){
        const token = JwtUtil.extractToken(req);
        const data=await this.authService.logout(token);
        if(data){
            return res.status(200).json(ApiResponse.successResponse({
                message:data.message,
                status:data.status||200,
                data:null
            }))
        }
    }
}