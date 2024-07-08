const {StatusCodes}=require('http-status-codes');
const BadRequest = require('../errors/badRequest.error');
const Tour = require('../models/tours.model');
const { ToursService } = require('../services');
const ToursRepository = require('../repositories/tours.repositories');
const NotFound = require('../errors/notFound');

const tourService=new ToursService(new ToursRepository);

async function getAllTours(req,res,next){
   try {

    // // BUILDING THE QUERY OBJECT
    // const queryObj={...req.query};
    // const excludedFields=['page','sort','limit','fields'];
    // excludedFields.forEach(el=> delete queryObj[el]);
    // console.log(req.query,queryObj);

    // // 2. ADVANCED FILTERING
    // let querString=JSON.stringify(queryObj);
    // querString=querString.replace(/\b(lte|lt|gt|gte)\b/g,match=>`$${match}`);
    // console.log(JSON.parse(querString))
    


     const allTours= await tourService.getAllTours(JSON.parse(querString));
     return res.status(StatusCodes.OK).json({
        success:true,
        no_of_tours:allTours.length,
        message:'Successfully fetched all tours',
        error:{},
        data:allTours

     })
   } catch (error) {
    next(error)
   }
}

async function createTour(req,res,next){
  try {
    if(!req.body){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:'The request is invalid.'
        })
    }
    const newTour=await tourService.createTour(req.body)
    console.log(newTour);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:'Tour created successfully',
        error:{},
        data:newTour
    });
  } catch (error) {
    next(error)
  }
}

async function getTourById(req,res,next){
    try {
        const id=req.params;
    if(!id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:'No such id exists'
        })
    }
    const tourid=await tourService.getTourById(id);
    console.log(tourid);
    return res.status(StatusCodes.OK).json({
        success:'true',
        message:'Successfully fetched id',
        error:{},
        data:tourid
    })
    } catch (error) {
        next(error)
    }
}

async function updateTourById(req,res,next){
   try {
    console.log(req.params.id);
    console.log(req.body)
   const updatedTour=await tourService.updateTourById(req.params.id,req.body);
   console.log(">>>>updated")
    return res.status(StatusCodes.OK).json({
        success:true,
        message:'tour updated successfully',
        error:{},
        id:id,
        data:updatedTour
    })
   } catch (error) {
    next(error)
   }
}

async function deleteTourById(req,res,next){
    try {
        await tourService.deleteTourById(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'successfully deleted',
            
        })
    } catch (error) {
        next(error)
    }
}

async function getTourStats(req,res,next){
    try {
        const tourstats=await tourService.getTourStats();
        console.log("-----",tourstats)
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'successfully fetched stats',
            data:tourstats
            
        })
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