const express = require('express')
const auth = require('../middleware/auth')
const { checkOutInCash } = require('../controllers/order.controller')

const orderRouter = express.Router()
orderRouter.post('/pay-in-cash', auth, checkOutInCash)

module.exports = orderRouter