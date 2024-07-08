const Tour = require("../models/tours.model");

class ToursService{
constructor(repository){
    this.repository=repository;
}

async getAllTours(){
    try {
        const allProblems= this.repository.getAllTours();
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
        const deletedtour=this.repository.deleteTourById(id);
        return deletedtour
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

}

module.exports=ToursService;