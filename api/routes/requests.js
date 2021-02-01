const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { prependOnceListener } = require("../models/request");
const Requests = require("../models/request");

router.post('/', (req, res) => {

    const newRequest = new Requests({
        _id: new mongoose.Types.ObjectId(),
        productName:req.body.productName,
        //productId:Number,
        quantity:req.body.quantity,
        status:"require",
        branch:req.body.branch,
        dateRequested:new Date()
    });

    newRequest.save()
        .then(result => {
            console.log("Result: ", result);
            res.status(201)
            .json([
                {
                    status : "success",
                    message: "REQUEST SENT",
                    data : [newRequest]
                }
            ]);
        }).catch(err => {
            console.log("Error: ", err);
            res.status(500)
            .json([
                {
                    status: "failure",
                    message: "unable to add Employee",
                    error: err,
                    data: []
                }
            ]);
        });

    
});

module.exports=router;