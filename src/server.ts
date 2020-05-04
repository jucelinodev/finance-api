import express, { Application } from 'express'

class Server {
  server: Application = express()

  constructor() {}
}

export default new Server().server
