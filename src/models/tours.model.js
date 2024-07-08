const mongoose=require('mongoose');

const toursSchema=mongoose.Schema({
   name:
   {
    type:String,
    required:[true,"name cannot be empty"],
    unique:true
   },
   rating:{
      type:Number,
      default:4.5
   },
   price:{
      type:Number,
      required:[true,'Price cannnot be empty']
   }
});


const Tour=mongoose.model('Tour',toursSchema);

module.exports=Tour;