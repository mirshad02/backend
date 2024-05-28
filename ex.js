// const express=require('express')
// const app=express()
// let middle=(req,res,next)=>{
//     let x=2
//     if(x==2){

//         console.log('middleware');
//         next()
//     }
//     else{
//         res.json('invalid')
//     }
// }

// // app.get('/',(req,res)=>{
// //     res.send('home')
// // })
// app.get('/login',(req,res)=>{
//     res.json('login page')
// })
// app.put('/register',(req,res)=>{
//     res.json('register page')
// })
// app.listen(4000,()=>{
//     console.log('running on 4000');
// })

import express from 'express'
import mongoose from 'mongoose'
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
app.use(middle)

app.get('/login',(req,res)=>{
    res.json('login page')
    
})

app.get('/register',async (req,res)=>{
   let response=await  db.collection('Newusers').insertOne({name:'abc',age:33})
   console.log(response);
    res.json(response)

})

app.get('/view',async(req,res)=>{
    let users=await db.collection('Newusers').find().toArray()
    console.log(users);
    res.json(users)
})
app.get('/update',async(req,res)=>{
    let response=await db.collection('Newusers').updateOne({age:33},{$set:{name:'acd'}})
    console.log(response);
    res.json(response)
})
app.post('delete',async(req,res)=>{
    let response=await db.collection('Newusers').deleteOne({name:abc})
    console.log(response);
    res.json(response)
})



app.listen(4000,()=>{
    console.log('running');
})

