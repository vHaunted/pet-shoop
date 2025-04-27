import userModel from "../models/userModel.js"
import validator from 'validator';

// Route for User Login
const loginUser = async(req, res) => {
    res.json({msg:"Login API is Working"})
}

// Route for User Register
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
        if(password.lenght < 8) {
            return res.json({success:false, message:"Пароль має містити 8 символів або більше"})
        }



    } catch {

    }
}

// Route for Admin Panel
const adminLogin = async(req, res) => {
    res.json({msg:"Admin API is Working"})
}

export {loginUser, registerUser, adminLogin}