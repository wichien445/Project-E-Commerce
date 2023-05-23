const express = require("express")
const router = express.Router()
const {login , register} = require("../controllers/loginUserController")
const {userCart} = require("../controllers/OlderUser")

//SIGN-UP API
router.post('/signup', register)
//LOGIN API
router.post('/login', login)
//User Cart
router.post('/user/cart', userCart)

module.exports = router