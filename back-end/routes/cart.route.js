const express = require('express')
const auth = require('../middleware/auth')
const { addToCart, getCartItem, updateCart, deleteItemsInCart,checkout } = require('../controllers/cart.controller')

const cartRouter = express.Router()
cartRouter.post('/add-to-cart', auth, addToCart)
cartRouter.get('/get-cart', auth, getCartItem)
cartRouter.put('/update-cart', auth, updateCart)
cartRouter.delete('/delete-items-cart', auth, deleteItemsInCart)

module.exports = cartRouter