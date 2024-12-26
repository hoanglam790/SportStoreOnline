const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const session = require('express-session')
const connectDatabase = require('./config/database')
const categoryRouter = require('./routes/category.route')
const userRouter = require('./routes/user.route')
const uploadImageRouter = require('./routes/uploadImage.route')
const subCategoryRouter = require('./routes/subCategory.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const deliveryAddressRouter = require('./routes/deliveryAddress.route')
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
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,  // Mã bí mật để mã hóa session
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false,  // True: HTTPS, False: HTTP
        maxAge: 1000 * 60 * 60 * 24  // Giữ session trong 1 ngày
    }
}))

// API Endpoints
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/file', uploadImageRouter)
app.use('/api/sub-categories', subCategoryRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/delivery-address', deliveryAddressRouter)

// Connection
app.listen(PORT, () => {
    connectDatabase()
    console.log('Server is starting at http://localhost:' + PORT)
})