const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { prependOnceListener } = require("../models/request");
const Requests = require("../models/request");

router.get('/', (req, res) => {
        Requests.find()
                .exec()
                .then(docs => {
                    console.log(docs);
                    if (docs.length > 0) {
                        res.status(200)
                        .json({
                            status : "success",
                            message: "Requests Details",
                            count : docs.length,
                            data : docs
                        });
                    } else {
                        res.status(200)
                        .json({
                            status : "success",
                            message: "NO Requests",
                            count: 0,
                            data : []
                        });
                    }
                })
                .catch( err => {
                    res.status(500)
                    .json([
                        {
                            status: "failure",
                            message: "unable to fetch Request detail",
                            error: err,
                            data: []
                        }
                    ]);
                });
    
        
    });

    router.put('/:employeeId', (req, res) => {
        const empId = req.params.employeeId;
        
        const update = {};
        for (const gvn of req.body) {
            update[gvn.property] = gvn.value;
        }
    
        Employee.findByIdAndUpdate({_id: EmployeeId}, {$set: update})
                .exec()
                .then(result => {
                    res.status(200)
                    .json([
                        {
                            status: 'success',
                            message: "updated Employee detail"
                        }
                    ]);
                })
                .catch(err => {
                    console.log('erroe: ', err);
                    res.status(500)
                    .json([
                        {
                            status: 'failure',
                            message: "unable to update Employee Detail",
                            data : []
                        }
                    ]);
                })
        
    });

    module.exports=router;