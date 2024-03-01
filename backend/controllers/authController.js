const User = require('../models/userModel')
const catchAsyncError = require('../middlewares/catchAsyncError')

exports.registerUser =catchAsyncError(async (req, res, next)=>{
    const {name, email, password, avatar}= req.body 
    
    const user=await User.create({
        name,
        email,
        password,
        avatar
    })

    res.status(201).json({
        success:true,
        user
    })
}) 