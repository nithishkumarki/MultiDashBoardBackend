const port=4000;
const express=require('express');
const app=express();//crating app instance
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');// to get aceess to backend directory
const cors=require('cors');
//nithishkumarillayaraja14
//nsgMrIgRlxhTVzcW
app.use(express.json());
app.use(cors());

const User=mongoose.model('Users',
    {
        name:String,
        email:String,
        password:String
    });

mongoose.connect("mongodb+srv://nithishkumarillayaraja14:nsgMrIgRlxhTVzcW@cluster0.pwdhl.mongodb.net/db1");

app.get("/",(req,res)=>{
   
})



app.post("/signup",async(req,res)=>
    {
        let checkUser=await User.findOne({email:req .body.email});
        if(checkUser)
        {
            res.json({success:false,errors:"User Already Exists"});
            return;
        }

        const userObject=new User({
            name:req.body.name,
            email:req.body.email, 
            password:req.body.password
        });

        await userObject.save();
        const data={userObject:{id:userObject.id}}
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
        
    })

    app.post("/login",async(req,res)=>

        {
    
            let user=await User.findOne({email:req.body.email,password:req.body.password});
            if(user)
            {
               const passCompare=req.body.password==user.password;
               if(passCompare)
               {
                const data={userObject:{id:user.id}}
                const token=jwt.sign(data,'secret_ecom');
                res.json({success:true,token});
               }

            }
            else{
                res.json({success:false,errors:"user not found"});
            }
    
            
        })

app.listen(port,(error)=>{
    if(!error)
    {
     console.log("Server Running on Port"+port);
    }
    else{
     console.log("Error : "+error);
    }
})


