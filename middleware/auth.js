const jwt=require ('jsonwebtoken');

function auth(req,res,next){

  const token=req.cookies.token; // pahle humlog cookies se toker ko ,layege jo cokieese me hoga agr user log in hoga
  if(!token){ // yaha hum check kar rhe hai ki token hai ya nahi agr nahi hai to hum messge bhej rhe hai unauthorised
/*
    res.status(401).json({
      error:error.array(),  // pahle msg bhej rhe the py ab page bhej rhe hai
      message:'Unauthorized User'
    })
*/
   return res.render('./ErrorMessages/authenticationFailed')
  }

  // agr token mil jata hai to check karenge ki token sahi hai ya nahi 
  try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=decoded;
    return next();
  }catch(error){
  
    res.status(401).json({
      error:error.array(),
      message:'Unauthorized User'
    })

// res.render('./ErrorMessages/authenticationFailed')

  }

}

module.exports=auth;
