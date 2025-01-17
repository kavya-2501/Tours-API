const Tour = require("../models/tours.model")

async function getOverview(req,res,next){
    // 1 Get the tour data from controller
const tours=await Tour.find();
    // 2 Build the template
    // 3 Render the data in the template
res.status(200).render('overview',{
    title:'All tours',
    tours
})
}
async function getTour(req,res,next){
// 1 Get the requested tour
const tour=await Tour.findById(req.params.id).populate('reviews');
// 2 Buid the template 
// 3 Render the data in template
res.status(200).render('tour',{
    title:tour.name,
    tour:tour
})
}

module.exports={
    getOverview,
    getTour
}