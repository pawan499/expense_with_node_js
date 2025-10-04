import ValidationError from "../errors/ValidationError";
import MessageRequest from "../interfaces/messageInterfaces/MessageRequest";
import MessageResponse from "../interfaces/messageInterfaces/MessageResponse";
import MessageRepository from "../repositories/messageRepository";

export default class MessageService {
    private messageRepository: MessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository()
    }

    async createMessage(messageBody: MessageRequest) {
        if (!messageBody.receiverId) {
            throw new ValidationError({
                status: 400,
                message: "Receiver Id requiered!"
            })
        }

        if (!messageBody.senderId) {
            throw new ValidationError({
                status: 400,
                message: "Sender  Id requiered!"
            })
        }
        const result = await this.messageRepository.create(messageBody)
        const data = new MessageResponse({
            message: result.message,
            receiverId: result.receiverId.toString(),
            senderId: result.senderId.toString(),
            createdDate: result.createdAt.toISOString()
        })
        return data;
    }

    async getConversasion(senderId:string,receiverId:string) {        
        const result = await this.messageRepository.getConversation(senderId, receiverId)
        const conversation:any = []
        result.forEach((message) => {
            const m = new MessageResponse({
                message: message.message,
                receiverId: message.receiverId.toString(),
                senderId: message.senderId.toString(),
                createdDate: message.createdAt.toISOString()
            })
            conversation.push(m)
        })

        return conversation
    }

    async getUnreadMessages(userId:string){
        const messages=await this.messageRepository.getUreadCountWithUser(userId)
        const unreadCount:{[key:string]:number}={}
        messages.forEach((message)=>{
            if(!message.read){
                unreadCount[message.senderId.toString()]=(unreadCount[message.senderId.toString()] || 0) + 1
            }
        })
        console.log(unreadCount);
        const arr:any=[]
        Object.keys(unreadCount).forEach(element => {
            arr.push({[element]:unreadCount[element]})
        });
        return arr
    }

    async updateMessages(receiverId:string,senderId:string,updateData:any){
        return await this.messageRepository.updateAll(receiverId,senderId,updateData)
    }
}