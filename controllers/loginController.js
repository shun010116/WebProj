const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;

// 로그인 페이지
// GET /auth/login
const getLogin = (req, res) => {
    res.render('login', {
        title : "Login"
    });
};

// 로그인
// POST /auth/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(401).json({ message: "일치하는 이용자가 없습니다." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/')
});

// 등록 페이지
// GET /auth/signup
const getRegister = (req, res) => {
    res.render('register', {
        title : "Sign UP"
    });
};

// 이용자 등록
// POST /auth/sighup
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if(password === password2) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.send(201).json({ message: "Register Successful", user });
    } else {
        res.send("Register Failed");
    }
});

// 로그아웃
// GET /logout
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = { 
    getLogin,
    loginUser,
    getRegister,
    registerUser,
    logout
};
