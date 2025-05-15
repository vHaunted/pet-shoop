import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// global variables
const currency = 'uah';
const deliveryCharge = 10

// Gateaway initializer
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    try {
        const userId = req.userId;
        const {items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({success: true, session_url: session.url});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Помилка оформлення замовлення: " + error.message});
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const userId = req.userId;
    const { success, orderId } = req.body;

    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Помилка оновлення замовлення: " + error.message});
    }

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

export {placeOrder, placeOrderStripe, verifyStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}