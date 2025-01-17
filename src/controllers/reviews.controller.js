const Review = require("../models/review.model")
const factory=require('./handlerFactory')



async function setTourId(req,res,next){
  if(!req.body.tour){
    req.body.tour=req.params.tourId
  }
  if(!req.body.user){
    req.body.user=req.user.id
  }
  next();
}

const getAllReviews=factory.getAll(Review);
const createReview=factory.createOne(Review)
const updateReview=factory.updateOne(Review)
const deleteReviewById=factory.deleteOne(Review);

module.exports={
    getAllReviews,
    setTourId,
    createReview,
    updateReview,
    deleteReviewById
}