const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const verifyToken = asyncHandler(async(req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = req.cookies.token;

    if(!token) {
        res.status(401);
        throw new Error('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Invalid or expired token.');
    }
});

module.exports = verifyToken;