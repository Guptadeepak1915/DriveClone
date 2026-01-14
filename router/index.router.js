const express=require('express');
const router =express.Router()
const upload=require('../config/multer.config')
const fileModel=require('../models/file.model');
const authMiddleware=require('../middleware/auth')
const firebase=require('../config/firbase.config') // ye file esliye require kar rhe hai kyuki firebase hume file accese nahi krne deta hai to hume ek url banana hoga


router.get('/',async(req,res)=>{ // ye jo route hai page ko rener karane ke liye 
   const userFile= await fileModel.find({
    // user:req.user.userId
   })
   console.log(userFile)

  res.render('home',{
    file:userFile  // ye line of code file route pr userFile me jo database se information aayega usko frontend pr bhejega 
  })
})

router.post('/upload',authMiddleware,upload.single('file'),async (req,res)=>{
  
  const newFile=await fileModel.create({
    path:req.file.path,
    originalName:req.file.originalname,
    user:req.user.userId
  })
 /*
  res.json(newFile); // yaha hum file ko bhej rhe hai but eske jagah pr hum ek ejs file bhjeneg 
*/
res.render('./success/fileUploaded');
})

router.get('/download/:path',authMiddleware,async(req,res)=>{ // yaha hum download ke liye ek route create kar rhe hai or bich memiddleware use kar rhe hai taki authorised user hi acces kar sake  

  const loggedInUserId=req.user.userId; // yaha hum logged in user ki id nikal rhe hai 
  const path=req.params.path;  // or yaha file ka path 

  const file=await fileModel.findOne({ // yaha check kar rhe hai ki jis user ne file ko upload kiya tha kya wahi download kar rha hai 
    user:loggedInUserId,
    path:path
  })

  if(!file){   // yaha checkar rhe hai i agr nahi to use bolo ki unauthorised kyuki aapk dusre ki file download nahi kar skte hai 
    res.status(401).json({
      message:'Unauthorizr'
    })
  }

  const signedUrl=await firebase.storage().bucket().file(path).getSignedUrl({
    action:'read', // phla parameter kya krna chate ho jaise ki read
    expires:Date.now() + 60 *1000 // ye etnne time tak available rhta hai 
  })
  console.log(signedUrl)
  res.redirect(signedUrl[0]) // signedurl bassically url return krta hai to uska hume phla element chiye 

})

module.exports=router;