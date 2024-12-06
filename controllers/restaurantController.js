const Restaurant = require('../models/Restaurant');
const asyncHandler = require("express-async-handler");
const User = require('../models/User');

// 음식점 목록 조회
// GET /restaurants
const getRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.render("restaurants", {
        title : "Restaurant Review & Reservation",
        token : req.cookies.token,
        restaurant : restaurants
    });
});

// 특정 음식점 상세 조회
// GET /restaurants/:category/:id
const getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).render('404', {
        title : '404'
    });

    await User.populate(restaurant.reviews, 'user_id');

    res.render('restaurant', {
        title : restaurant.rest_name,
        token : req.cookies.token,
        restaurant : restaurant,
        reviews : restaurant.reviews
    })
});

// 특정 카데코리
// GET /restaurants/:category
const getRestaurantsByCategory = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.find({ category : req.params.category });
    if(!restaurant) return res.status(404).render('404', {
        title : '404'
    });
    
    res.render("category", {
        title: req.params.category,
        token : req.cookies.token,
        restaurants : restaurant
    });
});

// 레스토랑 추가
// POST /restaurants
const createRestaurant = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { rest_name, rest_addr, rest_telno, category } = req.body;
    if(!rest_name || !rest_addr || !rest_telno || !category ) {
        return res.status(400).send("필수값을 입력해주세요.");
    }
    const restaurant = await Restaurant.create({
        rest_name,
        rest_addr,
        rest_telno,
        category,
    });
    res.status(201).send("Create Restaurant");
});

// 레스토랑 정보 수정
// PUT /restaurants/:id
const updateRestaurant = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { rest_name, rest_addr, rest_telno, category } = req.body;
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        { rest_name, rest_addr, rest_telno, category },
        {new: true }
    );
    res.status(200).send(updateRestaurant);
});

// 레스토랑 삭제
// DELETE /restaurants/:id
const deleteRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req,params.id);
    if(!restaurant) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Restaurant.deleteOne();
    res.status(200).send(`Delete Restaurant for ID: ${req.params.id}`);
})

module.exports = { 
    getRestaurants,
    getRestaurantById,
    getRestaurantsByCategory,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};