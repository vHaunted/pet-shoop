import userModel from '../models/userModel.js'

const populateOptions = {
  path: 'cartData.items.product',
  select: 'name price images'
};
// add products to user cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId)
      .populate(populateOptions);

    if (!user) return res.status(404).json({ success: false, message: "Користувача не знайдено" });

    if (!user.cartData) user.cartData = { items: [] };

    const existingItem = user.cartData.items.find(item => 
      item.product._id.toString() === req.body.itemId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartData.items.push({ 
        product: req.body.itemId, 
        quantity: 1 
      });
    }

    await user.save();
    const populatedUser = await user.populate(populateOptions);

    res.json({
      success: true,
      cartData: populatedUser.cartData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// update user cart 
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await userModel.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "Користувача не знайдено" });
    }

    // Ініціалізуємо cartData якщо його немає
    if (!user.cartData) user.cartData = { items: [] };

    const itemIndex = user.cartData.items.findIndex(item => 
      item.product.toString() === productId
    );

    if (quantity > 0) {
      if (itemIndex >= 0) {
        user.cartData.items[itemIndex].quantity = quantity;
      } else {
        user.cartData.items.push({ product: productId, quantity });
      }
    } else if (itemIndex >= 0) {
      user.cartData.items.splice(itemIndex, 1);
    }

    await user.save();
    const populatedUser = await user.populate(populateOptions);
    
    // Відправляємо ТІЛЬКИ ОДНУ відповідь
    res.json({ 
      success: true,
      message: "Кошик оновлено",
      cartData: populatedUser.cartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// get user cart
const getUserCart = async (req, res) => {
  try {
    console.log('Отримано запит:', req.method, req.body);
    const user = await userModel.findById(req.userId)
      .populate('cartData.items.product', 'name price images');
    
    if (!user) {
      return res.status(404).json({ success: false, message: "Користувача не знайдено" });
    }

    res.json({ 
      success: true,
      cartData: user.cartData || { items: [] }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addToCart, updateCart, getUserCart }