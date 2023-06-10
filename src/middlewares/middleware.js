const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const userModel = require("../models/userModel")

module.exports.authentication = function(req,res,next){
    try {
        let token = req.headers["x-api-key"]
        if(!token) return res.status(400).send({status: false, message: "token is not present in header"})

        jwt.verify( token, "special secret key", (err, decode)=>{
            if(err) return res.status(401).send({status:false, message:err.message})
            else{
                req.decode = decode;
                next()
            }
        })
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}


module.exports.autherization = async function(req,res,next){
    try {
        let userId = req.params.userId;

        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status: false, message: "Please enter valid userId in params"})
        
        let getUserDetails = await userModel.findOne({_id: userId, isDeleted:false})
        if(!getUserDetails) return res.status(400).send({status:false, message:"User is not found"})

        if(userId !== req.decode.userId){
            return res.status(403).send({status:false, message:"You are not autherised"})
        }
        req.UserDetails = getUserDetails;
        next()
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}