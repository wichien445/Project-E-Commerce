const expressJWT = require("express-jwt")

exports.requireLogin = expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})