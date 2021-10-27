const express = require('express');
const sellerRoutes = express.Router();
const mongoose = require('mongoose');


//Calling Models
const Seller = require("../models/seller");


//Get all Orders

sellerRoutes.get("/", (req, res) => {
    Seller.find().then(doc => {
        const response = {
            count: doc.length,
            sellers: doc
        }
        res.status(200).json(response);
    })
});

sellerRoutes.post("/", (req, res) => {
    const seller = new Seller({
        _id: new mongoose.Types.ObjectId(),
        seller_email: req.body.email,
        pending_payment: req.body.pending_payment,
        total_payment: req.body.total_payment,
    });
    seller.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "seller Created Successfully",
            data: result
        })
    }).catch(err => {
        if (err) {
            res.status(400).json({
                message: "Something went wrong Please check all your data",
                error: err,
            })
        }
    })
})


module.exports = sellerRoutes;