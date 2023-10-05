const mongoose=require("mongoose");

const { Schema } = mongoose;

const userschema = new Schema({
    Name:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true,
        unique:true
        
    },
    Password:{
        type:String,
        required:true
        
    },
    date:{
        type:Date,
        default:Date.now
        
    }
  });
  const User=mongoose.model('user',userschema);
  
  module.exports=User;