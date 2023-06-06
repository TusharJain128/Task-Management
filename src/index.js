const express = require("express")
const mongoose = require("mongoose")
const route = require('./routes/route')
const app = express()

app.use(express.json());

mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://TusharJainFunctionup:functionup@tusharjaindb.zxey2fj.mongodb.net/task-management")
.then(()=>{ console.log("mongodb is connected successfully")})
.catch((err)=>{ console.log(err)})

app.use("/", route)

app.listen(3000, ()=>{
    console.log("Application is running on 3000 port")
})
