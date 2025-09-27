import { EXPENSE_TYPE } from "../../models/Expense"

export default class ExpenseCreateRequest {
    expense_type: EXPENSE_TYPE;
    amount: number;
    description: string;

    constructor({ expense_type, amount, description}: {
        expense_type: EXPENSE_TYPE;
        amount: number;
        description: string;
    }) {
        this.expense_type=expense_type;
        this.amount=amount;
        this.description=description;
    }
}

export const validateExpenseRequest = (expense: ExpenseCreateRequest) => {
    const err:{field:string,message:string}[]=[]
    const {expense_type,amount ,description}= expense;

    if(expense_type===null ||expense_type===undefined){
        err.push({
            field:"expense_type",
            message:"Expense_type is required !"
        })
    }
    else if(!Object.values(EXPENSE_TYPE).includes(expense_type)){
        err.push({
            field:"expense_type",
           message:"Expense type should be only 1 (GAIN) or 2 (EXPENSE)!",
        })
    }

    if(amount===null || amount ===undefined){
        err.push({
            field:"amount",
            message:"Amount is required !"
        })
    }
    else if(amount<0){
        err.push({
            field:"amount",
            message:"amount should not be negative!"
        })
    }

    if(!description||description.trim()===""){
        err.push({
            field:"description",
            message:"description is required!"
        })
    }

    return {
        isValid:err.length===0,
        errors:err
    }
}