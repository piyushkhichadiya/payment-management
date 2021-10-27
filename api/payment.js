const express = require('express');
const paymentRoutes = express.Router();
const mongoose = require('mongoose');


//Calling Models
const Payment = require("../models/payment");
const Order = require('../models/order');
const Seller = require('../models/seller');

//Get all Orders

paymentRoutes.get("/", (req, res) => {
    Payment.find().then(doc => {
        const response = {
            count: doc.length,
            data: doc
        }
        res.status(200).json(response);
    })
});

paymentRoutes.post("/", (req, res) => {
    Order.find({_id: req.body.order_id}).exec().then(order => {
        const pending = order[0].pending_payment - req.body.payment;
        if (pending >= 0) {
            const newOrder = new Order({
                pending_payment: pending,
            });
            Order.updateOne({_id: req.body.order_id}, {
                $set: newOrder
            }).exec().then(res => {
                console.log(res);
            })
        }
        if (pending <= 0) {
            const newOrder = new Order({
                pending_payment: pending,
                status: false
            });
            Order.updateOne({_id: req.body.order_id}, {
                $set: newOrder
            }).exec().then(res => {
                console.log(res);
            })
        }
        Seller.find({_id: req.body.seller_id}).exec().then(seller => {
            const pendingAmount = seller[0].pending_payment - req.body.payment;
            if (pendingAmount >= 0) {
                const newSeller = new Seller({
                    pending_payment: pendingAmount,
                })
                Seller.updateOne({_id: req.body.seller_id}, {
                    $set: newSeller
                }).exec().then(res => {
                    console.log(res);
                })
            }
            const payment = new Payment({
                _id: new mongoose.Types.ObjectId(),
                order_id: req.body.order_id,
                seller_id: req.body.seller_id,
                payment: req.body.payment,
                payment_date: new Date()
            });
            payment.save().then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Payment successfully done",
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
        }).catch(err => {
            res.status(400).json({
                message: "Data not found please check seller_id"
            })
        })
    }).catch(err => {
        res.status(400).json({
            message: "Data Not Found please check order_id"
        })
    })
})


module.exports = paymentRoutes;