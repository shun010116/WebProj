const express = require('express');
const errorhandler = require("./middleware/errorhandler");
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

const homeRoutes = require('./routes/homeRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(errorhandler)

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// Static File
app.use(express.static('public'));

// MongoDB Connect
dbConnect();

// 라우트 설정
app.use('/', homeRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reservations', reservationRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});