import dotenv from 'dotenv'

dotenv.config()

const options = {
  clientApi: process.env.API_URL
}

export default options
