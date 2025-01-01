const mongoose = require('mongoose')
const CartModel = require('../models/cart.model')
const CartItemModel = require('../models/cartItem.model')
const OrderModel = require('../models/order.model')
const OrderDetailModel = require('../models/orderDetails.model')
const DeliveryAddressModel = require('../models/deliveryAddressDetails.model')
const UserModel = require('../models/user.model')
const stripe = require('../config/stripeConfig')

{/** Tạo mới đơn hàng thanh toán bằng tiền mặt */}
const orderCheckOutInCash = async(req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { delivery_address, payment_method } = req.body

        const address = await DeliveryAddressModel.findById(delivery_address)
        if(!address){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Địa chỉ không tồn tại'
            })
        }

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
                error: true,
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

{/** Tạo mới đơn hàng thanh toán bằng thẻ tín dụng */}
const orderCheckOutPaymentOnline = async(req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { delivery_address } = req.body

        const user = await UserModel.findById(user_id)
        
        const address = await DeliveryAddressModel.findById(delivery_address)
        if(!address){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Địa chỉ không tồn tại'
            })
        }

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
                error: true,
                message: 'Giỏ hàng không tồn tại'
            })
        }

        // Lấy các sản phẩm trong giỏ hàng
        const cartItems = await CartItemModel.find({ cart_id: cart._id })
            .populate('product_id', 'name image')
        
        // Tạo một session thanh toán với Stripe Checkout
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.product_id.name,
                    images: item.product_id.image,
                    metadata: {
                        product_id: item.product_id._id.toString()
                    }
                },
                unit_amount: Math.round(item.price)
            },
            adjustable_quantity : {
                enabled : true,
                minimum : 1
            },
            quantity: item.quantity
        }))
        
        // Tạo parameter truyền vào session thanh toán
        const params = {
            submit_type: 'pay',
            line_items: line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: user?.email, // Email của người dùng
            metadata: {
                user_id: user_id,
                session_id: user_id ? null : session_id,
                delivery_address: delivery_address,
                cart_id: cart._id.toString()
            },           
            success_url: `${process.env.FRONTEND_URL}/checkout/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)

        // Thông báo xử lý thành công khi tạo session thanh toán với Stripe
        return res.status(200).json({
            success: true,
            error: false,
            data: {
                session_id: session.id // Trả về session Id của Stripe Checkout
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

// http://localhost:5000/api/order/webhook
const webhookStripeOrder = async(req,res) => {
    try {
        const event = req.body
        const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET_KEY
        
        // Handle the event
        switch(event.type){
            case 'checkout.session.completed':
                const session = event.data.object // session data
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
                const user_id = session.metadata.user_id
                const session_id = session.metadata.session_id
                const delivery_address = session.metadata.delivery_address
                const totalAmount = session.amount_total               
                //console.dir(lineItems.data)
                
                // Tính tổng số lượng
                // Tạo mảng orderDetails để lấy dữ liệu và lưu vào chi tiết đơn hàng
                let totalQuantity = 0
                const orderDetails = []

                // Duyệt qua từng sản phẩm trong lineItems và tạo chi tiết đơn hàng
                for(const item of lineItems.data){
                    // Retrieve: truy xuất Id của sản phẩm trong hệ thống Stripe
                    const product = await stripe.products.retrieve(item.price.product) // item.price.product: lấy trong session stripe
                    totalQuantity += item.quantity

                    orderDetails.push({
                        product_id: product.metadata.product_id,  // Lưu product_id metadata
                        quantity: item.quantity,    // Số lượng của từng sản phẩm
                        price: item.price.unit_amount, // Giá của từng sản phẩm
                        total: item.price.unit_amount * item.quantity // Tổng tiền cho sản phẩm này
                    })
                }
                
                // Tạo đơn hàng mới
                const order = new OrderModel({
                    user_id: user_id || null,
                    session_id: user_id ? null : session_id,
                    total_amount: totalAmount,
                    total_quantity: totalQuantity,
                    delivery_address,
                    payment_method: 'Thanh toán bằng Stripe',
                    status: 'Chờ xử lý'
                })
                await order.save()

                // Tạo chi tiết đơn hàng
                for(const detail of orderDetails) {
                    await OrderDetailModel.create({
                        order_id: order._id,                      
                        ...detail
                    })
                }
                
                // Lấy cart_id từ metadata
                const cart_id = session.metadata.cart_id

                // Xóa các sản phẩm trong giỏ hàng sau khi thanh toán thành công
                await CartItemModel.deleteMany({ cart_id: cart_id })
                await CartModel.deleteOne({ _id: cart_id })
                break
            default:
                console.log(`Unhandled event type ${event.type}`)
        }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true })
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
        const user_id = req?.user?.id // Middleware
        
        // Tìm tất cả các đơn hàng của người dùng
        const getOrder = await OrderModel.find({ user_id }).sort({ createdAt: -1 })
        if(getOrder.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Không có đơn hàng nào'
            })
        }

        // Lấy chi tiết các đơn hàng
        const getOrderDetails = await OrderDetailModel.find({
            order_id: { 
                $in: getOrder.map(order => order._id) 
            }
        }).populate('product_id', 'name image price')

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

        const order = await OrderModel.find({ _id: order_id })
            .populate('delivery_address')
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

module.exports = { orderCheckOutInCash, orderCheckOutPaymentOnline, getAllOrders, getOrderDetails, webhookStripeOrder }