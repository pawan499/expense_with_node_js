import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/async-handler";
import MessageController from "../controllers/messageController";

const router= Router()
const controller = new MessageController()
router.post("/message",authMiddleware, asyncHandler(async(req,res,next)=>controller.createMessage(req,res)))
router.get("/message",authMiddleware, asyncHandler(async(req,res,next)=>controller.converSation(req,res)))
router.get("/message/:userId",authMiddleware, asyncHandler(async(req,res,next)=>controller.getUreadMessages(req,res)))
router.put("/message",authMiddleware, asyncHandler(async(req,res,next)=>controller.updateAllMessage(req,res)))

export default router