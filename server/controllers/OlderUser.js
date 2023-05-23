const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")

exports.userCart = async(req, res) => {
    try{
        console.log('UserCart')
        res.send('UserCart OK')
    }catch(err){
        console.log(err)
        res.status(500).send('userCart Server Error')
    }
}