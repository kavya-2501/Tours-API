const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT || 3000,
    NODE_ENV:process.env.NODE_ENV,
    DB_URL:process.env.DB_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    EMAIL_USERNAME:process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_PORT:process.env.EMAIL_PORT,
    JWT_COOKIE_EXPIRES_IN:process.env.JWT_COOKIE_EXPIRES_IN
}