const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require('mongoose')
const flash = require('connect-flash')

require("dotenv").config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(()=>console.log("Connect DataBase Succeed"))
.catch((err)=>console.console.log(err))

// Controllers

// Middleware

// Route
const user = require("./routes/user")
const products = require("./routes/products")
const omise = require("./routes/omise")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
app.use(flash())
app.use(morgan("dev"))

//ROUTE
app.use('/api', user)
app.use('/api', products)
app.use('/api', omise)

//SET PORT
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Start Server In PORT ${port}`)
})