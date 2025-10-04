export default class MessageResponse {
    receiverId: string;
    senderId: string;
    message: string;
    createdDate: string;

    constructor({ receiverId, senderId, message, createdDate }: {
        receiverId: string;
        senderId: string;
        message: string;
        createdDate: string;
    }) {
        this.createdDate = createdDate,
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message
    }
}