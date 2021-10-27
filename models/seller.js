const mongoose = require('mongoose');
const sellerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    seller_email: {
        type: String, 
        require: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    pending_payment: {type: Number, require: true},
    total_payment: {type: Number, require: true},
});

module.exports = mongoose.model("Seller", sellerSchema);