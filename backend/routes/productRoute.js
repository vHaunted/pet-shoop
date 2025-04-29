import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';

const productRouter = express.Router();
  productRouter.post('/add', async (req, res, next) => {
    try {
      upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
      ])(req, res, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}, addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/list', listProducts);

export default productRouter;
