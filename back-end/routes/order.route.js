const express = require('express')
const { auth, checkLogin } = require('../middleware/auth')
const { orderCheckOutInCash, orderCheckOutPaymentOnline, getAllOrders, getOrderDetails, webhookStripeOrder } = require('../controllers/order.controller')

const orderRouter = express.Router()
orderRouter.post('/pay-in-cash', checkLogin, orderCheckOutInCash)
orderRouter.post('/pay-online', checkLogin, orderCheckOutPaymentOnline)
orderRouter.get('/get-all-orders', auth, getAllOrders)
orderRouter.post('/get-order-details', auth, getOrderDetails)
orderRouter.post('/webhook', webhookStripeOrder)

module.exports = orderRouter