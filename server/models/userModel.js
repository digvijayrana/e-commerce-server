const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true,
        minlength:3
    },
    
    email : {
        type:String,
        required:true,
        unique:[true, "Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },

    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        min:10,
        // max:10,
        required:true,
        unique:true
    }  ,
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    profilePicture:{type: String},

},{
    timestamps:true
})


const user =  new mongoose.model('employee',userSchema);
module.exports = user;