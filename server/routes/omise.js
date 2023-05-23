const express = require("express");
let router = express.Router();
require('dotenv').config()

var omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
});

router.post('/payment', async (req, res, next) => {
    const { email, name, amount, token } = req.body 
    try {
        const customer = await omise.customers.create({
            email,
            description: name,
            card: token
        });

        const charge = await omise.charges.create({
            amount: amount,
            currency: "thb",
            customer: customer.id
        });
        
        res.send({
          amount: charge.amount,
          status: charge.status
        })
        console.log(charge)
    } catch (error) {
        console.log(error)
    }
    next()
})

module.exports = router;