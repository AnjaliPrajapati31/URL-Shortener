const shortid=require('shortid')
const URL=require('../Models/url')

async function getShortURL(req,res) {
    const body=req.body
    console.log(body)
    if(!body.url)return res.status(400).json({msg:"URL is required"})
    const shortId=shortid.generate()
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitedHistory:[]
    })
    return res.send({id:shortId})
}
async function getAnalytics(req,res){
    const shortId=req.params.id;
    const result=await URL.findOne({shortId})
    return res.json({
        totalclicks:result.visitedHistory.length,
        analytics:result.visitedHistory,
    })
}

module.exports={getShortURL,getAnalytics}