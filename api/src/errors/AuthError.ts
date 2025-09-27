export default class AuthError extends Error {
    status: number;
    errors: { field: string; message: string }[] | undefined
    error: any
    constructor({message, errors,error }: {message: string, errors?: { field: string; message: string }[]|undefined ,error?:{}|undefined}) {
        super(message || "Authentication failed!")
        this.status = 401;
        this.errors = errors;
        this.error=error

        Object.setPrototypeOf(this,AuthError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthError);
        }

    }
}