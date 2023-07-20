const nodemailer = require('nodemailer')
const nodemailerConfig = require('./nodemailerConfig')

const sendEmail = async({to, subject, html}) => {
    
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailerConfig({host: 'smtp.ethereal.email', port: 587, user: 'katlyn.hackett68@ethereal.email', pass: 'hUMznFJWtJNrsr3xCM'});

    return transporter.sendMail({

        from:'"Manudev Junior Candidate Full Stack Developer" <testmanudev@gmail.com>',
        to,
        subject,
        html

    })

}

module.exports = sendEmail
