const Product = require('../models/productModel')
const APIFeatures = require('../utils/apiFeatures')
const ErrorHandler= require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')


//Get products - http://localhost:8000/api/v1/products
exports.getProducts =async (req,res,next)=>{
    const resPerPage= 4
    
    let buildQuery =()=>{

        return new APIFeatures(Product.find(), req.query).search().filter()
    }

    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Product.countDocuments({})
    const productsCount= totalProductsCount

    if(filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }
    const products = await buildQuery().paginate(resPerPage).query;
    
    res.status(200).json({
        success:true,
        count: productsCount,
        resPerPage,
        products
    })
}


//Create product - http://localhost:8000/api/v1/products/new
exports.newProduct =catchAsyncError( async (req, res, next)=>{
    req.body.user = req.user.id 
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

//Create Review - http://localhost:8000/api/v1/review
exports.createReview = catchAsyncError(async (req,res,next)=>{
    const {productId, rating , comment }= req.body

    const review ={
        user: req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    //finding user already reviewed
    if(isReviewed){

        //updating review
        product.reviews.forEach(review =>{
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })

    }else{
        //crating review
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    //find the average of ratings
    product.ratings = product.reviews.reduce((acc , review) =>{
        return review.rating + acc
    },0)/ product.reviews.length
    product.ratings=isNaN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })

})

//Get reviews - http://localhost:8000/api/v1/reviews?id= id
exports.getReviews = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

//Delete review - http://localhost:8000/api/v1/review?id=id&productid=id
exports.deleteReview = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId)

    //filtering reviews 
    const reviews = product.reviews.filter(review =>{
        return review._id.toString() !== req.query.id.toString()
    })

    //update number of reviews
    const numOfReviews = reviews.length

    //finding average ratings
    let ratings = reviews.reduce((acc , review) =>{
        return review.rating + acc
    },0)/ reviews.length
    ratings=isNaN(ratings)?0:ratings


    //save the product
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200)
    .json({
        success:true
    })
    
})