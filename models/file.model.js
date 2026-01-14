const mongoose = require('mongoose');

const fileSchema=new mongoose.Schema({
  path:{
    type:String,
    required:true
  },
  originalName:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true
  
  }
})

const fileModel=mongoose.model('files',fileSchema);

module.exports=fileModel;