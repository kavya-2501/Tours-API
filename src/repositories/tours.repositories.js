const NotFound = require("../errors/notFound");
const Tour = require("../models/tours.model");

class ToursRepository{
    async getAllTours(queryObj){
        const allTours=await Tour.find(queryObj);
        return allTours;
    }

    async getTourById(id){
        const tourById=await Tour.findById(id);
        return tourById;
    }

    async createTour(tourdata){
        const newTour=await Tour.create({
            name:tourdata.name,
            duration:tourdata.duration,
            difficulty:tourdata.difficulty,
            maxGroupSize:tourdata.maxGroupSize,
            ratingsAverage:tourdata.ratingAverage,
            ratingsQuantity:tourdata.ratingsQuantity,
            price:tourdata.price,
            summary:tourdata.summary,
            description:tourdata.description,
            imageCover:tourdata.imageCover,
            startDates:tourdata.startDates
        });
        return newTour;
    }

    async deleteTourById(id){
       
        await Tour.findByIdAndDelete(id);
        return;
        if(!deletedtour){
            throw new NotFound(id)
        }
    }

    async updateTourById(id,tourdata){
        const updatedTour=await Tour.findByIdAndUpdate(id,{
            name:tourdata.name,
            rating:tourdata.rating,
            price:tourdata.price
        },{new:true})
        console.log("updated successfully")
        return updatedTour;

    }

    async getTourStats(){
        const tourstats=await Tour.aggregate([
            {
                $match:{ratingsAverage:{$gte:1}}
            },
            {
                $group:{
                    _id:'$difficulty',
                    numTours:{$sum:1},
                    numRatings:{$sum:'$ratingsQuantity'},
                    avgRatings:{$avg:'$ratingsAverage'},
                    avgPrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'},
                }
            }
        ])
        console.log(tourstats)
        return tourstats;
    }

}
module.exports=ToursRepository;