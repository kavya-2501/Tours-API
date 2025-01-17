const crypto=require('crypto')
const {promisify}=require('util');
const { JWT_SECRET_KEY, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN } = require("../config/server.config");
const BaseError = require("../errors/BaseError");
const User = require("../models/users.model")
const jwt=require('jsonwebtoken');
const sendEmail = require('../utils/emailHandler');

const signToken=(id)=>{
// jwt.sign(payload,secret_key,expires_in)
  return jwt.sign({id},JWT_SECRET_KEY,{expiresIn:JWT_EXPIRES_IN})
}

const createSendToken=(user,statusCode,res)=>{
    const token=signToken(user._id);
    const cookieOptions={
        expires:new Date(Date.now()+ JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        secure:true,
        httpOnly:true
    }
    user.password=undefined;
    res.cookie('jwt',token,cookieOptions)
  res.status(statusCode).json({
        status:'success',
        token:token,
        data:{
            user:user
        }
    }) 
}

async function signup(req,res,next){
    try {
        const newUser= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            role:req.body.role
        });
       createSendToken(newUser,201,res);
    } catch (error) {
        next(error)
    }
}

async function login(req,res,next){
    const {email,password}=req.body;

    // 1) Check if email and password exists
    if(!email || !password){
       return next(new BaseError('Please provide email and password',400));
    }

    // 2) Check if user exists and password is correct
    const user=await User.findOne({email}).select('+password');

    if(!user || !await user.correctPassword(password,user.password)){
        return next(new BaseError('Incorrect email or password',401))
    }

    // 3) If everything ok, send the token to client
   createSendToken(user,200,res);
}

async function protect(req,res,next){
    try {
        let token;
        // 1) Getting token and checking if it's there
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(new BaseError('You are not logged in. Please login to access',401));
        }

        // 2) Validate token
         const decoded= await promisify(jwt.verify)(token,JWT_SECRET_KEY);

        // 3) Check if user still exists
        const currentUser=await User.findById(decoded.id);
        if(!currentUser){
            return next(new BaseError('The user associated to this token does not exist',401))
        }

        // 4) Check if user changed password after the token was issued
      if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new BaseError('User recently changed password,please login again',401))
      }

      req.user=currentUser;
        next();
    } catch (error) {
        next(error)
    }
}

function restrictTo (...roles){
    return (req,res,next)=>{
        // roles =['admin','lead-guide'] as role does not contain user/guide, they can't perform the action
        if(!roles.includes(req.user.role)){
            return next(new BaseError('You are not authorized to perform this action',403))
        }
        next();
    }
}

async function forgotPassword(req,res,next){
    // 1) Get user based on provided email
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new BaseError('User does not exist',401));
    }

    // 2) Generate a random password generate token
    const resetToken=user.changePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) send it to user's email
    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

    const message=`Forgot your password?Submit your request with your new password to ${resetUrl}.\nIf you did not forget your password,please ignore this email`

    try {

    await sendEmail({
        email:req.body.email,
        subject:"Your password reset token (Valid for 10 mins)",
        message
    })
    res.status(200).json({
        status:'success',
        message:'Token sent on email!'
    })}
    catch (error) {
        user.passwordResetToken=undefined;
        user.passwordResetTokenExpiresin=undefined;
        await user.save({ validateBeforeSave: false });

        return next(new BaseError('There was an error sending the email,try again later!',500))
    }
}

async function resetPassword(req,res,next){
    // 1) get user based on the token
    const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetTokenExpiresin:{ $gt: Date.now()}
    });

    // 2) Reset the password if token hasn't expired and user exists
    if(!user){
        return next(new BaseError('Token is invalid or has expired',401))
    }
    // 3)Update the password property for the user
    user.password=req.body.password;
    user.confirmPassword=req.body.confirmPassword;
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpiresin=undefined;
    await user.save()

    // 4) Log the user in and send JWT
   createSendToken(user,200,res);
}

async function updatePassword(req,res,next){
    try {
        const {currentPassword,password,confirmPassword}=req.body;
    // 1) check if the user exists in the collection
    const user=await User.findById(req.user.id).select('+password');
    if(!user){
        return next(new BaseError('The user does not exist',404))
    }
    // 2) Check if the current provided password is correct or not
    if(!await(user.correctPassword(currentPassword,user.password))){
        return next(new BaseError('Your current password is wrong',401))
    }
    // 3)If yes, update the new password
    user.password=password;
    user.confirmPassword=confirmPassword;
    await user.save()

    // 4) Log in and send JWT
    createSendToken(user,200,res);
    } catch (error) {
        next(error)
    }   
}

module.exports={
    signup,
    login,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword
}