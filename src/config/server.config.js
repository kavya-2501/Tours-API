const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT || 3000,
    NODE_ENV:process.env.NODE_ENV,
    DB_URL:process.env.DB_URL
}