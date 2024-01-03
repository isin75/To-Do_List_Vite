import nodemailer from 'nodemailer'
import options from '../config.js'

const transporter = nodemailer.createTransport({
  host: options.smtpHost,
  port: options.smtpPort,
  secure: false,
  auth: {
    user: options.smtpUser,
    pass: options.smtpPassword
  }
})

const sendActivationMail = async (to, code, name) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: options.smtpUser,
        to,
        subject: `${name}, welcome to the “To-Do List” App`,
        html: `
        <div>
          <h1>
            Hello, to activate your account, please enter this code: ${code}
          </h1>
        </div>
      `
      },
      (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      }
    )
  })
}

export default sendActivationMail
