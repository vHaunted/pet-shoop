import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import validator from 'validator';

const createToken = (_id) => {
    return jwr.sign({_id}, process.env.JWT_SECRET)
}

// Route for User LOGIN 
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
       
        // Check if User Exists
        if(!user) {
            return res.json({success:false, message:"Користувача не існує"})
        }

        // 
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch){
            const token = createToken(user._id);
            res.json({success:true, token})
        } else {
            res.json({success:false, message: 'Неправильні дані'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Route for User REGISTER
const registerUser = async(req, res) => {
    try {
        const{name, email, password} = req.body

        // check if user already exists
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false, message:"Користувач вже існує"})
        } 

        // validate email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Неправильний e-mail"})
        }
        if(password.length < 8) {
            return res.json({success:false, message:"Пароль має містити 8 символів або більше"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Route for ADMIN PANEL
const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        } else {
            res.json({success:false, message:"Неправильні дані"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}