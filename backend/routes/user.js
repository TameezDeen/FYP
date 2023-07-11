const express = require('express')
const authMiddleware = require('../middleware/requireAuth')

//controller functions
const {signupUser, loginUser,getUserDetails} = require('../controllers/userController')

const router = express.Router()

//Login route
router.post('/login', loginUser)

//Signup route
router.post('/signup', signupUser)

//Getdetails route
router.get('/details', authMiddleware, getUserDetails)

module.exports = router