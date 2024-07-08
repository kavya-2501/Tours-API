const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class NotFound extends BaseError{
    constructor(id){
        super("Not Found",StatusCodes.NOT_FOUND,`Requested data ${id} not found`,{})
    }
}

module.exports=NotFound;