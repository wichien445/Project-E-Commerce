const express = require("express")
const router = express.Router()
const {addProduct, getAllproducts, singleProduct} = require("../controllers/ProductsController")

//ADD PRODUCTS API
router.post('/addproduct', addProduct)
//GET ALL PRODUCTS API
router.get('/products', getAllproducts)
//GET SINGLE PRODUCTS API
router.get('/product/:slug', singleProduct)

module.exports = router