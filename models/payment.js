const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order_id: mongoose.Schema.Types.ObjectId,
    seller_id: mongoose.Schema.Types.ObjectId,
    payment: {type: Number, require: true},
    payment_date: {type: String, require: true},
});

module.exports = mongoose.model("Payment", paymentSchema);