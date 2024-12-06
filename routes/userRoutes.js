const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const userController = require('../controllers/userController');
const checkLogin = require('../middleware/checkLogin');
const verifyToken = require('../middleware/verifyToken');

router.use(cookieParser());

router.route('/')
    .get(checkLogin, verifyToken, userController.myPage);
router.route('/login')
    .get(userController.getLogin)
    .post(userController.loginUser);
router.route('/register')
    .get(userController.getRegister)
    .post(userController.registerUser);
router.route('/logout')
    .get(userController.logout);

module.exports = router;