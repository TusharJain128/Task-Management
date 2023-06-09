const express = require("express")
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require("../controllers/userController")
const { authentication, autherization } = require("../middlewares/middleware")
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController")
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("Api is working fine")
})

router.post('/createUser', registerUser)
router.post('/login', loginUser)

router.get('/getUser/:userId', authentication, autherization, getUser)
router.put('/updateUser/:userId', authentication, autherization, updateUser)
router.delete('/deleteUser/:userId', authentication, autherization, deleteUser)

router.post('/createTask/:userId', authentication, autherization, createTask)
router.get('/getAllTasks/:userId' , authentication, autherization, getAllTasks)
router.put('/updateTask/:userId/:taskId', authentication, autherization, updateTask)
router.delete('/deleteTask/:userId/:taskId', authentication, autherization, deleteTask)

module.exports = router;