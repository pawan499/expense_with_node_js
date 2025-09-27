import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exists!"],
    lowercase: true, 
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address!",
    ],
  },
  mobile: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;
