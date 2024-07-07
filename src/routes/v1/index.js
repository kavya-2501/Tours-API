const express=require('express');
const toursRouter = require('./tours.routes');

const v1Router= express.Router();


v1Router.use('/tours',toursRouter);

module.exports=v1Router;