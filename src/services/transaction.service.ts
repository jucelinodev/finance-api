import { getCustomRepository } from 'typeorm'
import { TransactionRepository } from '../repositories/transaction.repository'
import { CategoryRepository } from '../repositories/category.repository'
import { HandleError } from '../errors/handle-error'
import { Transaction } from '../entities/transaction.entity'

interface ITransaction {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class TransactionService {
  async create({
    title,
    value,
    type,
    category
  }: ITransaction): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository)
    const categoryRepository = getCustomRepository(CategoryRepository)
    const { total } = await transactionRepository.getBalance()
    let trasactionCategory = await categoryRepository.findOne({
      where: { title: category }
    })

    if (type === 'outcome' && total < value)
      throw new HandleError('You do not have enough balance')

    if (!trasactionCategory) {
      trasactionCategory = categoryRepository.create({ title: category })
      await categoryRepository.save(trasactionCategory)
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: trasactionCategory
    })
    await transactionRepository.save(transaction)

    return transaction
  }

  async delete(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository)
    const transaction = await transactionRepository.findOne(id)
    const balance = await transactionRepository.getBalance()

    if (!transaction) throw new HandleError('Transaction does not exist', 404)

    if (transaction.type === 'income' && transaction.value > balance.total)
      throw new HandleError(
        'It is not possible to delete an entry greater than the total value',
        400
      )

    await transactionRepository.remove(transaction)
  }
}

export default new TransactionService()
