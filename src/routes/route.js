const express = require("express")
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require("../controllers/userController")
const { authentication, autherization } = require("../middlewares/middleware")
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("Api is working fine")
})

router.post('/createUser', registerUser)
router.post('/login', loginUser)

router.get('/getUser/:userId', authentication, autherization, getUser)
router.put('/updateUser/:userId', authentication, autherization, updateUser)
router.delete('/deleteUser/:userId', authentication, autherization, deleteUser)

module.exports = router;