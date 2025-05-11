import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {
        items: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, default: 1 }
        }]
    }
}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
