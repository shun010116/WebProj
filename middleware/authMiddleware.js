const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;

// 인증 미들웨어
const authMiddleware = asyncHandler(async (req, res, next) => {
    // 요청 헤더에서 토큰 가져오기
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        res.status(401)
        throw new Error('Access denied. No token provided.');
    }

    try {
        // JWT 토큰 검증
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
       res.status(400);
       throw new Error('Invalid token.');
    }
});

module.exports = authMiddleware;