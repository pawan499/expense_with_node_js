import jwt from 'jsonwebtoken'
import { Request } from 'express'
export default class JwtUtil {
    private static readonly secret = process.env.JWT_SECRET || "Zq3R8mN5tV1xB6sL0cP9hG4yW2jKf7D8"
    private static readonly secret_refresh = process.env.JWT_REFRESH_SECRET || "Zq3R8mN5tV1xB6sL0cP9hG4yW2jKf7D8"

    static generateToken({ id, email }: { id: string, email: string }) {
        return jwt.sign({ id, email }, JwtUtil.secret, { expiresIn: "15m" })
    }

    static generateRefreshToken({ id, email }: { id: string, email: string }) {
        return jwt.sign({ id, email }, JwtUtil.secret_refresh, { expiresIn: "7d" });
    }

    static verifyToken(token: string) {
        return jwt.verify(token, JwtUtil.secret)
    }
    static verifyRefreshToken(token: string) {
        return jwt.verify(token, JwtUtil.secret_refresh);
    }
    static extractToken(req: Request): string | null {
        const header = req.headers.authorization
        if (!header || !header?.startsWith("Bearer ")) {
            return null
        }
        const token: string = header.replace("Bearer ", "")
        return token
    }

}