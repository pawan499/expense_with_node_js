import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverId:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:[true,"message is required!"]
    },

    read:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)
export default Message;