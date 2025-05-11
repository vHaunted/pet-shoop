import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ success: false, message: 'Токен не передано' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // буде доступний у контролерах
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Невірний токен' });
  }
};

export default adminAuth;