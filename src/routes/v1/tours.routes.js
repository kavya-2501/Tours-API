const expres=require('express');
const { Tours } = require('../../controllers');

const toursRouter=expres.Router();

toursRouter.get('/',Tours.getAllTours);

toursRouter.post('/',Tours.createTour);

toursRouter.get('/:id',Tours.getTourById);

toursRouter.put('/:id',Tours.updateTourById);

toursRouter.delete('/:id',Tours.deleteTourById);

toursRouter.get('/tours-stats',Tours.getTourStats);

module.exports=toursRouter;