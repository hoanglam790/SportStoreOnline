const { Resend } = require('resend')
require('dotenv').config()

if(!process.env.RESEND_EMAIL_API){
    console.log('Vui lòng cung cấp biến RESEND_EMAIL_API vào bên trong tệp .env')
}

const resend = new Resend(process.env.RESEND_EMAIL_API)

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Hoang Lam <onboarding@resend.dev>', 
            to: sendTo,
            subject: subject, 
            html: html 
        })
        if (error) {
            return console.error({ error }) 
        }
        return data
    } catch (error) {
        console.error(error)
    }
}

module.exports = sendEmail
