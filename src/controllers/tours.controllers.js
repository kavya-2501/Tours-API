const {StatusCodes}=require('http-status-codes');
const BadRequest = require('../errors/badRequest.error');

function getAllTours(req,res,next){
   try {
     throw new BadRequest();
   } catch (error) {
    next(error)
   }
}

function createTour(req,res,next){
    if(!req.body){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:'The request is invalid.'
        })
    }
    const newTour=req.body;
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:'Tour created successfully',
        error:{},
        data:newTour
    });
}

function getTourById(req,res,next){
    const id=req.params;
    if(!id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:'No such id exists'
        })
    }
    return res.status(StatusCodes.OK).json({
        success:'true',
        message:'Successfully fetched id',
        error:{},
        data:id
    })
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