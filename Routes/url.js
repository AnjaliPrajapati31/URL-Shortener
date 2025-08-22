const express=require('express')
const router=express.Router()
const {getShortURL,getAnalytics}=require('../Controller/url')

router.post("/",getShortURL)
router.get("/analytics/:shortid",getAnalytics)

module.exports=router