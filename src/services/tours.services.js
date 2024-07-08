const Tour = require("../models/tours.model");

class ToursService{
constructor(repository){
    this.repository=repository;
}

async getAllTours(queryObj){
    try {
        const allProblems= this.repository.getAllTours(queryObj);
        return allProblems;
    } catch (error) {
        throw error
    }
}

async getTourById(id){
    try {
        const tourbyid=this.repository.getTourById(id);
        return tourbyid;
    } catch (error) {
        throw error;
    }
}

async deleteTourById(id){
    try {
       this.repository.deleteTourById(id);
       return;
    } catch (error) {
        throw (error)
    }
}

async createTour(tourdata){
    try {
        const newTour=this.repository.createTour(tourdata);
        return newTour;
    } catch (error) {
        throw error;
    }
}

async updateTourById(id,tourdata){
   try {
    const updatedTour=this.repository.updateTourById(id,tourdata);
    return updatedTour;
   } catch (error) {
    throw error;
   }
}

async getTourStats(){
    try {
        const tourstats=this.repository.getTourStats();
        return tourstats;
        console.log(tourstats)
    } catch (error) {
        throw error;
    }
}

}

module.exports=ToursService;