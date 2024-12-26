const express = require('express')
const { checkLogin } = require('../middleware/auth')
const addNewDeliveryAddress = require('../controllers/deliveryAddress.controller')

const deliveryAddressRouter = express.Router()
deliveryAddressRouter.post('/add-delivery-address', checkLogin, addNewDeliveryAddress)

module.exports = deliveryAddressRouter