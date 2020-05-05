import { Router } from 'express'
import transactionController from './controllers/transaction.controller'

class Route {
  router = Router()

  constructor() {
    this.routes()
  }

  routes() {
    this.router.get('/', (req, res) => {
      return res.json({ mensagem: 'use a rota /transaction para utilizar os serviços' })
    })
    this.router.get('/transaction', transactionController.index)
    this.router.post('/transaction', transactionController.store)
  }
}

export default new Route().router
