const { default: mongoose } = require("mongoose");
const taskModel = require("../models/taskModel");
const { createTaskJoi, updateTaskJoi } = require("../validator/joiValidation");


module.exports.createTask = async function(req,res){
    try {
        let data = req.body
        
        let error
        const validation = await createTaskJoi.validateAsync(data).then(()=> true).catch((err)=> {error = err.message; return null})
        if(!validation) return res.status(400).send({status:false, message: error})

        data.userId = req.decode.userId;

        let createTaskDetails = await taskModel.create(data)

        res.status(201).send({status: true, message: createTaskDetails})
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}


module.exports.getAllTasks = async function(req, res){
    try {
        let { priority, status } = req.query;

        let filter = {isDeleted: false}

        if(priority){
            if(!["Low", "Medium", "High"].includes(priority)) return res.status(400).send({status:false, message:"You can filter priority by Low,Medium,High"})
            filter.priority = priority
        }

        if(status){
            if(!["Pending","Successful","Cancel"].includes(priority)) return res.status(400).send({status:false, message:"You can filter status by Pending,Successful,Cancel"})
            filter.status = status
        }

        let getDetails = await taskModel.find( filter )
        return res.status(200).send({status: true, message: getDetails})
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}


module.exports.updateTask = async function(req, res){
    try {
        let data = req.body
        let taskId = req.params.taskId
        if(!mongoose.isValidObjectId(taskId)) return res.status(400).send({status:false, message:"Please enter valid task id"})
        
        if(!Object.keys(data).length) return res.status(400).send({status:false, message:"Please enter some data for update"})

        let isExistTask = await taskModel.findOne({_id: taskId, isDeleted:false}).lean()
        if(!isExistTask) return res.status(404).send({status: false, message:"Task is not exist"})
        
        let error
        const validation = await updateTaskJoi.validateAsync(data).then(()=> true).catch((err)=> {error = err.message; return null})
        if(!validation) return res.status(400).send({status:false, message: error})

        let updateTaskDetails = await taskModel.findOneAndUpdate(
            {_id: taskId, isDeleted: false},
            data,
            {new: true}
        )

        res.status(200).send({status: true, message: updateTaskDetails})
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}


module.exports.deleteTask = async function(req, res){
    try {
        let taskId = req.params.taskId
        if(!mongoose.isValidObjectId(taskId)) return res.status(400).send({status:false, message:"Please enter valid task id"})

        let deleteTaskDetails = await taskModel.findOneAndUpdate(
            {_id: taskId, isDeleted: false},
            {isDeleted: true},
            {new: true}
        )
        
        if(!deleteTaskDetails) return res.status(404).send({status:false, message:"Task is not exist"})

        res.status(200).send({status: true, message: "task is deleted successfully"})
    } 
    catch (error) {
        return res.status(500).send({status:false, error: error})
    }
}