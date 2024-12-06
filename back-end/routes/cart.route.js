const express = require('express')
const auth = require('../middleware/auth')
const { addToCart, getCartItem, checkout } = require('../controllers/cart.controller')

const cartRouter = express.Router()
cartRouter.post('/add-to-cart',auth, addToCart)
cartRouter.get('/get-cart',auth, getCartItem)

module.exports = cartRouter