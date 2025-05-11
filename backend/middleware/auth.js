import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Очікуємо "Bearer TOKEN"
    
    if(!token) {
        return res.status(401).json({success:false, message: 'Необхідна авторизація'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id; // Передаємо ID з токена
        next();
    } catch (error) {
        res.status(401).json({success:false, message: 'Недійсний токен'});
    }
}

export default authUser