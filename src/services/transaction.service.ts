import { getCustomRepository } from 'typeorm'
import { TransactionRepository } from '../repositories/transaction.repository'
import { CategoryRepository } from '../repositories/category.repository'
import HandleError from '../errors/handle-error'

interface ITransaction {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class TransactionService {
  async create({ title, value, type, category }: ITransaction) {
    const transactionRepository = getCustomRepository(TransactionRepository)
    const categoryRepository = getCustomRepository(CategoryRepository)
    const { total } = await transactionRepository.getBalance()
    let trasactionCategory = await categoryRepository.findOne({ where: { title: category } })

    if (type === 'outcome' && total < value) throw new HandleError('You do not have enough balance')

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
}

export default new TransactionService()
