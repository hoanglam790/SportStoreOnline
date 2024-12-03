const mongoose = require('mongoose')
const CategoryModel = require('../models/category.model')
const SubCategoryModel = require('../models/subCategory.model')
const ProductModel = require('../models/product.model')

{/** Tìm tất cả các danh mục sản phẩm */}
const getCategoryController = async (req,res) => {
    try {
        const getAllCate = await CategoryModel.find() // Hiển thị danh mục sản phẩm mới nhất - .sort({ createdAt : -1 })

        // Thông báo khi tìm thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy danh mục sản phẩm thành công',
            data: getAllCate
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Tìm danh mục sản phẩm theo id */}
const getCategoryByIdController = async (req,res) => {
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

        // Tìm id trong bảng Category
        const getCateByID = await CategoryModel.findOne({ _id: _id})
        
        // Thông báo khi tìm thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: `Lấy danh mục sản phẩm có mã số ${_id} thành công`,
            data: getCateByID
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Tạo mới danh mục sản phẩm */}
const createCategoryController = async (req,res) => {
    try {
        const { name, image } = req.body

        // Kiểm tra dữ liệu đầu vào
        if(!name || !image) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })       
        }

        // Cập nhật dữ liệu đã nhập thành công vào Model
        const newCategory = new CategoryModel({
            name,
            image
        })

        // Thực hiện lưu vào cơ sở dữ liệu
        const saveCategory = await newCategory.save()

        // Lưu thất bại thì hiển thị thông báo lỗi
        if(!saveCategory){
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Không thể lưu danh mục sản phẩm'
            })
        }

        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Lưu dữ liệu danh mục sản phẩm thành công',
            data: saveCategory
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })   
    } 
}

{/** Sửa danh mục sản phẩm */}
const updateCategoryController = async (req,res) => {
    try {
        const { _id, name, image } = req.body

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        // Cập nhật vào cơ sở dữ liệu
        const updateCate = await CategoryModel.findByIdAndUpdate(_id, {
            name,
            image
        })

        // Thông báo khi cập nhật dữ liệu thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Chỉnh sửa danh mục sản phẩm thành công',
            data: updateCate
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Xóa danh mục sản phẩm */}
const deleteCategoryController = async (req,res) => {
    try {
        const { _id } = req.body

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                '$in': [ _id ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category: {
                '$in': [ _id ]
            }
        }).countDocuments()

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        // Kiểm tra nếu có danh mục sản phẩm phụ và sản phẩm liên quan đến danh mục sản phẩm thì không được phép xóa.
        if(checkSubCategory > 0 || checkProduct > 0){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Danh mục sản phẩm này đang được sử dụng, không thể xóa.'
            })
        }

        // Thực hiện xóa dựa vào id
        await CategoryModel.findByIdAndDelete(_id)

        // Thông báo khi xóa thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Xoá danh mục sản phẩm thành công'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { getCategoryController, 
    getCategoryByIdController, createCategoryController, updateCategoryController, deleteCategoryController }