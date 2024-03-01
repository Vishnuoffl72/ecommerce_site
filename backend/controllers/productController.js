const Product = require('../models/productModel')
const APIFeatures = require('../utils/apiFeatures')
const ErrorHandler= require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')


//Get products - http://localhost:8000/api/v1/products
exports.getProducts =async (req,res,next)=>{
    const resPerPage= 2
    const apiFeatures =new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage)

    const products= await apiFeatures.query
    res.status(200).json({
        success:true,
        count: products.length,
        products
    })
}


//Create product - http://localhost:8000/api/v1/products/new
exports.newProduct =catchAsyncError( async (req, res, next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//Get single product - http://localhost:8000/api/v1/product/:id
exports.getSingleProduct =catchAsyncError(async(req, res ,next)=>{
    const product =await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found test", 400))
    }

    res.status(201).json({
        success:true,
        product
    })
}) 

//update product - http://localhost:8000/api/v1/product/:id
exports.updateProduct= async(req,res,next)=>{
    let data=await Product.findById(req.params.id)

    if(!data){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    data=await Product.findByIdAndUpdate(data, req.body, {
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data
    })
    
}


//delete Prodect - http://localhost:8000/api/v1/product/:id
exports.deleteProduct= async (req, res, next)=>{
    const product=await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    await Product.deleteOne(product)

    res.status(200).json({
        success:true,
        message: "Product deleted"
    })
}