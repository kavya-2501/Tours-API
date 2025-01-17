const express=require('express');
const { Reviews, Auth } = require('../../controllers');

const reviewRouter=express.Router({mergeParams:true});

reviewRouter.use(Auth.protect);

reviewRouter.get('/',Reviews.getAllReviews);
reviewRouter.post('/',Reviews.setTourId,Reviews.createReview);

reviewRouter.use(Auth.restrictTo('user','admin'))
reviewRouter.patch('/:id',Reviews.updateReview);
reviewRouter.delete('/:id',Reviews.deleteReviewById);

module.exports=reviewRouter;
module.exports=reviewRouter;