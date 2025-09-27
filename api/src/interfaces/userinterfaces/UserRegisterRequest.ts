export default class UserRegisterRequest{
    name:string;
    email:string;
    mobile:string;
    password:string;

    constructor({name,email,mobile,password}:{name:string,email:string,mobile:string,password:string}){
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.password=password
    }
}

export const validateUser=(userData:UserRegisterRequest)=>{
    const {name,email,mobile,password}=userData;
    const err:{ field: string; message: string }[]=[]
    if(name.trim()===""){
        err.push({
            field:"name",
            message:"Name is required"
        })
    }else if(name.trim().length<2){
        err.push({
            field:"name",
            message:"Name is to short !"
        })
    }

    if(email.trim()===""){
        err.push({
            field:"email",
            message:"Email is required!"
        })
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())){
        err.push({
            field:"email",
            message:"Invalid email address!"
        })
    }

    if(mobile.trim()===""){
        err.push({
            field:"mobile",
            message:"Mobile is required !"
        })
    }else if(!/^\d{10}$/.test(mobile.trim())){
        err.push({
            field:"mobile",
            message:"Invalid mobile number !"
        })
    }

    if(password.trim()===""){
         err.push({
            field:"password",
            message:"Password is required !"
        })
    }else if(password.trim().length<6){
         err.push({
            field:"password",
            message:"Password should have atleast 6 character!"
        })
    }

    return {
        isValid:err.length===0,
        error:err
    }
}