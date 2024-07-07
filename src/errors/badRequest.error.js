const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class BadRequest extends BaseError{
   constructor(){
    super(
        "BadRequest",
        StatusCodes.BAD_REQUEST,
        'Invalid Structure provided',
        {}
    )
   }
}

module.exports=BadRequest;