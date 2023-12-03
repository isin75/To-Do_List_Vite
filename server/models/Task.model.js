import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'New'
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    _deletedAt: {
      type: Number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Task', taskSchema)
