import { Repository, EntityRepository } from 'typeorm'
import { Transaction } from '../entities/transaction.entity'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value)
            break

          case 'outcome':
            accumulator.outcome += Number(transaction.value)
            break

          default:
            break
        }

        return accumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      }
    )

    const total = income - outcome

    return { income, outcome, total }
  }
}
