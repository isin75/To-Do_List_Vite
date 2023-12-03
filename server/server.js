import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import options from './config.js'

const serverPort = options.port || 8080
const server = express()
const __dirname = process.cwd()

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

const serverListen = server.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
