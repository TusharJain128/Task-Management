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
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    date: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


module.exports = mongoose.model('Task', taskSchema)