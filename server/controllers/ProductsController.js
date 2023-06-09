const Products = require('../models/Products')
const slugify = require("slugify")

////ADD PRODUCTS
exports.addProduct = (req, res) => {
    const {name, content, price, imageSrc, category, status, quantity, nameTH} = req.body
    let slug = slugify(name)

    //validate data
    switch(true){
        case !name:
            return res.status(400).json({error:"กรุณาป้อนชื่อ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;
        case !price:
            return res.status(400).json({error:"กรุณาป้อนราคา"})
            break;
        case !imageSrc:
            return res.status(400).json({error:"กรุณาป้อนลิ้งรูป"})
            break;
        case !category:
            return res.status(400).json({error:"กรุณาป้อนหมวดหมู่"})
            break;
        case !status:
            return res.status(400).json({error:"กรุณาป้อนหมวดหมู่"})
            break;
        case !quantity:
            return res.status(400).json({error:"กรุณาป้อนหมวดหมู่"})
            break;
        case !nameTH:
            return res.status(400).json({error:"กรุณาป้อนหมวดหมู่"})
            break;
    }

    Products.create({name, content, price, imageSrc, category, slug, status, quantity, nameTH})
    .then((products) => {
        res.json(products)
    })
    .catch((err) => {
        res.status(400).json({error:err})
    })
}

//GET ALL PRODUCT API
exports.getAllproducts=(req,res)=>{

    //Get ALL PRODUCT
    Products.find({})
    .then((products)=>{
        res.json(products)
    })
    .catch((err)=>{
        res.status(400).json({error:err})
    })
}

//GET SINGLE DATA ตาม slug
exports.singleProduct=(req,res)=>{
    const {slug} = req.params
    Products.findOne({slug})
    .then((product)=>{
        res.json(product)
    })
    .catch((err)=>{
        res.status(400).json({error:err})
    })
}
