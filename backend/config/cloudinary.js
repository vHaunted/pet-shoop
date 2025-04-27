import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async () => {

    cloudinary.config({
        could_name: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary;