import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/user.js"
import {hash, compare} from 'bcrypt'
import { createToken } from "../utils/tokenmanager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
} catch (error) {
    console.log(error);
    return res.status(200).json({message:"ERROR", cause: error.message})
}
};
export const userSignup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {name, email, password}=req.body;
    // Check for existing user to avoid duplicate key error (E11000)
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(409).json({ message: "EMAIL_ALREADY_REGISTERED" });
    }
    const hashedPassword = await hash(password ,10);
    const user = new User({name,email,password: hashedPassword});
    await user.save();
    //create token and store cookie
    res.clearCookie(COOKIE_NAME,{
        httpOnly:true,
        domain:"localhost",
        signed:true,
        path:"/"
    });
    const token = createToken(user._id.toString(),user.email, "7D");
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME,token, {path:"/", domain:"localhost",expires,httpOnly: true, signed:true})
    res.status(200).json({ message: "OK", id: user._id.toString(), email: user.email });
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"ERROR", cause: error.message})
}
};
export const userLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {email, password}=req.body;
    const user = await User.findOne({ email });
    if(!user){
        return  res.status(401).send("User not registered.");
    }
    const isPasswordCorrect= await compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(403).send("Incorrect password");
    }
    //create token and store cookies
    res.clearCookie(COOKIE_NAME,{
        httpOnly:true,
        domain:"localhost",
        signed:true,
        path:"/"
    });
    const token = createToken(user._id.toString(),user.email, "7D");
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME,token, {path:"/", domain:"localhost",expires,httpOnly: true, signed:true})
res.status(200).json({ message: "OK", id: user._id.toString(), email:user.email, name: user.name });
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"ERROR", cause: error.message})
}
};
export const verifyUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {email, password}=req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if(!user){
        return  res.status(401).send("User not registered or token malfunctioned.");
    }
    if(user._id.toString()!==res.locals.jwtData.id){
        return res.status(401).send("Permission didnt match!");
    }
    const isPasswordCorrect= await compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(403).send("Incorrect password");
    }
res.status(200).json({ message: "OK", id: user._id.toString(), email:user.email, name: user.name });
} catch (error) {
    console.log(error);
    return res.status(200).json({message:"ERROR", cause: error.message})
}
};

export const checkAuthStatus: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    try {
        console.log('Auth status check - User ID:', res.locals.jwtData.id);
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            console.log('User not found in database');
            return res.status(401).json({ message: "User not found" });
        }
        console.log('Auth status successful for user:', user.email);
        
        const responseData = { 
            message: "OK", 
            id: user._id.toString(), 
            email: user.email, 
            name: user.name 
        };
        
        const endTime = Date.now();
        console.log(`Auth status response time: ${endTime - startTime}ms`);
        
        res.status(200).json(responseData);
    } catch (error) {
        console.log('Auth status error:', error);
        return res.status(500).json({message:"ERROR", cause: error.message})
    }
};
export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Find user by JWT token
        const user = await User.findById(res.locals.jwtData.id);
        
        if (!user) {
            return res.status(401).send("User not registered or token malfunctioned.");
        }
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match!");
        }
        
        // Clear the auth cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        
        return res.status(200).json({ message: "OK" });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};