import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { TransactionRepository } from '../repositories/transaction.repository'
import TransactionService from '../services/transaction.service'

class TransactionController {
  async index(req: Request, res: Response) {
    const transactionRepository = getCustomRepository(TransactionRepository)
    const transactions = await transactionRepository.find()
    const balance = await transactionRepository.getBalance()
    return res.json({ transactions, balance })
  }

  async store(req: Request, res: Response) {
    const { title, value, type, category } = req.body
    const transaction = await TransactionService.create({ title, value, type, category })
    return res.status(201).json(transaction)
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params
    await TransactionService.delete(id)
    return res.status(204).json()
  }
}

export default new TransactionController()
