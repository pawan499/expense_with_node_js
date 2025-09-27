import UserData from "./UserData";
export default class LoginResponse{
    token:string;
    refreshToken:string;
    user:UserData;
    constructor({token,refreshToken,user}:{token:string,refreshToken:string,user:UserData}){
        this.token=token;
        this.refreshToken=refreshToken
        this.user=user

    }
}