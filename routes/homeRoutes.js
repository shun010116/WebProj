const express = require("express");
const router = express.Router();
const { 
    getHompage,
    getSearch
 } = require("../controllers/homeController");

router.route("/").get(getHompage);
router.route("/search").get(getSearch);

module.exports = router;