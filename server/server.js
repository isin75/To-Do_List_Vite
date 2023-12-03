import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { nanoid } from 'nanoid/non-secure'
import { promises as fs } from 'fs'

import options from './config.js'
import connectDB from './services/mongoose.js'

connectDB()

const serverPort = options.port || 8080
const server = express()
const __dirname = process.cwd()

const { readFile, writeFile, readdir } = fs

const taskId = nanoid()

const timeSpans = {
  day: 86400000,
  week: 604800000,
  month: 2592000000
}

const statusList = ['done', 'new', 'in progress', 'blocked']

const toRead = async (category) => {
  const getTaskData = await readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf-8' })
  const getTask = JSON.parse(getTaskData)
  return getTask
}

const toWrite = async (category, addTask) => {
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(addTask), {
    encoding: 'utf-8'
  })
}

const toFilterTimeSpans = (getTask, timespan) => {
  const currentDay = +new Date()
  return getTask.filter((task) => task.$createdAt > currentDay - timeSpans[timespan])
}

const toFilter = (getTask) => {
  return getTask
    .filter((task) => !task.$isDeleted)
    .map((obj) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (key[0] !== '$') {
          return { ...acc, [key]: obj[key] }
        }
        return acc
      }, {})
    })
}

const toUpdateTask = (getTask, id, newValue) => {
  return getTask.map((task) => {
    if (task.taskId === id) {
      return { ...task, ...newValue }
    }
    return task
  })
}

class Task {
  constructor(taskTitle) {
    this.taskId = taskId
    this.title = taskTitle
    this.$isDeleted = false
    this.$createdAt = +new Date()
    this.$deletedAt = null
    this.status = 'new'
  }
}

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist'))
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

server.get('/api/v1/categories', async (req, res) => {
  try {
    const categoriesList = await readdir(`${__dirname}/tasks`, { encoding: 'utf-8' }).then(
      (categoriesName) => categoriesName.map((categories) => categories.slice(0, -5))
    )
    res.json(categoriesList)
  } catch (error) {
    res.json({ status: 'error', message: 'Folder tasks not found' })
  }
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  try {
    const { category } = req.params
    const getTask = await toRead(category).then((data) => toFilter(data))

    res.json(getTask)
  } catch (error) {
    res.json({ status: 'error', message: 'Category not found' })
  }
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  try {
    const { category, timespan } = req.params
    const keys = Object.keys(timeSpans)
    const isCorrectUrl = keys.indexOf(timespan)

    if (isCorrectUrl < 0) {
      res.status('404')
      res.end()
    }

    const getTask = await toRead(category).then((data) =>
      toFilter(toFilterTimeSpans(data, timespan))
    )
    res.json(getTask)
  } catch (error) {
    res.json({ status: 'error', message: 'Category not found' })
  }
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const newTaskTitle = req.body.title
  const { category } = req.params
  const newTask = new Task(newTaskTitle)
  try {
    const getTask = await toRead(category)
    const addTask = [...getTask, newTask]
    await toWrite(category, addTask)
    res.json({ status: 'ok', addTask })
  } catch (error) {
    await toWrite(category, [newTask])
    res.json({ status: 'success', newTask })
  }
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  try {
    const { category, id } = req.params
    const newStatus = req.body

    const isCorrectStatus = statusList.indexOf(newStatus.status)
    if (isCorrectStatus < 0) {
      res.json({ status: 'error', message: 'incorrect status' })
      res.end()
    }

    const getTask = await toRead(category)

    const isCorrectId = getTask.some((task) => task.taskId === id)
    if (!isCorrectId) {
      res.json({ status: 'error', message: 'Id not found' })
      res.end()
    }

    const updateStatus = toUpdateTask(getTask, id, newStatus)
    await toWrite(category, updateStatus)
    res.json(updateStatus)
  } catch (error) {
    res.json({ status: 'error', message: 'Category not found' })
  }
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const statusDeleted = { $isDeleted: true, $deletedAt: +new Date() }
  const getTask = await toRead(category)
  const isCorrectId = getTask.some((task) => task.taskId === id)
  if (!isCorrectId) {
    res.json({ status: 'error', message: 'Id not found' })
    res.end()
  }
  const deleted = toUpdateTask(getTask, id, statusDeleted)
  await toWrite(category, deleted)
  res.json(deleted)
})

const serverListen = server.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
