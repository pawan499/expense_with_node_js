import { Request, Response } from "express";
import ExpenseService from "../services/expenseService";
import ApiResponse from "../utils/ApiResponse";
import { parseListQuery } from "../utils/queryparser";

export default class ExpenseController{
    private expenseService:ExpenseService

    constructor(){
        this.expenseService=new ExpenseService()
    }
    async createExpense(req:Request,res:Response){
        const expense=req.body;
        const userId= (req as any).user.id     
        const result= await this.expenseService.createExpense(expense,userId)
        res.status(201).json(ApiResponse.successResponse({
            status:201,
            message:"Expense created successfully",
            data:result
        }))
    }

    async listExpense(req:Request,res:Response){
        const id=(req as any).user.id
        const options = parseListQuery(req, "expenses");
        console.log(id);
        const result= await this.expenseService.listOfExpense(id,options);

        res.status(200).json(ApiResponse.successResponse({
            status:200,
            message:"Data retrieved successfully!",
            data:result
        }))
    }
    async deleteExpense(req:Request,res:Response){
        const expenseId= req?.params?.id
        const result =await this.expenseService.deleteExpense(expenseId)
        res.status(200).json(ApiResponse.successResponse({
            message:"Expense deleted successfuly",
            data:result,
            status:200
        }))
    }

     async updateExpense(req:Request,res:Response){
        const expenseId= req?.params?.id
        const result =await this.expenseService.updateExpense(expenseId,req.body)
        res.status(200).json(ApiResponse.successResponse({
            message:"Expense updated successfuly",
            data:result,
            status:200
        }))
    }
}