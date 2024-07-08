const {StatusCodes}=require('http-status-codes');
const BadRequest = require('../errors/badRequest.error');
const Tour = require('../models/tours.model');
const { ToursService } = require('../services');
const ToursRepository = require('../repositories/tours.repositories');

const tourService=new ToursService(new ToursRepository);

async function getAllTours(req,res,next){
   try {
     const allTours= await tourService.getAllTours();
     console.log(allTours)
     return res.status(StatusCodes.OK).json({
        success:true,
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

function updateTourById(req,res,next){
   try {
    const id=req.params;
    const updatedTour=req.body;
    if(!id){
        throw new BadRequest()
    }
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

module.exports={
    getAllTours,
    createTour,
    getTourById,
    updateTourById
}