const CategoryModel = require('../models/category.model')
const mongoose = require('mongoose')

// Tìm tất cả các danh mục sản phẩm
const getCategories = async (req,res) => {
    try {
        const getAllCate = await CategoryModel.find().sort({ createdAt : -1 }) // Hiển thị danh mục sản phẩm mới nhất

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

// Tìm danh mục sản phẩm theo ID
const getCategoryById = async (req,res) => {
    try {
        const { _id } = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        const getCateByID = await CategoryModel.findOne({ _id: _id})
        
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

// Tạo mới danh mục sản phẩm
const createCategory = async (req,res) => {
    try {
        const { cateName, image } = req.body
        if(!cateName || !image) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })       
        }

        const newCategory = new CategoryModel({
            cateName,
            image
        })

        const saveCategory = await newCategory.save()

        if(!saveCategory){
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Không thể lưu danh mục sản phẩm'
            })
        }

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

// Sửa danh mục sản phẩm
const updateCategory = async (req,res) => {
    try {
        const { _id, cateName, image } = req.body

        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        const updateCate = await CategoryModel.updateOne({
            _id: _id
        }, {
            cateName,
            image
        })

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

// Xóa danh mục sản phẩm
const deleteCategory = async (req,res) => {
    try {
        const {_id} = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${_id}`
            })
        }

        await CategoryModel.deleteOne({ _id: _id})

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

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }