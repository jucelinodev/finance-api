import { Router } from 'express'

class Route {
  router = Router()

  constructor() {
    this.routes()
  }

  routes() {
    this.router.get('/', (req, res) => {
      return res.json({ mensagem: 'express funcionado!' })
    })
  }
}

export default new Route().router
