import { Response,Request } from "express";
import UserService from "../services/userService";
import ApiResponse from "../utils/ApiResponse";

export default class UserController{
    private userService:UserService;
    constructor(){
        this.userService= new UserService()
    }

    async getUserList(req:Request,res:Response){
        const list = await this.userService.userList()
        res.status(200).json(ApiResponse.successResponse({
            status:200,
            message:"data retrieved successfully",
            data:list
        }))
    }
}