import jwt from 'jsonwebtoken'


const adminAuth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({success:false, message:"Не авторизовано. Спробуйте знову"})
        }
        
        const token = authHeader.split(' ')[1];
        // для перевірки валідності токену
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Не валідний токен"})
    }
}
export default adminAuth;