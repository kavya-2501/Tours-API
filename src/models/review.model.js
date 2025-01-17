const mongoose=require('mongoose');
const Tour = require('./tours.model');

const reviewSchema=mongoose.Schema({
review:{
    type:String,
    required:[true,'Review cannot be empty']
},
rating:{
    type:Number,
    default:4.5,
    min:[1,'Rating must be above 1.0'],
    max:[5,'Rating must be below 5.0']
},
createdAt:{
    type:Date,
    default:Date.now()
},
tour:{
    type:mongoose.Schema.ObjectId,
    ref:'Tour',
    required:[true,"Review must belong to a tour"],
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,"Review must belong to a user"],
}
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 })

reviewSchema.pre(/^find/,function(next){
    // this.populate([
    //     {path:'tour',
    //     select:'name'  // -name would exclude name property from data, while name will include just the name
    //     },
    //     {path:'user',
    //     select:'name photo'
    //     }
    // ]);
    this.populate(
        {path:'user',
        select:'name photo'
        }
    );
    next();
})

// reviewSchema.statistics.calcStatistics=async function(tourId){
//    const stats= await this.aggregate([
//         {
//             $match:{tour:tourId}
//         },
//         {
//         $group:{
//             _id:'$tour',
//             nRating:{$sum:1},
//             averageRating:{$avg:'$rating'}
//         }

//         }
//     ]);
// }

// await Tour.findByIdAndUpdate(tourId,{
//     ratingsAverage:stats[0].nRating,
//     ratingsQuantity:stats[0].averageRating
// });

// reviewSchema.post('save',function(){
//     this.constructor.calcStatistics(this.tour)
// })

const Review=mongoose.model('Review',reviewSchema);

module.exports=Review;