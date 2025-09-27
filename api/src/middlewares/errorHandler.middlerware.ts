import { NextFunction ,Request,Response} from "express";
import ApiResponse from "../utils/ApiResponse"

export const errorHandler= (err:any,req:Request,res:Response,next:NextFunction)=>{
    const status= err?.status ||500;
    const message= err?.message ||"Internal Server Error"
    const error=err?.error
    const errors=err?.errors
    return res.status(status).json(ApiResponse.errorResponse({
        status,
        message,
        error,
        errors,
        path:req?.originalUrl
    }))
}