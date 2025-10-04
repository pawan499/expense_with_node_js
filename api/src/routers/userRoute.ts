import { Router } from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router()
const controller = new UserController()
router.get("/user", authMiddleware, asyncHandler((req,res)=>controller.getUserList(req,res)))
export default router