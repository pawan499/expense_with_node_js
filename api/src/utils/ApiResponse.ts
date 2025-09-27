
export default class ApiResponse {
    static successResponse({ message, status, data }: { message: string, status: number, data: any }) {
        return {
            success: true,
            message: message,
            status: status,
            data: data,
            timestamp: new Date()
        }
    }

    static errorResponse({status,message,errors,error,path}:{status:number,message:string,path:string,error?:any,errors?:[]}) {
        return {
            success: false,
            status: status,
            message: message,
            errors:errors,
            error:error?error:undefined,
            timestamp: new Date(),
            path: path
        }

    }
}