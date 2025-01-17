const express=require('express');
const { Views } = require('../../controllers');

const viewRouter=express.Router();

viewRouter.get('/',Views.getOverview)

viewRouter.get('/tours/:id',Views.getTour)

module.exports=viewRouter;