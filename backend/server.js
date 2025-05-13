import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js"
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';

// App Config
dotenv.config();
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/order', orderRouter)

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req,res)=>{
    res.send('API Working')
})

// Обробка помилок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Щось пішло не так!' });
});

app.listen(port, () => console.log(`Сервер працює на порті: ${port}`));
