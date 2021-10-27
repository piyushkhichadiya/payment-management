const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sellerRoutes = require('./api/seller');
const orderRoutes = require('./api/order');
const paymentRoutes = require('./api/payment');

const userName = 'paymentUser';
const password = 'paymentUser';

mongoose.connect(`mongodb+srv://paymentUser:paymentUser@cluster0.jjoud.mongodb.net?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("DB Connected successully"));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send("Hello Brother");
// })

app.use('/seller', sellerRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;