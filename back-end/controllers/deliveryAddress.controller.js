const mongoose = require('mongoose')
const DeliveryAddressModel = require('../models/deliveryAddressDetails.model')
const OrderModel = require('../models/order.model')

const addNewDeliveryAddress = async (req,res) => {
    try {
        const { name, email, phone_number, address, orderId } = req.body

        let deliveryAddress = await DeliveryAddressModel.findOne({
            name,
            email,
            phone_number,
            address
        })

        if(!deliveryAddress){
            deliveryAddress = new DeliveryAddressModel({
                name: name,
                email: email,
                phone_number: phone_number,
                address: address,
                orderId: orderId
            })
            await deliveryAddress.save()
        }

        const addOrderAddress = await OrderModel.findByIdAndUpdate(orderId, {
            $push: {
                deliveryAddress: deliveryAddress._id
            }
        })
        
        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            message: 'Thêm địa chỉ mới thành công',
            data: deliveryAddress
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

module.exports = addNewDeliveryAddress