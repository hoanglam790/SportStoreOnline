const CategoryModel = require('../models/category.model')
const mongoose = require('mongoose')

// Tìm tất cả các danh mục sản phẩm
const getCategories = async (req,res) => {
    try {
        const getAllCate = await CategoryModel.find({})
        return res.status(200).json({
            success: true,
            message: 'Lấy danh mục sản phẩm thành công',
            data: getAllCate
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// Tìm danh mục sản phẩm theo ID
const getCategoryByID = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: `Không tìm thấy danh mục sản phẩm có mã số: ${id}`
        })
    }

    try {
        const getCateByID = await CategoryModel.findById(id)
        return res.status(200).json({
            success: true,
            message: `Lấy danh mục sản phẩm có mã số ${id} thành công`,
            data: getCateByID
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// Tạo mới danh mục sản phẩm
const createCategory = async (req,res) => {
    const category = req.body
    if(!category.cateName || !category.image) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
        })
    }
    
    const newCategory = new CategoryModel(category)
    try {
        await newCategory.save()
        return res.status(201).json({
            success: true,
            message: 'Lưu dữ liệu danh mục sản phẩm thành công',
            data: newCategory
        })
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lưu danh mục sản phẩm: ', error.message)
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// Sửa danh mục sản phẩm
const updateCategory = async (req,res) => {
    const {id} = req.params
    const category = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: `Không tìm thấy danh mục sản phẩm có mã số: ${id}`
        })
    }

    try {
        const updateCate = await CategoryModel.findByIdAndUpdate(id, category, {
            new: true
        })

        return res.status(200).json({
            success: true,
            message: 'Sửa danh mục sản phẩm thành công',
            data: updateCate
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// Xóa danh mục sản phẩm
const deleteCategory = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: `Không tìm thấy danh mục sản phẩm có mã số: ${id}`
        })
    }

    try {
        await Category.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: 'Xoá danh mục sản phẩm thành công'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

module.exports = { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory }