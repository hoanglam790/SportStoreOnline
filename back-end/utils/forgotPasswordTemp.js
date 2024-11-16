const forgotPasswordTemp = ({ name, otp }) => {
    return `
    <div>
        <p>Dear <span style='font-weight: bold'>${name}</span>,</p>
        <p>Bạn vừa gửi yêu cầu khôi phục mật khẩu. Vui lòng sử dụng mã OTP dưới đây để tiến hành khôi phục.</p>
        <div style='background: yellow; font-size: 24px; text-align: center; font-weight: 600'>
            ${otp}
        </div>
        <p>Xin lưu ý: Mã OTP chỉ có hiệu lực trong 30 phút và vì lý do bảo mật: Tuyệt đối không chia sẻ mã này với bất kỳ ai.</p>
    </div>
    `
}

module.exports = forgotPasswordTemp