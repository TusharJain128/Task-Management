const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["Pending","Successful","Cancel"],
        default: "Pending"
    },
    priority:{
        type: String,
        enum: ["1","2","3","4","5"],
        default: "5"
    },
    date: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('Task', taskSchema)