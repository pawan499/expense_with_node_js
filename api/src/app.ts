import express, { NextFunction,Request,Response } from 'express'
import authRoute from './routers/authRoute'
import expenseRoute from './routers/expenseRoutes'
import { errorHandler } from './middlewares/errorHandler.middlerware'
import { authMiddleware } from './middlewares/authMiddleware'
import ApiResponse from './utils/ApiResponse'
import messageRoute from './routers/messageRoutes'
import userRoute from './routers/userRoute'

import cors from "cors";
const app =express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
app.use(cors({
    origin: "*", 
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.get("/", authMiddleware,(req,res)=>{
    res.status(200).json({message:"Wellcome boss!"})
})

app.use("/api",authRoute)
app.use("/api",userRoute)
app.use("/api",expenseRoute)
app.use("/api",messageRoute)


app.use((req,res)=>{
    res.status(404).json(ApiResponse.errorResponse({
        status:404,
        message:"Resource not found!",
        path:req.originalUrl
    }))
})
app.use((err:any,req:Request,res:Response,next:NextFunction)=>errorHandler(err,req,res,next))
export default app;