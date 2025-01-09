const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
require('dotenv').config()

const generateRefreshAccessToken = async(userID) => {
    const token = await jwt.sign({ id: userID }, 
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '1d'}
    )

    const updateToken = await UserModel.updateOne(
        { _id: userID },
        { refresh_token: token}
    )
    return token
}

module.exports = generateRefreshAccessToken