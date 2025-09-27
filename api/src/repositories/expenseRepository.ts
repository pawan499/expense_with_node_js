import { Expense } from "../models/Expense";

export default class ExpenseRepository{
    async create(expenseReq:any){
        console.log("request ",expenseReq);
        
       const expense= new Expense({
        expense_type:expenseReq.expense_type,
        amount:expenseReq.amount,
        description:expenseReq.description,
        user:expenseReq.user
       })
       return await expense.save()
    }

    async findAll(userId:string,options?:any){
        return await Expense.find({user:userId}).skip(4).limit(10).sort({createdAt:-1})
    }
    async updateById(id:string,updatedData:any){
        return await Expense.findByIdAndUpdate(id,updatedData,{new:true,runValidators:true})
    }

    async deleteById(id:string){
        return await Expense.findByIdAndDelete(id)
    }
}

