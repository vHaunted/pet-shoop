import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import validator from 'validator';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET)
}

// Route for User LOGIN 
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        // Перевірка наявності email та password
        if(!email || !password) {
            return res.status(400).json({success:false, message:"Будь ласка, введіть email та пароль"});
        }

        const user = await userModel.findOne({email});
       
        // Check if User Exists
        if(!user) {
            return res.status(401).json({success:false, message:"Користувача не існує"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({success:false, message: 'Неправильні дані'});
        }

        const token = createToken(user._id);
        return res.json({success:true, token});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: "Помилка сервера"});
    }
}

// Route for User REGISTER
const registerUser = async(req, res) => {
    try {
      const {name, email, password} = req.body;
  
      // Валідація email та пароля
      if(!validator.isEmail(email)) {
        return res.json({success:false, message:"Неправильний e-mail"});
      }
      if(password.length < 8) {
        return res.json({success:false, message:"Пароль має містити 8 символів або більше"});
      }
  
      // Перевірка чи користувач вже існує
      const user = await userModel.findOne({email});
      
      if(user) {
        // Якщо користувач існує - виконуємо вхід
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
          return res.json({success:false, message:"Неправильний пароль"});
        }
        const token = createToken(user._id);
        return res.json({success:true, token, message:"Вхід виконано"});
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword
      });
  
      const savedUser = await newUser.save();
      const token = createToken(savedUser._id);
      
      res.json({success:true, token, message:"Реєстрація успішна"});
    } catch (error) {
      console.log(error);
      res.json({success:false, message:error.message});
    }
  }

// Route for ADMIN PANEL
const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const payload = {
                email: email,
                role: 'admin'
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
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