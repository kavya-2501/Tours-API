const nodemailer=require('nodemailer')
const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = require('../config/server.config')

const sendEmail=async (options)=>{
    // 1) Create a transporter
    const transporter=nodemailer.createTransport({
        host:EMAIL_HOST,
        port:EMAIL_PORT,
        auth:{
            user:EMAIL_USERNAME,
            pass:EMAIL_PASSWORD
        }
    })
    
    // 2) Crete email options
    const mailOptions={
        from:'Tours <kavyasanjeevsingh@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    // 3) Actually send the mail
    await transporter.sendMail(mailOptions);

}

module.exports=sendEmail;