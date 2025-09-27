import AuthService from "../auth/authService";
import ValidationError from "../errors/ValidationError";
import ExpenseCreateRequest, { validateExpenseRequest } from "../interfaces/expenseInterfaces/ExpenseCreateRequest";
import ExpenseCreateResponse from "../interfaces/expenseInterfaces/ExpenseCreateResponse";
import { EXPENSE_TYPE } from "../models/Expense";
import ExpenseRepository from "../repositories/expenseRepository";
 export default class ExpenseService{
    private expenseRepository:ExpenseRepository;
    constructor(){
        this.expenseRepository= new ExpenseRepository()
    }
    async createExpense(expenseReq:ExpenseCreateRequest,userId:string){
         const {isValid,errors}=validateExpenseRequest(expenseReq)
        if(!isValid){
            throw new ValidationError({
                status:400,
                message:"Failed to create expense request!",
                errors:errors
            })
        }
       
        const result = await this.expenseRepository.create({...expenseReq,user:userId})

        const data= new ExpenseCreateResponse({
            id:result._id.toString(),
            expense_type:result.expense_type as EXPENSE_TYPE,
            amount:result.amount,
            description:result.description,
            date:result.createdAt

        })
        return data
    }

    async deleteExpense(id:string){
        const result = await this.expenseRepository.deleteById(id)
        if(result){
            return new ExpenseCreateResponse({
                id:result?._id.toString(),
                expense_type:result?.expense_type,
                amount:result.amount,
                description:result?.description,
                date:result?.createdAt
            })
        }else{
            throw new ValidationError({
                status:404,
                message:"Expense not found",
                error:{
                    type:"Not found",
                    message:`Expense is not found id with ${id}`
                }
            })
        }
    }

    async updateExpense(id:string,updatedData:ExpenseCreateRequest){
          const result = await this.expenseRepository.updateById(id,updatedData)
        if(result){
            return new ExpenseCreateResponse({
                id:result?._id.toString(),
                expense_type:result?.expense_type,
                amount:result.amount,
                description:result?.description,
                date:result?.createdAt
            })
        }else{
            throw new ValidationError({
                status:404,
                message:"Expense not found",
                error:{
                    type:"Not found",
                    message:`Expense is not found id with ${id}`
                }
            })
        }
    }

    async listOfExpense(userId:string){
        const result =await this.expenseRepository.findAll(userId) 
        if(result){
            const list:any=[]
            result.forEach(data=>{
                const exp=new ExpenseCreateResponse({
                    id:data._id.toString(),
                    expense_type:data.expense_type,
                    amount:data.amount,
                    description:data.description,
                    date:data.createdAt
                })
                list.push(exp)
            })
            return list;
        }
    }
}