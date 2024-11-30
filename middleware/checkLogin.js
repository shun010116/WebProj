const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const checkLogin = async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    const token = req.cookies.token;
    if(!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }
};

module.exports = checkLogin; // 예약과 관련된 일을 할 때 필요