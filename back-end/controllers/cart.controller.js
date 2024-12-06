const mongoose = require('mongoose')
const CartModel = require('../models/cart.model')
const CartItemModel = require('../models/cartItem.model')
const ProductModel = require('../models/product.model')

{/** Tạo mới giỏ hàng */}
const addToCart = async (req,res) => {
    try {
        const userId = req?.user?.id // Middleware
        const sessionId = req.sessionID
        const { productId, quantity } = req.body

        //console.log(`Session ID: ${sessionId}`)
        // Kiểm tra xem ID sản phẩm có hợp lệ không?
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Sản phẩm không hợp lệ'
            })
        }

        // Kiểm tra xem số lượng có hợp lệ không?
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Số lượng phải lớn hơn 0'
            })
        }

        // Kiểm tra xem sản phẩm có tồn tại không?
        const product = await ProductModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Sản phẩm không tồn tại'
            })
        }

        // Tìm giỏ hàng của khách, dùng sessionId cho khách vãng lai và userId cho khách đã đăng nhập
        let cart = null
        if(userId) {
            // Nếu người dùng đã đăng nhập, tìm giỏ hàng bằng userId
            cart = await CartModel.findOne({ userId })
        } else if(sessionId) {
            // Nếu người dùng chưa đăng nhập (khách vãng lai), tìm giỏ hàng bằng sessionId
            cart = await CartModel.findOne({ sessionId })
        }

        // Nếu giỏ hàng chưa có, tạo mới
        if(!cart) {
            cart = new CartModel({
                userId: userId || null,
                sessionId: userId ? null : sessionId // Nếu đã đăng nhập, không lưu sessionId
            })
            await cart.save()
        }
        
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa?
        let cartItem = await CartItemModel.findOne({ cartId: cart._id, productId })
        
        if(cartItem) {
            // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
            // cartItem.quantity += Number(quantity)
            // await cartItem.save()
            return res.status(200).json({
                success: false,
                error: true,
                message: 'Sản phẩm đã có trong giỏ hàng'
            })
        } else {
            const discount = product.discount || 0 // Nếu có discount thì lấy giá trị, ngược lại thì lấy 0
            
            // Tính giá sau giảm giá
            const actualPrice = discount > 0 ? product.price - ((product.price * product.discount) / 100) : product.price

            // Nếu sản phẩm chưa có trong giỏ, tạo mới
            cartItem = new CartItemModel({
                cartId: cart._id,
                productId,
                quantity: 1,
                price: actualPrice // Lưu giá tại thời điểm thêm vào giỏ
            })
            await cartItem.save()
        }

        return res.status(200).json({
            success: true,
            message: 'Thêm sản phẩm vào giỏ hàng thành công',
            data: cartItem
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error || error.message
        })
    }
}

{/** Lấy thông tin giỏ hàng */}
const getCartItem = async (req,res) => {
    try {
        const userId = req?.user?.id // Middleware

        // Tìm user ID trong giỏ hàng
        const cart = await CartModel.findOne({ userId })

        if(cart){
            const cartItems = await CartItemModel.find({ cartId: cart._id })
            .populate('productId')

            const cartWithItems = {
                userId: cart.userId, // Lấy userId từ Cart
                cartItems: cartItems   // Lấy các CartItem
            }

            return res.status(200).json({
                success: true,
                error: false,
                message: 'Lấy thông tin giỏ hàng thành công',
                data: cartWithItems
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Không tìm thấy giỏ hàng'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error || error.message
        })
    }
}

module.exports = { addToCart, getCartItem }