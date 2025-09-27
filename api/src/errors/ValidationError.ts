export default class ValidationError extends Error {
    status: number;
    errors: { field: string; message: string }[] |undefined
    error:any
    constructor({ status = 500, message, errors,error }: { status: number, message: string, errors?: { field: string; message: string }[]|undefined ,error?:{}|undefined}) {
        super(message || "Something went wrong")
        this.status = status;
        this.errors = errors;
        this.error=error

        Object.setPrototypeOf(this, ValidationError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }

    }
}