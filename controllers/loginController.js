const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const bcrypt = require("bcrypt");

// 로그인 페이지
// GET /auth/login
const getLogin = (req, res) => {
    res.render('login', {
        title : "Login"
    });
};

// 로그인 테스트
// POST /auth/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(email === 'admin' && password ==='1234') {
        res.send('Login Success');
    } else {
        res.send('Login Failed');
    }
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

module.exports = { 
    getLogin,
    loginUser,
    getRegister,
    registerUser
};