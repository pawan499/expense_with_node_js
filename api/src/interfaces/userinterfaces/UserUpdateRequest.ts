export default class UserUpdateRequest{
    name:string;
    email:string;
    mobile:string;
    constructor({name,email,mobile}:{name:string,email:string,mobile:string}){
        this.email=email;
        this.mobile=mobile;
        this.name=name;
    }
}