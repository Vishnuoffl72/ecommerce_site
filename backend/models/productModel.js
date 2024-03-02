const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter product name"],
        trim: true,
        maxLength:[100,"Product name cannot exceed 100 charecter"]
    },

    price:{
        type:Number,
        default: 0.0,
    },

    description:{
        type:String,
        required:[true,"Please enter description"]
    },

    ratings:{
        type:String,
        default: 0
    },

    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],

    category:{
        type:String,
        required:[true, "Please enter product category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please select correct category"
        }
    },

    seller:{
        type:String,
        required: [true, "Please enter product seller"]
    },

    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[20,'Product stock must below 21']
    },

    numOfReviews: {
        type:Number,
        default:0
    },

    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId
    },

    createdAt:{
        type:Date,
        default: Date.now()
    }
})

let modelSchema=mongoose.model('Product', productSchema)

module.exports = modelSchema