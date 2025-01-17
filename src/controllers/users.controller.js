const BaseError = require("../errors/BaseError");
const User = require("../models/users.model");
const factory=require('./handlerFactory')
const multer=require('multer');
const sharp=require('sharp');

// const multerStorage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'public/img/users',)
//   },
//   filename:(req,file,cb)=>{
//     const ext=file.mimetype.split('/')[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//   }

// });
const multerStorage=multer.memoryStorage();

const multerFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(new BaseError('Upload file not of image type!'),false)
  }
};

const upload=multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

const uploadUserPhoto=upload.single('photo')

function resizeUserPhoto(req,res,next){
  if(!req.file){next()};
  req.file.filename=`user-${req.user.id}-${Date.now()}.jpeg`;
sharp(req.file.buffer)
.resize(500,500)
.toFormat('jpeg')
.jpeg({quality:90})
.toFile(`public/img/users/${req.file.filename}`)

next();
}

const filterObj=(obj,...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach((el)=>{
        if(allowedFields.includes(el)){
            newObj[el]=obj[el]
        }
    })
    return newObj;
}


function getMe(req,res,next){
    req.params.id=req.user.id;
    next();
}
async function updateMe (req, res, next) {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email','photo');
  if(req.file){
    filteredBody.photo=req.file.filename
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
console.log(">>>>>",updatedUser)
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
};

async function getAllUsers(req,res,next){
    try { 
        const users=await User.find();
        res.status(200).json({
            status:'success',
            data:users
        })
    } catch (error) {
        next(error)
    }
}

const getUser=factory.getOne(User)
const updateUser=factory.updateOne(User)
const deleteUser=factory.deleteOne(User)

module.exports={
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getMe,
    updateMe,
    uploadUserPhoto,
    resizeUserPhoto
}