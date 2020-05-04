import { createConnection } from 'typeorm'

class ConnectDatabase {
  async startTypeORM() {
    try {
      await createConnection()
      console.log('Typeorm conectado com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }
}

new ConnectDatabase().startTypeORM()
