import { NextFunction, Router } from "express";
import AuthController from "../controllers/authController";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()
const controller = new AuthController()
router.post("/auth/register", asyncHandler( async (req,res,next)=>controller.register(req,res)))
router.post("/auth/login", asyncHandler( async (req,res,next)=>controller.login(req,res)))
router.post("/auth/refresh", asyncHandler( async (req,res,next)=>controller.refreshToken(req,res)));
router.post("/auth/logout",authMiddleware,asyncHandler(async(req,res,next)=>controller.logout(req,res)))
export default router