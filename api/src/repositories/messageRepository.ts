import { Types } from "mongoose";
import MessageRequest from "../interfaces/messageInterfaces/MessageRequest";
import Message from "../models/Message";

export default class MessageRepository {
    async create(messageBody: MessageRequest) {
        const message = new Message({
            message: messageBody.message,
            receiverId: messageBody.receiverId,
            senderId: messageBody.senderId,
            read:false
        })
        return await message.save()
    }

    async getConversation(senderId:string, receiverId:string) {
      
        console.log("senderId",senderId);
        console.log("receiverId",receiverId);
        
        
        return await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId:senderId },
            ],
        }).sort({ createdAt: 1 });
    }

    async getUreadCountWithUser(userId:string){
        return await Message.find({
            receiverId:userId,
            read:false
        })
    }

    async updateAll(receiverId: string,senderId:string, updateData: any) {
        console.log("repo",receiverId,updateData);
        
    return await Message.updateMany(
        { receiverId: new Types.ObjectId(receiverId),senderId:new Types.ObjectId(senderId) },
        { $set: updateData }
    );
}
}