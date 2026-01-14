const mongoose=require('mongoose');

function connectToDB(){
  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("✅ Succesfully DataBase Conneccted")
  })
}

module.exports=connectToDB;