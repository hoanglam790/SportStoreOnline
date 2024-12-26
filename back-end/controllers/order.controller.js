const mongoose = require('mongoose')
const CartModel = require('../models/cart.model')
const CartItemModel = require('../models/cartItem.model')
const OrderModel = require('../models/order.model')
const OrderDetailModel = require('../models/orderDetails.model')

{/** Tạo mới đơn hàng thanh toán bằng tiền mặt */}
const orderCheckOutInCash = async(req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { delivery_address, payment_method } = req.body

        // Xác định giỏ hàng của khách
        let cart = await CartModel.findOne({ 
            $or: [
                { user_id },  // Tìm theo userId nếu đã đăng nhập
                { session_id } // Tìm theo sessionId nếu chưa đăng nhập
            ]
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Giỏ hàng không tồn tại'
            })
        }

        // Lấy các sản phẩm trong giỏ hàng
        const cartItems = await CartItemModel.find({ cart_id: cart._id })
            .populate('product_id', 'name price')
        
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
                product_id: item.product_id._id,
                quantity: item.quantity,
                price: actualPrice,
                total: item.quantity * actualPrice
            })
        })

        // Tạo đơn hàng mới
        const order = new OrderModel({
            user_id: user_id || null,
            session_id: user_id ? null : session_id,
            total_amount: totalAmount,
            total_quantity: totalQuantity,
            delivery_address,
            payment_method,
            status: 'Chờ xử lý'
        })
        await order.save()

        // Tạo chi tiết đơn hàng
        for (let detail of orderDetails) {
            await OrderDetailModel.create({
                order_id: order._id,
                ...detail
            })
        }

        // Xóa giỏ hàng sau khi thanh toán
        await CartItemModel.deleteMany({ cart_id: cart._id })
        await CartModel.deleteOne({ _id: cart._id })

        return res.status(200).json({
            success: true,
            error: false,
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

{/** Lấy tất cả các đơn hàng */}
const getAllOrders = async(req,res) => {
    try {
        const user_id = req?.user?.id
        
        // Tìm tất cả các đơn hàng của người dùng
        const getOrder = await OrderModel.find({ user_id }).sort({ createdAt: -1 })
        if (getOrder.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không có đơn hàng nào'
            })
        }

        // Lấy chi tiết các đơn hàng
        const getOrderDetails = await OrderDetailModel.find({
            order_id: { 
                $in: getOrder.map(order => order._id) 
            }
        }).populate('productId', 'name image price')

        // Tạo một đối tượng để gộp các chi tiết đơn hàng vào từng đơn hàng
        const ordersWithDetails = getOrder.map(order => {
            const details = getOrderDetails.filter(detail => detail.order_id.toString() === order._id.toString())
            return {
                ...order.toObject(),
                details
            }
        })

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lịch sử đơn hàng',
            data: ordersWithDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy chi tiết đơn hàng */}
const getOrderDetails = async(req,res) => {
    try {
        const { order_id } = req.body
        
        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(order_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy đơn hàng có mã số: ${order_id}`
            })
        }

        const order = await OrderModel.findOne({ _id: order_id })
        const orderDetails = await OrderDetailModel.find({ order_id })
            .populate('product_id', 'name image price')

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Chi tiết đơn hàng',
            data: {
                order,
                orderDetails
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

module.exports = { orderCheckOutInCash, getAllOrders, getOrderDetails }