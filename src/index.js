const express=require('express');
const path=require('path')
const bodyParser=require('body-parser');
const { PORT } = require('./config/server.config');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const connectToDB = require('./config/db.config');
const BaseError = require('./errors/BaseError');
const rateLimit=require('express-rate-limit');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const viewRouter = require('./routes/viewRoutes/viewRoutes');

const app=express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))

const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too many requests from your IP,try again in an hour"
})
app.use('/api',limiter)

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));

// Data sanitization against No SQL Query injections
app.use(mongoSanitize());

// Data sanitization against XSS (cross site scripting)
app.use(xss());

// Preventing HTTP Parameter Pollution
app.use(hpp({whitelist:'duration' }));

app.use((req,res,next)=>{
// console.log("......",req.headers);
next();
})

app.use('/',viewRouter)
app.use('/api',apiRouter);

app.all("*",function(req,res,next){
    next(new BaseError(`Cannot find ${req.originalUrl} on the server!`,404));
})



app.use(errorHandler);

app.listen(PORT,async()=>{
    console.log(`Server running successfully on PORT ${PORT}`);
    await connectToDB();
});




