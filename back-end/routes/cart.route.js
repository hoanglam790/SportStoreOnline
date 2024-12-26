const express = require('express')
const { auth, checkLogin } = require('../middleware/auth')
const { addToCart, getCartItem, updateCart, deleteItemsInCart } = require('../controllers/cart.controller')

const cartRouter = express.Router()
cartRouter.post('/add-to-cart', checkLogin, addToCart)
cartRouter.get('/get-cart', checkLogin, getCartItem)
cartRouter.put('/update-cart', checkLogin, updateCart)
cartRouter.delete('/delete-items-cart', checkLogin, deleteItemsInCart)

module.exports = cartRouter