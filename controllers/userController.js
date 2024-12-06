const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcrypt');
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
        return res.send("<script>alert('Cannot find user.');location.href='/auth/login'</script>");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.send("<script>alert('Wrong password.');location.href='/auth/login'</script>");
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, /*{ expiresIn: '1h' }*/);
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
        res.send(201).redirect('/auth/login');
    } else {
        res.send("Register Failed");
    }
});

// 로그아웃
// GET /auth/logout
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

// 마이페이지
// GET /auth
const myPage = asyncHandler(async (req, res) => {
    const reservations = await Reservation.find({ user_id : req.user.id}).populate('restaurant_id', 'rest_name').sort({ reservation_date : -1 });;
    const restaurant = await Restaurant.find({ reviews : { $elemMatch: { user_id : req.user.id } }});
    
    await User.populate(restaurant.reviews, 'user_id');

    res.render('myPage', {
        title : "My Page",
        token : req.cookies.token,
        reservations : reservations,  // EJS에서 reservations 배열을 사용할 수 있음
        restaurants : restaurant,
        userId : req.user.id
    });
});

module.exports = { 
    getLogin,
    loginUser,
    getRegister,
    registerUser,
    logout,
    myPage
};