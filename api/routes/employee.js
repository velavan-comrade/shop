const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { prependOnceListener } = require("../models/Employees");
const Employee = require("../models/Employees");

router.get('/', (req, res) => {

    Employee.find()
            .exec()
            .then(docs => {
                console.log(docs);
                if (docs.length > 0) {
                    res.status(200)
                    .json({
                        status : "success",
                        message: "Employee Details",
                        count : docs.length,
                        data : docs
                    });
                } else {
                    res.status(200)
                    .json({
                        status : "success",
                        message: "Employee not found",
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
                        message: "unable to fetch employee detail",
                        error: err,
                        data: []
                    }
                ]);
            });

    
});

router.post('/', (req, res) => {

    const newEmployee = new Employee({
        _id: new mongoose.Types.ObjectId("hexaString"),
        employeeName: req.body.employeeName,
        age: req.body.age,
         Qualification: req.body.qualiy,
        Designation: req.body.desgi,
        Salary: req.body.Salary,
        Branch: req.body.Branch,
        dateCreated: new Date()
    });

    newEmployee.save()
        .then(result => {
            console.log("Result: ", result);
            res.status(201)
            .json([
                {
                    status : "success",
                    message: "Employee Added",
                    data : [newEmployee]
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

router.get('/:employeeId', (req, res) => {
    const empId = req.params.employeeId;
    Employee.findById(empId)
        .exec()
        .then(doc => {
            console.log("Found: ", doc);
            if (doc) {
                res.status(200)
                .json([
                    {
                        status: 'success',
                        message: "document retrived",
                        data: [doc]
                    }
                ]);
            } else {
                res.status(404)
                .json([
                    {
                        status: 'failure',
                        message: "Employee not found!!!",
                        data: []
                    }
                ]);
            }
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(500)
            .json([
                {
                    status: "failure",
                    message: "unable to find EMPLOYEE",
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

router.delete('/:employeeId', (req, res) => {
    const empId = req.params.employeeId;
    Employee.remove({_id: empId})
        .exec()
        .then(result => {
            console.log(result.deletedCount);
            if(result.deletedCount > 0) {
                res.status(200)
                .json([
                    {
                        status: 'success',
                        message: "Employee details deleted successfully",
                    }
                ]);
            } else {
                res.status(404)
                .json([
                    {
                        status: 'failure',
                        message: "no EMployee found for provided id",
                    }
                ])
            }
            
        })
        .catch(error => {
            res.status(500)
            .json([
                {
                    status: 'failure',
                    message: "unable to delete Employee Detail",
                }
            ])
        });
    
});

module.exports = router;













