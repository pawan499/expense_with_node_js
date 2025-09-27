export default class UserData {
    id: string;
    name: string;
    email: string;
    mobile: string;
    roles: string[]

    constructor({ id, name, email, mobile, roles }: {
        id: string;
        name: string;
        email: string;
        mobile: string;
        roles: string[]
    }){
        this.id=id;
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.roles=roles
    }
}