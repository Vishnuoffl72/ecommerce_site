const products = require('../data/product.json')
const product = require('../models/productModel')
const connectDatabase = require('../config/database')

const dotenv= require('dotenv')

dotenv.config({path:'backend/config/config.env'})
connectDatabase()

const seedProducts =async ()=>{
    try{
        await product.deleteMany();
        console.log('Products deleted')
        await product.insertMany(products)
        console.log('All products added')
    }catch(error)
    {
        console.log(error.message)
        
    }
    process.exit();
}

seedProducts();