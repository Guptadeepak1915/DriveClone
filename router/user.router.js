const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

router.get('/register', (req, res) => { // ye router page ko render krane ke liye hai
  res.render('register');
})


router.post('/register',

  // trim basically krta yah hai ki ye data ke aage or pichhespace ko hatadeta hai 
  body('username').trim(),
  body('email').trim().isEmail(),      // ye teen line middle ware hai jo checka krega ki data valid hai ya nahi 
  body('password').trim().isLength({ min: 4 }),

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // res.send('invalid data') // ussusally hum aise error nhi bhejte hai 
      res.status(400).json({   //aise bhejte hai 
        error: error.array(),
        message: "Invalid Data"
      })
    }

    const { username, email, password } = req.body;
    /*
        userModel.create({
          username:username,
          email:email,
          password:password
        }).then(()=>{            // ye part of code thjik hai but production me aise nahi likhate hai 
              console.log(req.body);
        })
        res.render('./response/userCreatedResponse');
    
    */
    const hashPassword = await bcrypt.hash(password, 10); // ye password ko hash me badal dega .or jo number hai wo kitna baar hash hoga wo define krta hai  


    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword
    })
    //res.json(newUser);
    res.render('./success/userCreatedResponse');
  })

//log in ke liye 
router.get('/login', (req, res) => {
  res.render('login'); // login page ko render krne ke liye ye logic
})

router.post('/login',                // ye login page se data aayega uske liye 
  body('username').trim(),
  body('password').trim().isLength({ min: 4 }),
  async (req, res) => {

    const error = validationResult(req);
    // checkin error 
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: "Invalid username & Password"
      });
    }
    const { username, password } = req.body;

    // find user from databases
    const findUser = await userModel.findOne({
      username: username,
    })

    if (!findUser) {
      /*
      return res.status(400).json({
        error: error.array(),
        meaasge: "USername & password is incorrect"
      });
      */
      return res.render('./ErrorMessages/loginFailed')

    }

    const isMatch = await bcrypt.compare(password,findUser.password);

    if(!isMatch){
     /*
      return res.status(400).json({
        error:error.array(),
        message:"username Or Password is incorrect " // yaha par hum message na bhejkar hum file ko frontend ke through dikha rhe hai erro ko 
      })
      */
     return res.render('./ErrorMessages/loginFailed')
    }
    const token=jwt.sign({
      userId:findUser._id,
      email:findUser.email,
      username:findUser.username
    },
    process.env.JWT_SECRET_KEY
  )
/*
  res.json({
    token // for cheking 
  })
*/

res.cookie('token',token) // pahla parameter value name or dusra jo token generate kiya 
// res.send("logged In") hum yaha pr upgrade karke msg nahi ek frontend show krwa rhe niche wali line se
res.render("./success/loggedin")


})



module.exports = router;