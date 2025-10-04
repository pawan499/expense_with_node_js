export default class MessageRequest {
    message: string;
    senderId: string;
    receiverId: string;

    constructor({ message, senderId, receiverId }: {
        message: string;
        senderId: string;
        receiverId: string;
    }) {
        this.message=message;
        this.receiverId=receiverId;
        this.senderId=senderId
    }
}