const asyncHandler = require("express-async-handler");
const Restaurant = require('../models/Restaurant');

// Get homepage
// GET /
const getHompage = asyncHandler(async (req, res) => {
        // let restaurants = await Restaurant.find().sort({ "average_rating": -1 });
        const page = parseInt(req.query.page) || 1;
        const pagesize = 10;
        const skip = (page - 1) * pagesize;
    
        const restaurants = await Restaurant.find()
            .sort({ "average_rating": -1 })
            .skip(skip)
            .limit(pagesize);  
    
        const totalRestaurants = await Restaurant.countDocuments();
        const totalPages = Math.ceil(totalRestaurants / pagesize);

    res.render("home", {
        title : "Restaurants",
        token : req.cookies.token,
        restaurants : restaurants,
        currentPage: page,
        totalPages : totalPages
    });
});

const getSearch = asyncHandler(async (req, res) => {
    const { search } = req.query;
    results = await Restaurant.find({ 
      rest_name: {
        "$regex": new RegExp(search), '$options': 'i'
      } 
    })
    
    res.render("search", {
        title : "Restaurants/search",
        token : req.cookies.token,
        results : results
    })
})


module.exports = { 
    getHompage,
    getSearch
 };