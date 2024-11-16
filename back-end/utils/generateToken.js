const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateAccessToken = async (userID) => {
    const token = await jwt.sign({ id: userID }, 
        process.env.SECRET_KEY_TOKEN,
        { expiresIn: '24h'}
    )
    return token
}

module.exports = generateAccessToken