const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.route("/").get(homeController.getHompage);
router.route("/search").get(homeController.getSearch);

module.exports = router;