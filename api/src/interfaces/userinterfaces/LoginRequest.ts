export default class LoginRequest{
    email:string;
    password:string;
    constructor({email,password}:{email:string,password:string}){
        this.email=email;
        this.password=password
    }
}

export const validateLoginRequest=(loginRequest:LoginRequest)=>{
    const err:{field:string,message:string}[]=[]
     const {email,password}=loginRequest;
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