const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connect
dbConnect();

// 라우트 설정
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reservations', reservationRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});