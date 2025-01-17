const BaseError = require("../errors/BaseError");

exports.deleteOne=Model=> async function deleteTourById(req,res,next){
    try {
       const doc= await Model.findByIdAndDelete(req.params.id);
       
if(!doc){
    return next(new BaseError('No document found with that ID',404))
}
        return res.status(200).json({
            success:true,
            message:'successfully deleted',
            
        })
    } catch (error) {
        next(error)
    }
}

exports.updateOne=Model=>async function updateTourById(req,res,next){
  console.log("////",req.file,"///", req.body);
  console.log("req.id",req.params.id)
   try {
   const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
   });
   if(!doc){
    return next(new BaseError('No document found with that ID',404))
   }
    return res.status(201).json({
        success:true,
        message:'Updated successfully',
        error:{},
        data:{
            data:doc
        }
    })
   } catch (error) {
    next(error)
   }
}

exports.createOne= Model => async function createTour(req,res,next){
  try {
    if(!req.body){
      return (next (new BaseError ('Please provide correct data',404)))
    }
    const doc=await Model.create(req.body);
    return res.status(201).json({
        success:true,
        message:'Tour created successfully',
        error:{},
        data:doc
    });
  } catch (error) {
    next(error)
  }
}

exports.getAll=Model=> async function getAllTours(req,res,next){
   try {
 // For filtering we can use
        // const allTours=await Tour.find(req.query)  //this is a simple filter and will not work if any query isn't present, so to get rid of this behaviour we will have to exclude special query names first
        // TO DO THIS, create a copy of query params object and then exclude teh Fields
    // // BUILDING THE QUERY OBJECT
    // const queryObj={...req.query};
    // const excludedFields=['page','sort','limit','fields'];
    // excludedFields.forEach(el=> delete queryObj[el]);
    // console.log(req.query,queryObj);

    // // 2. ADVANCED FILTERING
    // let querString=JSON.stringify(queryObj);
    // querString=querString.replace(/\b(lte|lt|gt|gte)\b/g,match=>`$${match}`);
    // console.log(JSON.parse(querString))
    
    let filter={};
    if(req.params.tourId){
      filter={tour:req.params.tourId}
    }

     const doc= await Model.find(filter);
     return res.status(200).json({
        success:true,
        no_of_tours:doc.length,
        message:'Successfully fetched all tours',
        error:{},
        data:doc

     })
   } catch (error) {
    next(error)
   }
}

exports.getOne=(Model,popOptions)=>async function getTourById(req,res,next){
    try {
      const query=Model.findById(req.params.id);
      if(popOptions){
        query=query.populate(popOptions)
      }
        // .populate associates the user associated with id in the guides array to their data
    const doc=await query;
    if(!doc){
        return (new BaseError(`The requested id ${tourid} does not exist`,404))
     }
    console.log(doc);
    return res.status(200).json({
        success:'true',
        message:'Successfully fetched id',
        error:{},
        data:doc
    })
    } catch (error) {
        next(error)
    }
}
