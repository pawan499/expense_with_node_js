import { Request, Response } from "express";
import MessageService from "../services/messageService";
import ApiResponse from "../utils/ApiResponse";
import { parseListQuery } from "../utils/queryparser";
import ValidationError from "../errors/ValidationError";

export default class MessageController {
    private messageService: MessageService;
    constructor() {
        this.messageService = new MessageService()
    }
    async createMessage(req: Request, res: Response) {
        const data = await this.messageService.createMessage(req.body);
        res.status(201).json(ApiResponse.successResponse({
            message: "message created successfully",
            status: 201,
            data: data
        }))
    }

    async converSation(req: Request, res: Response) {
       const receiverId:string=req?.query?.receiverId as string ||""
       const senderId:string=req?.query?.senderId as string||""
       if(!receiverId||!senderId){
        throw new ValidationError({
            status:400,
            message:"id is not valid"
        })
       }
        const data = await this.messageService.getConversasion(senderId,receiverId)
        res.status(200).json(ApiResponse.successResponse({
            message: "data fetched successfuly",
            status: 200,
            data: data
        }))
    }


    async getUreadMessages(req:Request,res:Response){
            const userId= req.params.userId as string
            console.log(userId);
            
            const result= await this.messageService.getUnreadMessages(userId);
            res.status(200).json(ApiResponse.successResponse({
                message:"retrieved",
                data:result,
                status:200
            }))

    }

    async updateAllMessage(req:Request,res:Response){
        const {receiverId,senderId,updateData}=req?.body

        console.log(req?.body);
        
        const result = await this.messageService.updateMessages(receiverId as string,senderId as string,updateData)
        res.status(200).json(ApiResponse.successResponse({
            status:200,
            message:"updated",
            data:result
        }))
    }
}