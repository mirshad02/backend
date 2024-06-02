import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const app=express()

mongoose.connect('mongodb://127.0.0.1:27017/nodeExpress')
  .then(() => console.log('Connected!'));

  const db=mongoose.connection

let middle=(req,res,next)=>{
    let x=2
    if(x==2){

        console.log('middleware');
        next()
    }
    else{
        res.json('invalid')
    }
}


let verifyToken=(req,res,next)=>{
    try{

        console.log(req.headers.authorization);
        let response=jwt.verify(req.headers.authorization,'abc')
        console.log(response);
        next()
    }
    catch(e){
        res.status(401).json(e.message)
    }
}

app.use(middle)
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.get('/login',(req,res)=>{
    res.json('login page')
})

app.post('/register',async (req,res)=>{
    try{

        console.log(req.body);
       const {username, password}=req.body
        let hashedPassword=await bcrypt.hash(password,10)
        console.log(hashedPassword);

        req.body={...req.body,password:hashedPassword}

        console.log(req.body,'new body');
        let newdata=new User(req.body)
        console.log(newdata)
        
        let response=await newdata.save()
        //    let response=await  db.collection('Newusers').insertOne(req.body)
        console.log(response);
        res.json(response)
    }
    catch(e){
        res.status(500).json(e.message)
    }

})

app.get('/view',verifyToken,async(req,res)=>{
    let users=await User.find()
    // let users=await db.collection('Newusers').find().toArray()
    console.log(users);
    res.json(users)
})
app.delete('/deleteData/:id',async(req,res)=>{
    let id=req.params.id
    // let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    let response=await User.findByIdAndDelete(id)
    // let response=await db.collection('Newusers').deleteOne({_id:id})
    res.json(response)
})
app.get('/findOne/:id',async (req,res)=>{
    let id=req.params.id
    // let id=new mongoose.Types.ObjectId(req.params.id)
    let response=await User.findById(id) 
    // let response=await db.collection('Newusers').findOne({_id:id})
    res.json(response)

})
app.put('/updateOne/:id',async(req,res)=>{
    let id=req.params.id
    // let id=new mongoose.Types.ObjectId(req.params.id)
    let response=await User.findByIdAndUpdate(id,req.body)
    // let response=await db.collection('Newusers').updateOne({_id:id},{$set:req.body})
    res.json(response)

})

app.post('/login',async (req,res)=>{
   console.log(req.body);
   const {username,password}=req.body
   let users=await User.findOne({username:username})
   console.log(users);
  if(!users){
    return res.status(401).json('invalid username or password')
  }

  let matchPassword=await bcrypt.compare(password,users.password)
  console.log(matchPassword);
  if(!matchPassword){
    return res.status(401).json('invalid username or password')
  }
  let token=jwt.sign({id:users._id,username:users.username},'abc')
  console.log(token);
  res.json({users,token})
})


app.listen(4000,()=>{
    console.log('running');
})
