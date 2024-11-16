const generateOtp = async () => {
    return Math.floor(100000 + Math.random() * 900000) // Tạo 6 số ngẫu nhiên trong phạm vi 100000 - 999999
}

module.exports = generateOtp