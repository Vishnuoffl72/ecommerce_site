const express = require('express')
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, changePassword, updateProfile,getUser ,getAllUsers,updateUser, deleteUser } = require('../controllers/authController')
const router= express.Router()
const {isAuthenticatedUser, authorizedRoles}= require('../middlewares/authenticate')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myprofile').get( isAuthenticatedUser ,getUserProfile)
router.route('/password/change').put(isAuthenticatedUser, changePassword)
router.route('/update').put(isAuthenticatedUser, updateProfile)

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('admin'), getAllUsers)

router.route('/admin/user/:id').get(isAuthenticatedUser, authorizedRoles('admin'), getUser)

router.route('/admin/user/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)

router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser)

module.exports=router