const express=require('express');
const toursRouter = require('./tours.routes');
const userRouter = require('./users.routes');
const reviewRouter = require('./review.routes');

const v1Router= express.Router();


v1Router.use('/tours',toursRouter);
v1Router.use('/users',userRouter);
v1Router.use('/reviews',reviewRouter);

module.exports=v1Router;