const mongoose = require('mongoose')
require('dotenv').config()

const connectDatabase = async () => {
    try {
        // Kiểm tra xem MONGO_URL đã được thiết lập trong biến môi trường hay chưa
        const mongoUrl = process.env.MONGO_URI
        if (!mongoUrl) {
            throw new Error('MongoDB URL is not defined in environment variables')
        }

        // Kết nối tới MongoDB
        const conn = await mongoose.connect(mongoUrl)

        // Nếu kết nối thành công, thông báo
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        // Thông báo lỗi rõ ràng nếu kết nối không thành công
        console.error(`Error: ${error.message}`)
        process.exit(1) // Thoát với trạng thái - 1: lỗi, 0: thành công
    }
}

module.exports = connectDatabase // Export để sử dụng ở nơi khác
