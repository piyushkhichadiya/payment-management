const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    total_payment: {type: Number, require: true},
    pending_payment: {type: Number, require: true},
    order_date: {type: String, require: true},
    status: {type: Boolean, require: true}
});

module.exports = mongoose.model("Order", orderSchema);