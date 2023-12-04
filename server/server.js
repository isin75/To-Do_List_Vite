import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import User from './models/User.model.js'
import Task from './models/Task.model.js'
import options from './config.js'
import connectDB from './services/mongoose.js'
import jwtStrategy from './services/passport.js'
import sendActivationMail from './services/mailActivation.js'
import auth from './middleware/auth.js'

connectDB()

const serverPort = options.port || 8080
const server = express()
const __dirname = process.cwd()

const timeSpans = {
  day: 86400000,
  week: 604800000,
  month: 2592000000
}

const statusList = ['Done', 'New', 'In progress', 'Blocked']

const middleware = [
  cors(),
  passport.initialize(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist'))
]

passport.use('jwt', jwtStrategy)

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

server.get('/api/v1/test/user-info', auth(), async (req, res) => {
  // const user = await User.findById(req.user.uid)
  console.log(req.user.id)
  res.json({ status: '123' })
})

server.post('/api/v1/login', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, options.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isUsedEmail = await User.findOne({ email })
    const link = uuidv4()

    if (isUsedEmail) {
      res.json({ status: 'error' })
      throw Error('Email is already used')
    }
    const user = new User({
      email,
      password,
      name,
      activationLink: link
    })
    await user.save()

    sendActivationMail(email, `${options.apiUrl}api/v1/activate/${link}`, name)

    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/activate/:link', async (req, res) => {
  try {
    const { link } = req.params
    const user = await User.findOne({ activationLink: link })
    if (!user) {
      throw new Error('Invalid activation link')
    }
    user.isActivated = true
    await user.save()
    res.json({ status: 'activated' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/categories', auth(), async (req, res) => {
  try {
    const { categoriesTask } = req.user
    res.json(categoriesTask)
  } catch (error) {
    res.json({ status: 'error', message: 'Tasks not found' })
  }
})

server.get('/api/v1/tasks/:category', auth(), async (req, res) => {
  try {
    const { category } = req.params
    const getTask = await Task.find()
    const task = getTask.filter((it) => !it.isDeleted && it.categories === category)

    res.json(task)
  } catch (error) {
    res.json({ status: 'error', message: 'Category not found' })
  }
})

server.get('/api/v1/tasks/:category/:timespan', auth(), async (req, res) => {
  try {
    const { category, timespan } = req.params
    const keys = Object.keys(timeSpans)
    const isCorrectUrl = keys.indexOf(timespan)
    const currentDay = +new Date()

    if (isCorrectUrl < 0) {
      res.status('404')
      res.end()
    }

    const getTask = await Task.find()
    const filterDeletedTask = getTask.filter((it) => !it.isDeleted && it.categories === category)
    const task = filterDeletedTask.filter((it) => it.createdAt > currentDay - timeSpans[timespan])

    res.json(task)
  } catch (error) {
    res.json({ status: 'error', message: 'Category not found' })
  }
})

server.post('/api/v1/tasks/:category', auth(), async (req, res) => {
  try {
    const { title } = req.body
    const categories = req.params.category
    const userId = req.user.id
    const task = new Task({
      categories,
      title,
      userId
    })
    await task.save()
    console.log(task)
    const user = await User.findById(userId)
    const isNewCategory = user.categoriesTask.includes(categories)
    if (user) {
      user.createdTask.push(task)
      if (!isNewCategory) {
        user.categoriesTask.push(categories)
      }
      await user.save()
      console.log('201: Task add')
    } else {
      console.log('404: User not found')
    }

    res.json({ status: 'ok', task })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.patch('/api/v1/tasks/:category/:id', auth(), async (req, res) => {
  try {
    const { category, id } = req.params
    const newStatus = req.body.status
    console.log(newStatus, id)
    const isCorrectStatus = statusList.indexOf(newStatus)
    if (isCorrectStatus < 0) {
      res.json({ status: 'error', message: 'incorrect status' })
      res.end()
    }
    const getTask = await Task.findById(id)
    const isCategory = getTask.categories.includes(category)
    if (!isCategory) {
      res.json({ status: 'error', message: 'Category not found' })
    }

    const task = await Task.findByIdAndUpdate(id, { status: newStatus }, { new: true })
    res.json(task)
  } catch (err) {
    res.json({ status: 'error', message: 'Error' })
  }
})

server.delete('/api/v1/tasks/:category/:id', auth(), async (req, res) => {
  const { category, id } = req.params
  const statusDeleted = { isDeleted: true, _deletedAt: +new Date() }
  const getTask = await Task.findById(id)
  const isCategory = getTask.categories.includes(category)

  if (!isCategory) {
    res.json({ status: 'error', message: 'Category not found' })
  }

  const task = await Task.findByIdAndUpdate(id, { $set: statusDeleted }, { new: true })
  res.json(task)
})

const serverListen = server.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
