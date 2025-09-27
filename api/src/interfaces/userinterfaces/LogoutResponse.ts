export default class LogoutResponse{
    status:number;
    message:string;
    constructor({status,message}:{status:200,message:string}){
        this.message=message;
        this.status=status
    }
}