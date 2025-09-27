import mongoose from "mongoose";


export enum EXPENSE_TYPE{
    GAIN=1,
    EXPENSE=2
}

const expenseSchema= new mongoose.Schema({
    expense_type:{
        type:Number,
         enum:[1,2],
        required:[true,"Expense type is required!"],
    },
    amount:{
        type:Number,
        required:[true,"Amount is required!"]
    },
    description:{
        type:String,
        required:[true,"Description is required!"]
    },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"User not found!"]
   }
},{timestamps:true})

export const Expense = mongoose.model("Expense",expenseSchema)

