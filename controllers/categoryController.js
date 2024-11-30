const Restaurant = require('../models/Restaurant');
const asyncHandler = require('express-async-handler');

// 한식
// GET /restaurants/korean
const getKorean = asyncHandler(async (req, res) => {
    const korean = await Restaurant.find({ category : "한식"});
    res.render("korean", {
        title : "한식",
        restaurants : korean
    });
})

// 일식
// GET /restaurants/japanese
const getJapanese = asyncHandler(async (req, res) => {
    const japanese = await Restaurant.find({ category : "일식"});
    res.render("japanese", {
        title : "일식",
        restaurants : japanese
    });
})
// 중국식
// GET /restaurants/chinese
const getChinese = asyncHandler(async (req, res) => {
    const chinese = await Restaurant.find({ category : "중국식"});
    res.render("chinese", {
        title : "중국식",
        restaurants : chinese
    });
})

// 경양식
// GET /restaurants/western
const getWestern = asyncHandler(async (req, res) => {
    const western = await Restaurant.find({ category : "경양식"});
    res.render("western", {
        title : "경양식",
        restaurants : western
    });
})

// 아시아
// GET /restaurants/asian
const getAsian = asyncHandler(async (req, res) => {
    const asian = await Restaurant.find({ category : "외국음식전문점(인도,태국등)"});
    res.render("asian", {
        title : "아시아",
        restaurants : asian
    });
})

// 숯불구이
// GET /restaurants/grilled
const getGrilled = asyncHandler(async (req, res) => {
    const grilled = await Restaurant.find({ category : "식육(숯불구이)"});
    res.render("grilled", {
        title : "숯불구이",
        restaurants : grilled
    });
})

module.exports = {
    getKorean,
    getJapanese,
    getChinese,
    getWestern,
    getAsian,
    getGrilled
}