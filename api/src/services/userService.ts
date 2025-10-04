import UserData from "../interfaces/userinterfaces/UserData";
import UserRepository from "../repositories/userRepository"

export default class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository()
    }

    async userList() {
        const users = await this.userRepository.listUser();
        const list:any=[]
        users.forEach((user)=>{
            const u= new UserData({
                id:user._id.toString(),
                name:user.name,
                email:user.email,
                mobile:user.mobile,
                roles:[],
            })
            list.push(u)
        })
        return list

    }
}