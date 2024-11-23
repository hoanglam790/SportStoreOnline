const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDatabase = require('./config/database')
const categoryRouter = require('./routes/category.route')
const userRouter = require('./routes/user.route')
const uploadImageRouter = require('./routes/uploadImage.route')
const subCategoryRouter = require('./routes/subCategory.route')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`, // Địa chỉ frontend
    credentials: true // Cho phép gửi cookie
}

// Middleware
app.use(express.json()) // Cho phép chấp nhận dữ liệu JSON trong req.body
app.use(cookieParser()) // Cho phép truy cập các Cookies trong req.cookies
app.use(cors(corsOptions))

// Routes
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/file', uploadImageRouter)
app.use('/api/sub-categories', subCategoryRouter)

// Connection
app.listen(PORT, () => {
    connectDatabase()
    console.log('Server is starting at http://localhost:' + PORT)
})