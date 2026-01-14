const express=require('express');
const userRouter=require('./router/user.router')
const dotenv=require('dotenv');
const connectToDB=require('./config/DB')
const cookieParser=require('cookie-parser')
const indexRouter=require('./router/index.router')

dotenv.config(); // for env file ke liye ye function call karni hoti hai 
connectToDB(); // ye database connection ke liye


const app=express();
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/',indexRouter)
app.use('/user',userRouter);

app.listen(7211,()=>{
  console.log('The port is running on 7211');
})