const mongoose=require('mongoose');

const toursSchema=mongoose.Schema({
   name:
   {
    type:String,
    required:[true,"name cannot be empty"],
    unique:true
   },
   duration:
   {
    type:Number,
    required:[true,"A tour must have a duration"],
   },
   difficulty:
   {
    type:String,
    required:[true,"A tour must have a difficulty"],
   },
   maxGroupSize:
   {
    type:Number,
    required:[true,"Group size must be present"],
   },
   ratingsAverage:{
      type:Number,
      default:4.5
   },
   ratingsQuantity:{
      type:Number,
      default:0
   },
   price:{
      type:Number,
      required:[true,'Price cannnot be empty']
   },
   priceDiscount:{
      type:Number
   },
   summary:{
      type:String,
      trim:true,
      required:[true,"A tour must have a description"]
   },
   description:{
      type:String,
      trim:true,
   },
   imageCover:{
      type:String,
      required:[true,"A tour must have a cover image"]
   },
   images:{
      type:[String]
   },
   createdAt:{
      type:Date,
      default:Date.now()
   },
   startDates:{
      type:[Date]
   }

});


const Tour=mongoose.model('Tour',toursSchema);

module.exports=Tour;