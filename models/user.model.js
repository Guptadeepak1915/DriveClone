const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    minLength:[6,'The USername must be at least 6 charecter long'],
    trim:true,
    lowercase:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minLength:[13,'The email must be at least 6 charecter long'],
    trim:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    minLength:[8,"The password must be 8 charector log"],
    trim:true
  }
})

const userModel= mongoose.model('User',userSchema);

module.exports=userModel;