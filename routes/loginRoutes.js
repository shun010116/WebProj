const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/login')
    .get(loginController.getLogin)
    .post(loginController.loginUser);
router.route('/signup')
    .get(loginController.getRegister)
    .post(loginController.registerUser);

module.exports = router;