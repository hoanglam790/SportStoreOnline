const mongoose = require('mongoose')
const DeliveryAddressModel = require('../models/deliveryAddressDetails.model')
const OrderModel = require('../models/order.model')

const addNewDeliveryAddress = async(req,res) => {
    try {
        const { name, email, phone_number, address } = req.body

        if(!name || !email || !phone_number || !address){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })
        }

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
                address: address
            })
            await deliveryAddress.save()
        }

        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Lưu dữ liệu địa chỉ thành công',
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