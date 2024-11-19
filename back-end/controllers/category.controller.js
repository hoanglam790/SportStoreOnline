const CategoryModel = require('../models/category.model')
const mongoose = require('mongoose')

// Tìm tất cả các danh mục sản phẩm
const getCategories = async (req,res) => {
    try {
        const getAllCate = await CategoryModel.find({})
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
const getCategoryByID = async (req,res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${id}`
            })
        }

        const getCateByID = await CategoryModel.findById(id)
        
        return res.status(200).json({
            success: true,
            error: false,
            message: `Lấy danh mục sản phẩm có mã số ${id} thành công`,
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
            message: 'Sửa danh mục sản phẩm thành công',
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
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                error: true,
                message: `Không tìm thấy danh mục sản phẩm có mã số: ${id}`
            })
        }

        await Category.findByIdAndDelete(id)
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

module.exports = { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory }