const multer = require('multer');
const fireBaseStorage =require('multer-firebase-storage')
const firebase=require('./firbase.config');
const servideAccount=require('../driveclone-2a4b2-firebase-adminsdk-fbsvc-fbe0ba7468.json')


const storage = fireBaseStorage({
  credentials:firebase.credential.cert(servideAccount),
  bucketName:'driveclone-2a4b2.firebasestorage.app',
  unique:true
})


const upload = multer({
  storage: storage
})

module.exports=upload;