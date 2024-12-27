const mongoose = require('mongoose')
const ProductModel = require('../models/product.model')

{/** Tạo mới sản phẩm */}
const createNewProduct = async(req,res) => {
    try {
        const {
            name,
            image,
            description,
            price,
            discount,
            quantity_in_stock,
            category,
            subCategory
        } = req.body

        // Kiểm tra dữ liệu đầu vào
        if(!name || !image[0] || !description || !price || !discount || !quantity_in_stock || !category[0] || !subCategory[0]){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })
        }

        // Lưu dữ liệu vào model
        const addNewProduct = new ProductModel({
            name,
            image,
            description,
            price,
            discount,
            quantity_in_stock,
            category,
            subCategory
        })

        // Lưu vào cơ sở dữ liệu
        const saveProduct = await addNewProduct.save()

        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Thêm sản phẩm mới thành công',
            data: saveProduct
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy danh sách sản phẩm */}
const getAllProduct = async(req,res) => {
    try {
        let { page, limit, search } = req.body

        if(!page){
            page = 1
        }

        if(!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skipPage = (page - 1) * limit

        const [data, totalCountPage] = await Promise.all([
            ProductModel.find(query)
            .populate('category')
            .populate('subCategory')
            .sort({ createdAt : -1}).skip(skipPage).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy danh sách sản phẩm thành công',
            totalCountProduct: totalCountPage,
            totalNumberPage: Math.ceil(totalCountPage / limit),
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy danh sách sản phẩm theo id */}
const getProductDetails = async(req,res) => {
    try {
        const { id } = req.body

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy sản phẩm có mã số: ${id}`
            })
        }
        
        const product = await ProductModel.findOne({ _id: id })

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy danh sách sản phẩm thành công',
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy danh sách sản phẩm theo danh mục sản phẩm */}
const getProductByCategory = async(req,res) => {
    try {
        const { _id } = req.body 

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        const productList = await ProductModel.find({ 
            category : { $in : _id }
        }).limit(15)

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Danh sách sản phẩm theo danh mục sản phẩm',
            data: productList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Lấy danh sách sản phẩm theo danh mục sản phẩm và danh mục sản phẩm phụ*/}
const getProductByCateAndSubCate = async(req,res) => {
    try {
        const { categoryId, subCategoryId, page, limit } = req.body

        if(!categoryId || !subCategoryId){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp CategoryID và Sub-CategoryID'
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : { 
                $in : categoryId  
            },
            subCategory : { 
                $in : subCategoryId 
            }
        }

        const skipPage = (page - 1) * limit

        const [data, dataCountPage] = await Promise.all([
            ProductModel.find(query).sort({ createdAt : -1}).skip(skipPage).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy danh sách sản phẩm thành công',
            totalCountPage: dataCountPage,
            page: page,
            limit: limit,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Chỉnh sửa sản phẩm */}
const updateProduct = async(req,res) => {
    try {
        const { _id } = req.body

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy sản phẩm có mã số: ${_id}`
            })
        }

        const update = await ProductModel.updateOne({ _id: _id }, {
            ...req.body
        })

        // Thông báo khi chỉnh sửa sản phẩm thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Chỉnh sửa sản phẩm thành công',
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Xóa sản phẩm */}
const deleteProduct = async(req,res) => {
    try {
        const { _id } = req.body

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy sản phẩm có mã số: ${_id}`
            })
        }

        await ProductModel.findByIdAndDelete(_id)

        // Thông báo khi chỉnh sửa sản phẩm thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Xóa sản phẩm thành công'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

module.exports = { createNewProduct, getAllProduct, getProductDetails, getProductByCategory, getProductByCateAndSubCate, updateProduct, deleteProduct }