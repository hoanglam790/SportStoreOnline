const SubCategoryModel = require('../models/subCategory.model')
const mongoose = require('mongoose')

{/** Thêm danh mục sản phẩm phụ */}
const addSubCategoryController = async (req,res) => {
    try {
        const { name, image, category } = req.body

        // Kiểm tra dữ liệu đầu vào
        if(!name && !image && !category[0]){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })
        }

        // Cập nhật dữ liệu đã nhập thành công vào Model
        const addNewSubCate = await SubCategoryModel({
            name,
            image,
            category
        })

        // Thực hiện lưu vào cơ sở dữ liệu
        const saveNewSubCate = await addNewSubCate.save()

        // Lưu thất bại thì hiển thị thông báo lỗi
        if(!saveNewSubCate){
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Không thể lưu danh mục sản phẩm phụ'
            })
        }

        // Thông báo khi lưu dữ liệu thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Lưu dữ liệu danh mục sản phẩm phụ thành công',
            data: saveNewSubCate
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error.message || error
        })
    }
}

{/** Lấy danh mục sản phẩm phụ */}
const getSubCategoryController = async (req,res) => {
    try {
        const getAllSubCate = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category') // Hiển thị danh mục sản phẩm mới nhất
        
        // Thông báo khi tìm thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy danh mục sản phẩm phụ thành công',
            data: getAllSubCate
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error.message || error
        })
    }
}

{/** Chỉnh sửa danh mục sản phẩm phụ */}
const updateSubCategoryController = async (req,res) => {
    try {
        const { _id, name, image, category } = req.body

        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm phụ có mã số: ${_id}`
            })
        }

        // Cập nhật vào cơ sở dữ liệu
        const updateSubCate = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })

        // Thông báo khi cập nhật dữ liệu thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Chỉnh sửa danh mục sản phẩm phụ thành công',
            data: updateSubCate
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error.message || error
        })
    }
}

{/** Xóa danh mục sản phẩm phụ */}
const deleteSubCategoryController = async (req,res) => {
    try {
        const { _id } = req.body
        
        // Kiểm tra id có tồn tại hay không?
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm phụ có mã số: ${_id}`
            })
        }

        // Thực hiện xóa dựa vào id
        await SubCategoryModel.findByIdAndDelete(_id)

        // Thông báo khi xóa thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Xoá danh mục sản phẩm phụ thành công'
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: false,
            message: error.message || error
        })
    }
}

module.exports = { addSubCategoryController, 
    getSubCategoryController, updateSubCategoryController, deleteSubCategoryController }