const express = require("express");
const router = express.Router();
const { getHompage } = require("../controllers/homeController");

router.route("/").get(getHompage);

module.exports = router;