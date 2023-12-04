import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  apiUrl: process.env.API_URL,
  clientApi: process.env.CLIENT_API
}

export default options
