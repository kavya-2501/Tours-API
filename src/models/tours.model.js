const mongoose=require('mongoose');
const User =require( './users.model');

const toursSchema=mongoose.Schema({
   name:{
    type:String,
    required:[true,"name cannot be empty"],
    unique:true,
    trim:true,
   // inbuilt validators in mongoose
    maxlength:[40,'A tour name should be of less than 40 characters'],
    minlength:[10,'A tour name should be of more than 10 characters']
   },

   duration:{
    type:Number,
    required:[true,"A tour must have a duration"],
   },

   difficulty: {
    type:String,
    required:[true,"A tour must have a difficulty"],
    enum:{
      values:['easy','medium','hard'],
      message:'Difficulty can either be:easy,medium,hard'
    }
   },

   maxGroupSize: {
    type:Number,
    required:[true,"Group size must be present"],
   },

   ratingsAverage:{
      type:Number,
      default:4.5,
      min:[1,'Rating must be above 1.0'],
      max:[5,'Rating must be below 5.0']
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
   },
   secretTour:{
      type:Boolean,
      default:false,
      select:false
   },
   startLocation:{
      type:{
         type:String,
         default:'Point',
         enum:['Point']
      },
      coordinates:[Number],
      address:String,
      description:String
   },
   locations:[
      {
        type:{
         type:String,
         default:'Point',
         enum:['Point']
      },
      coordinates:[Number],
      address:String,
      description:String 
      }
   ],
   guides:[
      {
         type:mongoose.Schema.ObjectId,
         ref:'User'
      }
   ]


},
// options
{
   toJSON:{virtuals:true},
   toObject:{virtuals:true}
}
);

// virtuals help when we do not want to store the data in db, that can be easily retreieved from what is already present
toursSchema.virtual('durationWeeks').get(function(){
   return this.duration/7;
})

// VIRTUAL POPULATE (refrence other collections without saving them in db)
toursSchema.virtual('reviews',{
   ref:'Review',
   foreignField:'tour',
   localField:'_id'
});

//  1. The pre middleware in mongoose works before .save() or .create();
// in case of query middleware, this has access to current query while in document middleware this has access to current document
   // toursSchema.pre('save',function(next){
   //    some action;
   // next();
   // })
// 2. post middleware runs after .save
 // toursSchema.post('save',function(next){
   //    some action;
   // next();
   // })

toursSchema.pre(/^find/,function(next){
   this.populate({
      path:'guides',
      select:'-__v,-passwordChangedAt'
  });
  next();
})  
toursSchema.pre('save',async function(next){
   const promiseguides=this.guides.map(async(id)=>await User.findById(id));
   this.guides=await Promise.all(promiseguides);
   next();
})

const Tour=mongoose.model('Tour',toursSchema);

module.exports=Tour;