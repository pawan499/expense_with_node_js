export default class UserRegisterResponse{
    id:string;
    name:string;
    email:string;
    mobile:string;
    constructor({id,name,email,mobile}:{id:string,email:string,name:string,mobile:string}){
        this.id=id;
        this.name=name;
        this.email=email;
        this.mobile=mobile;
    }
}