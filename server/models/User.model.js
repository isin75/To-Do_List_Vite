import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    isActivated: {
      type: Boolean,
      default: false
    },
    activationLink: {
      type: String,
      require: true
    },
    createdTask: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No Email')
    }
    if (!password) {
      throw new Error('No Password')
    }
    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }
    if (!user.isActivated) {
      throw new Error('User not activated')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw new Error('Incorrect Password')
    }

    return user
  }
}

export default mongoose.model('Users', userSchema)
