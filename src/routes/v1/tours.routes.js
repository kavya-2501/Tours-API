const expres=require('express');
const { Tours, Auth, Reviews } = require('../../controllers');
const reviewRouter = require('./review.routes');

const toursRouter=expres.Router();

toursRouter.get('/',Tours.getAllTours);

toursRouter.post('/',Auth.protect,Auth.restrictTo('admin','lead-guide'),Tours.createTour);

toursRouter.get('/:id',Tours.getTourById);

toursRouter.patch('/:id',Auth.protect,Auth.restrictTo('admin','lead-guide'),Tours.updateTourById);

toursRouter.delete('/:id',Auth.protect,Auth.restrictTo('admin','lead-guide'),Tours.deleteTourById);

toursRouter.get('/tours-stats',Tours.getTourStats);

toursRouter.use('/:tourId/reviews',reviewRouter)

module.exports=toursRouter;