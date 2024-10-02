import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js"

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const{ firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    if( !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender || 
        !password ||
        !role){
            return next(new ErrorHandler("Please Fill Full Form", 400))
        }
    const user = await User.findOne({ email })
    if(user){
        return next(new ErrorHandler("User already register", 400))
    }
    user = await User.create({firstName, lastName, email, phone, nic, dob, gender, password, role});
    generateToken(user, "User Registered", 200, res);
});

export const login = catchAsyncErrors(async(req,res,next) =>{
    const { email, password, confirmpassword, role } =req.body;
    if(!email || !password || !confirmpassword || !role){
        return next(new ErrorHandler("Please Provide All Details!", 400))
    }
    if(password != confirmpassword){
        return next(new ErrorHandler("Confirm password do not match", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    if(role != user.role){
        return next(new ErrorHandler("User with this role not found", 400))

    }
    generateToken(user, "User Registered", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const { firstName, lastName, email, phone, nic, dob, gender, password} = req.body
})