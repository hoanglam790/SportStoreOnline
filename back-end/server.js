const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDatabase = require('./config/database')
const cateRoutes = require('./routes/category.route')
const userRoutes = require('./routes/user.route')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const corsOptions = {
    origin: 'http://localhost:5173', // Địa chỉ frontend
    credentials: true // Cho phép gửi cookie
}

app.use(express.json()) // Cho phép chấp nhận dữ liệu JSON trong req.body
app.use(cookieParser()) // Cho phép truy cập các Cookies trong req.cookies
app.use(cors(corsOptions))

app.use('/api/categories', cateRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    connectDatabase()
    console.log('Server is starting at http://localhost:' + PORT)
})