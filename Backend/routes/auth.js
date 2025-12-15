import express from 'express'
import User from '../models/user.js'
import { protect } from '../middleware/midauth.js';
import jwt from "jsonwebtoken"

const router = express.Router();


router.post('/reg',async (req,res)=>{
 const {username,email,password} = req.body;
    try{

       if(!username || !email || !password){
        return res.status(400).json({message: "Please fill all fields"})
       }

       const userExists = await User.findOne({email});
       if(userExists){
        return res.status(400).json({message:"user already exists"})
       }
         
       const user = await User.create({username, email ,password});
       const token = generateToken(user._id);

       res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token,
       })

    }catch(error){
       res.status(500).json({message: "Server error"})
    }
})



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check all fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4. Success response
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            message: "Login successful"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



router.get("/me",protect, async (req,res)=>{
    res.json(200).json(req.user)
})


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "30d"})
}



export default router;