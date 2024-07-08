const NotFound = require("../errors/notFound");
const Tour = require("../models/tours.model");

class ToursRepository{
    async getAllTours(){
        const allTours=await Tour.find({});
        return allTours;
    }

    async getTourById(id){
        const tourById=await Tour.findById(id);
        return tourById;
    }

    async createTour(tourdata){
        const newTour=await Tour.create({
            name:tourdata.name,
            rating:tourdata.rating,
            price:tourdata.price
        });
        return newTour;
    }

    async deleteTourById(id){
        if(!id){
            throw new NotFound(id)
        }
        const deletedtour=await Tour.findByIdAndDelete(id);
        return deletedtour;
    }
    
}
module.exports=ToursRepository;