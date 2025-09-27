import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/async-handler";
import ExpenseController from "../controllers/expenseController";

const router= Router()
const controller= new ExpenseController()
router.post("/expense",authMiddleware,asyncHandler(async(req,res,next)=>controller.createExpense(req,res)))
router.get("/expense",authMiddleware,asyncHandler(async(req,res,next)=>controller.listExpense(req,res)))
router.delete("/expense/:id",authMiddleware,asyncHandler(async(req,res,next)=>controller.deleteExpense(req,res)))
router.put("/expense/:id",authMiddleware,asyncHandler(async(req,res,next)=>controller.updateExpense(req,res)))

export default router