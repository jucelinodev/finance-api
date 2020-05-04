import server from './server'

const PORT = process.env.PORT || 3000

class Main {
  init() {
    server.listen(PORT, () => console.log(`Servidor Rodando na porta ${PORT}`))
  }
}

new Main().init()
