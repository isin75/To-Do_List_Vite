import mongoose from 'mongoose'
import options from '../config.js'

mongoose.connection.on('connected', () => {
  console.log('db is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`can not connect to db ${err}`)
  process.exit(1)
})

const connectDB = async (mongoUrl = options.mongoUrl) => {
  mongoose.connect(mongoUrl)
  return mongoose.connection
}

export default connectDB
