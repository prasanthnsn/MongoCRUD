const express = require('express');
const { isValidObjectId } = require('mongoose');
const employee = require('../models/employee');
var router = express.Router();

var { Employee } = require('../models/employee');

router.get('/', (_req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Retreiving Employees :' + JSON.stringify(err, undefined, 2))
        }
    });
});


router.get('/:id', (_req,res) => {
    if(!isValidObjectId(_req.params.id))
    return res.status(400).send(`No records with given id : ${_req.params.id}`);
    
    Employee.findById(_req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Reteeiving Employee :' + JSON.stringify(err, undefined, 2));
        }
    })
})


router.post('/', (_req,res) => {
    var emp = new Employee({
        name: _req.body.name,
        position: _req.body.position,
        office: _req.body.office ,
        salary: _req.body.salary,

    });
    
    emp.save((err, doc) => {
        if(!err){ 
            res.send(doc); 
        }
        else{ 
            console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2)); 
        }
    })
});


router.put('/:id', (_req,res) => {
    if(!isValidObjectId(_req.params.id))
        return res.status(400).send(`No records with given id : ${_req.params.id}`);

        var emp = ({
            name: _req.body.name,
            position: _req.body.position,
            office: _req.body.office ,
            salary: _req.body.salary,
    
        });

        Employee.findByIdAndUpdate(_req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if(!err){ res.send(doc); }
            else{console.log('Error in Employee update :' + JSON.stringify(err, undefined, 2)); }
        });
})


router.delete('/:id', (_req,res) => {
    if(!isValidObjectId(_req.params.id))
    return res.status(400).send(`No records with given id : ${_req.params.id}`);

    Employee.findOneAndDelete(_req.params.id, (err, doc) => {
        if(!err) { res.send(doc);}
        else{console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));}
    })
})

module.exports = router;