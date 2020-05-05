import { Repository, EntityRepository } from 'typeorm'
import { Transaction } from '../entities/transaction.entity'

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
