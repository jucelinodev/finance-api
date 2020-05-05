import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { TransactionRepository } from '../repositories/transaction.repository'

class TransactionController {
  async index(req: Request, res: Response) {
    const transactionRepository = getCustomRepository(TransactionRepository)

    const transactions = await transactionRepository.find()
    const balance = await transactionRepository.getBalance()

    return res.json({ transactions, balance })
  }
}

export default new TransactionController()
