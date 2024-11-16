const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserModel = require('../models/user.model')

const generateRefreshAccessToken = async (userID) => {
    const token = await jwt.sign({ id: userID }, 
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '30d'}
    )

    const updateToken = await UserModel.updateOne(
        { _id: userID },
        { refresh_token: token}
    )
    return token
}

module.exports = generateRefreshAccessToken