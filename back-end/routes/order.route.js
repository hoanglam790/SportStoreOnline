const express = require('express')
const { auth, checkLogin } = require('../middleware/auth')
const { orderCheckOutInCash, getAllOrders, getOrderDetails } = require('../controllers/order.controller')

const orderRouter = express.Router()
orderRouter.post('/pay-in-cash', checkLogin, orderCheckOutInCash)
orderRouter.get('/get-all-orders', auth, getAllOrders)
orderRouter.post('/get-order-details', auth, getOrderDetails)

module.exports = orderRouter