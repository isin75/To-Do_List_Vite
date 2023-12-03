import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL
}

export default options
