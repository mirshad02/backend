// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// const app=express()

// mongoose.connect('mongodb://127.0.0.1:27017/nodeExpress')
//   .then(() => console.log('Connected!'));

//   const db=mongoose.connection
// app.use(express.json())
// app.use(cors())
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
// app.use(middle)


// app.get('/login',(req,res)=>{
//     res.json('login page')
    
// })

// app.post('/register',async (req,res)=>{
//     console.log(req.body,'datas');
//    let response=await  db.collection('Newusers').insertOne(req.body)
//    console.log(response);
//     res.json(response)

// })

// app.get('/view',async(req,res)=>{
//     let users=await db.collection('Newusers').find().toArray()
//     console.log(users);
//     res.json(users)
// })
// app.delete('/deleteData/:id',async (req,res)=>{
//     let id=new mongoose.Types.ObjectId(req.params.id)
//     let response=await db.collection('Newusers').deleteOne({_id:id})
//     console.log(response);
//     res.json(response)

// })
// app.get('/findOne/:id',async (req,res)=>{
//     let id=new mongoose.Types.ObjectId(req.params.id)
//     let response=await db.collection('Newusers').findOne({_id:id})
//     res.json(response)

// })
// app.put('/updateOne/:id',async(req,res)=>{
//     let id=new mongoose.Types.ObjectId(req.params.id)
//     let response=await db.collection('Newusers').updateOne({_id:id},{$set:req.body})
//     res.json(response)

// })

// app.listen(4000,()=>{
//     console.log('running');
// })

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
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
app.use(cors())
app.use(express.json())
app.get('/login',(req,res)=>{
    res.json('login page')
})

app.post('/register',async (req,res)=>{
console.log(req.body);

   let response=await  db.collection('Newusers').insertOne(req.body)
   console.log(response);
    res.json(response)

})

app.get('/view',async(req,res)=>{
    let users=await db.collection('Newusers').find().toArray()
    console.log(users);
    res.json(users)
})
app.delete('/deleteData/:id',async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    let response=await db.collection('Newusers').deleteOne({_id:id})
    res.json(response)
})
app.get('/findOne/:id',async (req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    let response=await db.collection('Newusers').findOne({_id:id})
    res.json(response)

})
app.put('/updateOne/:id',async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    let response=await db.collection('Newusers').updateOne({_id:id},{$set:req.body})
    res.json(response)

})
app.listen(4000,()=>{
    console.log('running');
})
