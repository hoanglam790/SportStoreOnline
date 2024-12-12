const mongoose = require('mongoose')
const CartModel = require('../models/cart.model')
const CartItemModel = require('../models/cartItem.model')
const OrderModel = require('../models/order.model')
const OrderDetailModel = require('../models/orderDetails.model')

{/** Tạo mới đơn hàng thanh toán bằng tiền mặt */}
const checkOutInCash = async(req,res) => {
    try {
        const userId = req?.user?.id // Middleware
        const sessionId = req.sessionID
        const { deliveryAddress, paymentMethod } = req.body

        // Xác định giỏ hàng của khách
        let cart = null
        if (userId) {
            cart = await CartModel.findOne({ userId })
        } else if (sessionId) {
            cart = await CartModel.findOne({ sessionId })
        }

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Giỏ hàng không tồn tại'
            })
        }

        // Lấy các sản phẩm trong giỏ hàng
        const cartItems = await CartItemModel.find({ cartId: cart._id })
            .populate('productId', 'name price discount')
        
        // Tính tổng giá trị đơn hàng và tổng số lượng
        let totalAmount = 0
        let totalQuantity = 0       
        const orderDetails = []

        cartItems.forEach(item => {
            const discount = item.discount || 0
            const actualPrice = discount > 0 ? item.price - ((item.price * item.discount) / 100) : item.price

            totalQuantity += item.quantity
            totalAmount += item.quantity * actualPrice
            orderDetails.push({
                productId: item.productId._id,
                quantity: item.quantity,
                price: actualPrice,
                total: item.quantity * actualPrice
            })
        })

        // Tạo đơn hàng mới
        const order = new OrderModel({
            userId: userId || null,
            sessionId: userId ? null : sessionId,
            totalAmount,
            totalQuantity,
            deliveryAddress,
            paymentMethod,
            status: 'Chờ xử lý'
        })
        await order.save()

        // Tạo chi tiết đơn hàng
        for (let detail of orderDetails) {
            await OrderDetailModel.create({
                orderId: order._id,
                ...detail
            })
        }

        // Xóa giỏ hàng sau khi thanh toán
        await CartItemModel.deleteMany({ cartId: cart._id })
        await CartModel.deleteOne({ _id: cart._id })

        return res.status(200).json({
            success: true,
            message: 'Thanh toán thành công',
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

module.exports = { checkOutInCash }