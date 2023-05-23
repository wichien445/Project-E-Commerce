const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")

//LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body 

    User.findOne({ email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'1d'})
                    console.log({token, email})
                    console.log("User login successfully!")
                    return res.json({token, email})
                } else {
                    return res.status(400).json({error:"Email หรือ รหัสผ่านไม่ถูกต้อง!"})
                }
            })
        } else {
            return res.status(400).json({error:"Email หรือ รหัสผ่านไม่ถูกต้อง!"})
        }
    })
}


exports.register = (req, res) => {
    const {email,password} = req.body

    //validate data
    switch(true){
        case !email:
            return res.status(400).json({error:"กรุณากรอก Email"})
            break;
        case !password:
            return res.status(400).json({error:"กรุณากรอกรหัสผ่าน"})
            break;
    }

    User.create({email,password})
    .then((user) => {
        const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'1d'})
        console.log("User registered successfully!")
        res.json({token ,email})
    }).catch((error) => {
        //console.log(error.errors)
        res.status(400).json(error)
    })
}