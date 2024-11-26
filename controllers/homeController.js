const asyncHandler = require("express-async-handler");

// homepage
// GET /
const getHompage = (req, res) => {
    res.render("home", {
        title : "Restaurant Review & Reservation"
    });
}

module.exports = { getHompage };