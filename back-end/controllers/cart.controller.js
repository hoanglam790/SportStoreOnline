const mongoose = require('mongoose')
const CartModel = require('../models/cart.model')
const CartItemModel = require('../models/cartItem.model')
const ProductModel = require('../models/product.model')

{/** Tạo mới giỏ hàng */}
const addToCart = async (req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { product_id } = req.body
        // console.log(`User ID: ${userId}`)
        //console.log(`Session ID: ${sessionId}`)
        // Kiểm tra xem ID sản phẩm có hợp lệ không?
        if(!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Sản phẩm không hợp lệ'
            })
        }

        // Kiểm tra xem sản phẩm có tồn tại không?
        const product = await ProductModel.findById(product_id)
        if(!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Sản phẩm không tồn tại'
            })
        }

        // Tìm giỏ hàng của khách, dùng session_id cho khách vãng lai và user_id cho khách đã đăng nhập
        let cart = await CartModel.findOne({ 
            $or: [
                { user_id },  // Tìm theo user_id nếu đã đăng nhập
                { session_id } // Tìm theo session_id nếu chưa đăng nhập
            ]
        })

        // Nếu giỏ hàng chưa có, tạo mới
        if(!cart){
            cart = new CartModel({
                user_id: user_id || null,
                session_id: user_id ? null : session_id // Nếu đã đăng nhập, không lưu sessionId
            })
            await cart.save()
        }
        
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa?
        let cartItem = await CartItemModel.findOne({ cartId: cart._id, product_id })
        
        if(cartItem) {
            // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
            // cartItem.quantity += Number(quantity)
            // await cartItem.save()
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Sản phẩm đã có trong giỏ hàng'
            })
        } else {
            const discount = product.discount || 0 // Nếu có discount thì lấy giá trị discout, ngược lại thì lấy giá gốc
            
            // Tính giá mới sau khi giảm giá
            const actualPrice = discount > 0 ? product.price - ((product.price * product.discount) / 100) : product.price

            // Nếu sản phẩm chưa có trong giỏ, tạo mới
            cartItem = new CartItemModel({
                cart_id: cart._id,
                product_id,
                quantity: 1,
                price: actualPrice // Lưu giá tại thời điểm thêm vào giỏ
            })
            await cartItem.save()
        }

        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            message: 'Thêm sản phẩm vào giỏ hàng thành công',
            data: cartItem
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy thông tin giỏ hàng */}
const getCartItem = async (req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        // Kiểm tra nếu không có userId, sử dụng sessionId
        const session_id = req.sessionID

        // Tìm userId hoặc sessionId trong giỏ hàng
        const cart = await CartModel.findOne({ 
            $or: [
                { user_id },  // Tìm theo userId nếu đã đăng nhập
                { session_id } // Tìm theo sessionId nếu chưa đăng nhập
            ]
        })

        if(cart){
            const cartItems = await CartItemModel.find({ cart_id: cart._id })
            .populate({
                path: 'product_id',
                populate: [
                    { path: 'category'},
                    { path: 'subCategory'}
                ]
            })

            const cartWithItems = {
                user_id: cart.user_id, // Lấy userId từ Cart
                session_id: cart.session_id,
                cart_items: cartItems   // Lấy các CartItem
            }

            return res.status(200).json({
                success: true,
                error: false,
                message: 'Lấy thông tin giỏ hàng thành công',
                data: cartWithItems
            })
        }
        else{
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Không tìm thấy giỏ hàng'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error.message
        })
    }
}

{/** Cập nhật giỏ hàng */}
const updateCart = async (req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { _id, quantity } = req.body       

        // Tìm userId hoặc sessionId trong giỏ hàng
        const cart = await CartModel.findOne({ 
            $or: [
                { user_id },  // Tìm theo userId nếu đã đăng nhập
                { session_id } // Tìm theo sessionId nếu chưa đăng nhập
            ]
        })

        if(!cart){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Không tìm thấy giỏ hàng'
            })
        }
        
        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy giỏ hàng sản phẩm có mã số: ${_id}`
            })
        }

        if(!quantity){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp số lượng hợp lệ'
            })
        }

        // Cập nhật giỏ hàng
        let updateCartItem = await CartItemModel.updateOne({ 
            _id: _id, 
            cart_id: cart._id 
        },{
            quantity: quantity
        })

        // Thông báo khi xử lý thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Cập nhật giỏ hàng thành công',
            data: updateCartItem
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error || error.message
        })
    }
}

{/** Xóa sản phẩm trong giỏ hàng */}
const deleteItemsInCart = async (req,res) => {
    try {
        const user_id = req?.user?.id // Middleware
        const session_id = req.sessionID
        const { _id } = req.body

        // Tìm userId hoặc sessionId trong giỏ hàng
        const cart = await CartModel.findOne({ 
            $or: [
                { user_id },  // Tìm theo userId nếu đã đăng nhập
                { session_id } // Tìm theo sessionId nếu chưa đăng nhập
            ]
        })

        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy giỏ hàng sản phẩm có mã số: ${_id}`
            })
        }

        if(!cart){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Không tìm thấy giỏ hàng'
            })
        }
        else{
            await CartItemModel.deleteOne({ _id: _id })

            return res.status(200).json({
                success: true,
                error: false,
                message: 'Xóa sản phẩm trong giỏ hàng thành công'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
module.exports = { addToCart, getCartItem, updateCart, deleteItemsInCart }