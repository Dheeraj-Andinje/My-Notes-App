const mongoose=require("mongoose");
const { Schema } = mongoose;

const notesschema = new Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    },
    Title:{
        type:String,
        required:true,

    },
    Description:{
        type:String,
        required:true,
     
    },
    Tag:{
        type:String, 
    },
    Date:{
        type:Date,
        default:Date.now
        
    }
  });

  module.exports=mongoose.model('notes',notesschema);