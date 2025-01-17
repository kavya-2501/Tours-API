
const Tour = require('../models/tours.model');
const factory=require('./handlerFactory')

const getAllTours=factory.getAll(Tour);

const createTour= factory.createOne(Tour);

const getTourById=factory.getOne(Tour,{path:'reviews'});

const updateTourById=factory.updateOne(Tour);


const deleteTourById=factory.deleteOne(Tour);

async function getTourStats(req,res,next){
    try {
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
    } catch (error) {
        next(error)
    }
}

module.exports={
    getAllTours,
    createTour,
    getTourById,
    updateTourById,
    deleteTourById,
    getTourStats
}