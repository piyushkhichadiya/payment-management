const express = require('express');
const orderRoutes = express.Router();
const mongoose = require('mongoose');


//Calling Models
const Order = require("../models/order");


//Get all Orders

orderRoutes.get("/", (req, res) => {
    Order.find().then(doc => {
        const response = {
            count: doc.length,
            orders: doc
        }
        res.status(200).json(response);
    })
});

orderRoutes.post("/", (req, res) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        total_payment: Number(req.body.total_payment),
        pending_payment: Number(req.body.total_payment),
        order_date: new Date(),
        status: true
    });
    order.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Order Created Successfully",
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


module.exports = orderRoutes;