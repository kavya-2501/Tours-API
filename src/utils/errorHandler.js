const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/BaseError");

function errorHandler(err, req, res, next) {
    // if (err instanceof BaseError) {
    //   return res.status(err.statusCode).json({
    //     success: false,
    //     message: err.message,
    //     error: err.details,
    //     data: {},
    //   });
    // }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   success: false,
    //   message: "Something went wrong",
    //   error: err,
    //   data: {},
    // });
  err.statusCode=err.statusCode || 500,
  err.status= err.status || 'error'

  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
  }

module.exports=errorHandler;