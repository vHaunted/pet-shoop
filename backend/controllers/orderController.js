import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing Orders using COD(cash on delivery) method =====================
const placeOrder = async(req, res) => {
    try {
        const userId = req.userId;
        const {items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message: "Замовлення оформлено!"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Помилка оформлення замовлення:"+error.message})
    }
}

// Placing Orders using STRIPE method =================================
const placeOrderStripe = async(req, res) => {
    
}

// Placing Orders using RAZORPAY method ====================================
const placeOrderRazorpay = async(req, res) => {
    
}

// All Orders data for ADMIN PANEL ===========================================
const allOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Помилка виводу замовлень!:"+error.message})
    }
}

// USER ORDER DATA for Frontend ===========================================
const userOrders = async(req, res) => {
    try {
        
        const userId = req.userId;
        const {items, amount, address} = req.body;

        const orders = await orderModel.find({ userId });

        res.json({success: true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Помилка оформлення замовлення:"+error.message})
    }
}

// Update ORDER STATUS from ADMIN PANEL ===========================================
const updateStatus = async(req, res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({succes:true, message:'Статус оновлено!'+error.message})
    } catch (error) {
        
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}