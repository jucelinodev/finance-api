import 'reflect-metadata'
import 'express-async-errors'
import express, { Application } from 'express'

import routes from './routes'
import handleError from './errors/handle-error.middleware'
import './database/connect'

class Server {
  server: Application = express()

  constructor() {
    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  exceptionHandler() {
    this.server.use(handleError)
  }
}

export default new Server().server
