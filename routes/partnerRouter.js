const express = require('express');
const Partner = require('../models/partner');
const authenticate = require('../authenticate');
const partnersRouter = express.Router();
const cors = require('./cors');

partnersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.find()
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
.catch(err => next(err))
})

.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
        console.log('Partner Created', partner);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json')
        res.json(partner)
    })
.catch(err => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
    .then(response =>{
     res.statusCode=200;
     res.setHeader('Content-Type', 'application/json');
     res.json(response);
    })
    .catch(err => next(err));
 });

partnersRouter.route('/:partnerId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner);
    
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
   .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('Cant use put operations in partner')
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
})
.catch(err => next(err));
})
module.exports = partnersRouter;