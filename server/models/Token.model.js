import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    require: true
  }
})

export default mongoose.model('Token', tokenSchema)
