class Carro {
    constructor(modelo, placa) {
        this.modelo = modelo
        this.placa = placa
        this.disponivel = true
    }
}

class Cliente {
    constructor(nome, cpf) {
        this.nome = nome
        this.cpf = cpf
    }
}

class Locacao {
    constructor(cliente, carro, dataInicio, dataFim) {
        this.cliente = cliente
        this.carro = carro
        this.dataInicio = dataInicio
        this.dataFim = dataFim
        this.valor = 0
        this.status = 'pendente'
    }

    calcularValor() {
        const precoPorDia = 50
        const diasLocacao = Math.ceil((this.dataFim - this.dataInicio) / (1000 * 60 * 60 * 24))
        this.valor = precoPorDia * diasLocacao
    }

    finalizarLocacao() {
        this.status = 'concluída'
        this.carro.disponivel = true
    }
}

class AgenciaLocadora {
    constructor() {
        this.carros = []
        this.locacoes = []
    }

    adicionarCarro(carro) {
        this.carros.push(carro)
    }

    verificarDisponibilidade(modelo) {
        const carrosDisponiveis = this.carros.filter(carro => carro.disponivel && carro.modelo === modelo)
        return carrosDisponiveis
    }

    realizarLocacao(cliente, modelo, dataInicio, dataFim) {
        const carrosDisponiveis = this.verificarDisponibilidade(modelo)

        if (carrosDisponiveis.length > 0) {
            const carroSelecionado = carrosDisponiveis[0]
            const locacao = new Locacao(cliente, carroSelecionado, dataInicio, dataFim)
            locacao.calcularValor()
            this.locacoes.push(locacao)
            carroSelecionado.disponivel = false
            return locacao
        } else {
            console.log(`Não há carros disponíveis do modelo ${modelo} para as datas selecionadas.`)
            return null
        }
    }

    exibirInformacoes() {
        console.log('Carros Disponíveis:')
        this.carros.forEach(carro => console.log(`Carro ${carro.modelo} - Placa: ${carro.placa} - ${carro.disponivel ? 'Disponível' : 'Ocupado'}`))
        console.log('\nLocações Realizadas:')
        this.locacoes.forEach(locacao => console.log(`${locacao.cliente.nome} alugou um ${locacao.carro.modelo} de ${locacao.dataInicio.toLocaleDateString()} a ${locacao.dataFim.toLocaleDateString()} por R$${locacao.valor.toFixed(2)}.`))
    }
}

const carroExemplo = new Carro('Sedan', 'ABC1234')
const clienteExemplo = new Cliente('João', '123.456.789-01')
const agenciaLocadoraExemplo = new AgenciaLocadora()

agenciaLocadoraExemplo.adicionarCarro(carroExemplo)

const locacaoExemplo = agenciaLocadoraExemplo.realizarLocacao(clienteExemplo, 'Sedan', new Date('2023-01-01'), new Date('2023-01-05'))

agenciaLocadoraExemplo.exibirInformacoes()
