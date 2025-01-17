const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate:[validator.isEmail]
    },
    role:{
        type:String,
        enum:['user','guide','lead-guide','admin'],
        default:'user'
    },
    photo:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'A password is required'],
        minlength:8,
        select:false    //this attribute will avoid passwords being shown in data when users are fetched
    },
    confirmPassword:{
        type:String,
        // validates on .create or .save
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message:'Passwords do not match'
        }
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetTokenExpiresin:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
});

// hashes the password before saving
userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next()
});

// sets the passwordChangedAt property in case of password reset/update
userSchema.pre('save',function(next){
    if(!this.isModified('password')|| this.isNew){return next()};
    this. passwordChangedAt=Date.now()-1000;
    next();
})

userSchema.pre(/^find/,function(next){
    this.find({active: { $ne :false}});
    next();
})

// matching user provided password (unhashed) and actual password in db (hashed)
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

// checking if the password was changed or not and when it was changed
// if the password was changed after the issue date of token, we should return true
// and if password was changed before the issue date of token, then false (which means password wasn't changed)
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTime=parseInt(this.passwordChangedAt.getTime()/1000);
        return JWTTimestamp < changedTime
    }
    return false;
}

// reset token creation and sending
userSchema.methods.changePasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');

    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpiresin= Date.now()+ 10*60*1000;
    

    return resetToken;
}

const User=mongoose.model('User',userSchema);

module.exports=User;