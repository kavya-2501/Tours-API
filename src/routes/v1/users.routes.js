const express=require('express');
const { signup } = require('../../controllers/auth.controller');
const multer=require('multer')
const { Users, Auth } = require('../../controllers');
const { uploadUserPhoto } = require('../../controllers/users.controller');


const userRouter=express.Router();

userRouter.post('/signup',Auth.signup);
userRouter.post('/login',Auth.login);
userRouter.post('/forgotpassword',Auth.forgotPassword);
userRouter.patch('/resetPassword/:token',Auth.resetPassword);


userRouter.use(Auth.protect); //all middleware that come after this are protected and require authentication
userRouter.patch('/updatePassword',Auth.updatePassword);
userRouter.patch('/updateMe',Users.uploadUserPhoto,Users.resizeUserPhoto,Users.updateMe);
userRouter.get('/me',Auth.protect,Users.getMe,Users.getUser);

userRouter.use(Auth.restrictTo('admin'));

userRouter.delete('/deleteUser',Users.deleteUser)
userRouter.get('/',Users.getAllUsers);

module.exports=userRouter; 