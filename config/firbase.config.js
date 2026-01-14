const Firebase =require('firebase-admin');
const servideAccount=require('../driveclone-2a4b2-firebase-adminsdk-fbsvc-fbe0ba7468.json')

const firebase=Firebase.initializeApp({
  credential:Firebase.credential.cert(servideAccount),
  storageBucket:'driveclone-2a4b2.firebasestorage.app'
})


module.exports=Firebase;