const express = require('express')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController')
const router = express.Router()
const {isAuthenticatedUser, authorizedRoles }= require('../middlewares/authenticate')

router.route('/products').get(isAuthenticatedUser ,getProducts)


router.route('/product/:id').get(getSingleProduct)

router.route('/product/:id').put(updateProduct)

router.route('/product/:id').delete(deleteProduct)

router.route('/review').put(isAuthenticatedUser, createReview)

router.route('/review').delete(deleteReview)

router.route('/reviews').get(getReviews)


//Admin route
router.route('/admin/products/new').post(isAuthenticatedUser,authorizedRoles('admin'),newProduct)

module.exports = router