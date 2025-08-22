const express=require('express')
const PORT=8001;
const app=express()
const URL=require('./Models/url')
const urlRouter=require('./Routes/url')
const {connectDB}=require('./connect');
const shortid = require('shortid');
// const { redirect } = require('express/lib/response');


connectDB("mongodb://127.0.0.1:27017/url-shortener").then(()=>console.log("Mongodb Connected"))


app.use(express.json())
app.use("/url",urlRouter)
app.get("/:shortid",async (req,res)=>{
    const shortID=req.params.shortid
    const entry=await URL.findOneAndUpdate(
        {shortID},
        {$push:
            {
            visitedHistory:[{timestamp:Date.now()}]
           }
        }
    )
    return res.redirect(entry?.redirectUrl)
})
// app.get('/analytics/:shortid',urlRouter)

app.listen(PORT,()=>console.log("Server started at 8001"));