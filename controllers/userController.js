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
// GET /auth/logout
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

// 마이페이지
// GET /auth
const myPage = asyncHandler(async (req, res) => {
    async function getReservationsByUserId(userId) {
        try {
            // user_id에 해당하는 Reservation 데이터를 찾고, restaurant_id를 populate하여 rest_name 가져오기
            // console.log('Looking for reservations for user:', userId);  // userId 확인
            const reservations = await Reservation.find({ user_id: userId })
                .populate('restaurant_id', 'rest_name') // restaurant_id 필드를 populate하여 rest_name만 가져오기
                .exec();

            // reservations 결과 확인
            // console.log('Fetched reservations:', reservations);  // 예약 데이터 출력
            return reservations;
        } catch (err) {
            // console.error('예약 데이터를 가져오는 중 오류 발생:', err);
            throw new Error('Database query failed');
        }
    }

    // user_id에 해당하는 예약 데이터 가져오기
    const reservations = await getReservationsByUserId(req.user.id);

    // console.log('Final reservations:', reservations);  // 최종적으로 EJS에 전달할 예약 데이터
    res.render('myPage', {
        title: "My Page",
        reservations: reservations,  // EJS에서 reservations 배열을 사용할 수 있음
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