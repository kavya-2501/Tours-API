class BaseError extends Error{
    constructor(name,status,description,details){
        super(description);
        this.name=name,
        this.statusCode=statusCode,
        this.details=details
    }
};

module.exports=BaseError;