import { EXPENSE_TYPE } from "../../models/Expense";

export default class ExpenseCreateResponse {
    id:string;
    expense_type: EXPENSE_TYPE;
    amount: number;
    description: string;
    date:Date
     constructor({ id,expense_type, amount, description,date}: {
        id:string
        expense_type: EXPENSE_TYPE;
        amount: number;
        description: string;
        date:Date
    }) {
        this.id=id
        this.expense_type=expense_type;
        this.amount=amount;
        this.description=description;
        this.date=date
    }
}