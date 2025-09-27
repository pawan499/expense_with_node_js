import UserRegisterReques from "../interfaces/userinterfaces/UserRegisterRequest";
import User from "../models/User";
import UserUpdateRequest from "../interfaces/userinterfaces/UserUpdateRequest";

export default class UserRepository{
    async createUser(userData:UserRegisterReques){
        const user= new User({
            name:userData.name,
            email:userData.email,
            mobile:userData.mobile,
            password:userData.password
        });
        
        return await user.save()
    }

    async findUserByEmail(email:string){
        return await User.findOne({email})
    }

    async findByid(id:string){
        return await User.findById(id)
    }

    async listUser(){
        return await User.find()
    }

    async deleteUser(id:string){
        return await  User.findByIdAndDelete(id)
    }

    async updateUser(id:string,updateData:UserUpdateRequest){
        return await User.findByIdAndUpdate(id,updateData)
    }

}