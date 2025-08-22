const mongoose=require('mongoose')

const URLSchema=mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitedHistory:[{timestamp:{type:Number}}]
},{timestamps:true}
)

const URL=mongoose.model("url",URLSchema)

module.exports=URL