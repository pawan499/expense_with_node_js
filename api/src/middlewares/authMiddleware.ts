import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import JwtUtil from "../auth/jwtimpl/jwtUtil";
import RadisUtil from "../utils/RadisUtil";

export const authMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
    const token=JwtUtil.extractToken(req);
    const isBlackListed= await RadisUtil.isTokenBlacklisted(token)
    if(!token || isBlackListed){
        return res.status(401).json(ApiResponse.errorResponse({
            status:401,
            message:"User authentication failed!",
            error:{
                type:"authorization",
                message:"Invalid or missing token",
            },
            path:req?.originalUrl
            
        })) 
    }
   try{
     const decode = JwtUtil.verifyToken(token);
      (req as any).user=decode
       next()    
   }catch(err){
     
        return res.status(401).json(ApiResponse.errorResponse({
            status:401,
            message:"User authentication failed!",
            error:{
                type:"authorization",
                message:"Invalid or Expired  token",
            },
            path:req?.originalUrl
            
        })) 
    
   }  
}