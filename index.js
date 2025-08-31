const express=require('express')
const PORT=8001;
const app=express()
const URL=require('./Models/url')
const urlRouter=require('./Routes/url')
const {connectDB}=require('./connect');
const shortid = require('shortid');
const staticRoute=require('./Routes/staticRoutes')
const path=require('path');
// const { redirect } = require('express/lib/response');


connectDB("mongodb://127.0.0.1:27017/url-shortener").then(()=>console.log("Mongodb Connected"))


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/url",urlRouter)

app.set("view engine","ejs")
app.set("views",path.resolve('./Views'))

app.use('/',staticRoute)

app.get("/:shortid", async (req, res) => {
    try {
        const shortId = req.params.shortid;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitedHistory: { timestamp: Date.now() }
                }
            },
            { new: true } 
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.redirectUrl);
       } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
})
// app.get('/analytics/:shortid',urlRouter)

app.listen(PORT,()=>console.log("Server started at 8001"));