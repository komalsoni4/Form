const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

//mongodb conection
mongoose.connect("mongodb+srv://Komal:root@cluster0.utdmuhi.mongodb.net/Form").then(()=>{
    console.log(`connection Succesfull`);
}).catch((err)=> console.log('no connection'));


//create Schema
const userSchema={
    username:String,
    password:String
}
// UserName
// Password
// Confirm Password
const User=mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/Signup.html");
})
//app post

app.post("/",function(req,res){
    if(req.body.password===req.body.cpassword)
    {
        let newUser=new User({
            username:req.body.username,
            password:req.body.password
        });

        newUser.save();
        res.redirect("/");
    }
    else{
        res.send("Password not matching");
    }
   
})
app.listen(3000,function(){
    console.log("server is running on 3000");
})