import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// function for Adding Products
const addProduct = async (req, res) => {
  try {
    console.log('Отримані файли:', req.files); // Перевірте, чи файли є
    
    const { name, description, price, category, subCategory, brand } = req.body;

    // Перевірка наявності файлів
    if (!req.files) {
      return res.status(400).json({ success: false, message: "Файли не отримані" });
    }

    // 1. Конвертуємо об'єкт файлів у масив
    const filesArray = Object.values(req.files).map(fileArray => fileArray[0]);

    // 2. Фільтруємо null/undefined (якщо якісь файли не були передані)
    const validFiles = filesArray.filter(file => file !== undefined && file !== null);

    console.log('Валідні файли для завантаження:', validFiles);

    // Завантажуємо на Cloudinary
    const uploadPromises = validFiles.map(file => {
      return new Promise((resolve, reject) => {
        // Створюємо потік для завантаження
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "pet-shop/products",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) {
              console.error('Помилка завантаження на Cloudinary:', error);
              reject(error);
            } else {
              console.log('Успішно завантажено:', result.secure_url);
              resolve(result.secure_url);
            }
          }
        );

        // Відправляємо буфер файлу у потік
        uploadStream.end(file.buffer);
      });
    });

    // 4. Очікуємо завершення всіх завантажень
    const imagesUrl = await Promise.all(uploadPromises);
    console.log('Усі URL зображень:', imagesUrl);

    // 5. Створюємо продукт у базі даних
    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      brand,
      images: imagesUrl
    });

    res.status(201).json({ 
      success: true, 
      message: "Товар успішно додано",
      product
    });

  } catch (error) {
    console.error('Помилка при додаванні товару:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Помилка сервера',
      errorDetails: error // Додаткові деталі для дебагінгу
    });
  }
};


// function for Listing Products
const listProducts = async(req, res) => {

}

// function for Removing Products
const removeProduct = async(req, res) => {

}

// function for single Product Info
const singleProduct = async(req, res) => {

}

export {addProduct, listProducts, removeProduct, singleProduct}