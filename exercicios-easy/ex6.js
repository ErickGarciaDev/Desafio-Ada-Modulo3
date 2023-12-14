class Espetaculo {
    constructor(titulo, data, horario, assentosDisponiveis) {
        this.titulo = titulo
        this.data = data
        this.horario = horario
        this.assentosDisponiveis = assentosDisponiveis
        this.reservas = []
    }

    verificarDisponibilidade(quantidade) {
        return this.assentosDisponiveis >= quantidade
    }

    fazerReserva(cliente, quantidade) {
        if (this.verificarDisponibilidade(quantidade)) {
            const reserva = new Reserva(this, cliente, quantidade)
            this.reservas.push(reserva)
            this.assentosDisponiveis -= quantidade
            return reserva
        } else {
            console.log(`Desculpe, não há assentos disponíveis suficientes para fazer a reserva de ${quantidade} assentos para o espetáculo ${this.titulo}.`)
            return null
        }
    }
}

class Cliente {
    constructor(nome) {
        this.nome = nome
        this.reservas = []
    }

    fazerReserva(espetaculo, quantidade) {
        const reserva = espetaculo.fazerReserva(this, quantidade)
        if (reserva) {
            this.reservas.push(reserva)
            return reserva
        } else {
            console.log(`Falha ao fazer a reserva para o espetáculo ${espetaculo.titulo}.`)
            return null
        }
    }
}

class Reserva {
    constructor(espetaculo, cliente, quantidade) {
        this.espetaculo = espetaculo
        this.cliente = cliente
        this.quantidade = quantidade
    }
}

class Teatro {
    constructor() {
        this.espetaculos = []
    }

    agendarEspetaculo(espetaculo) {
        this.espetaculos.push(espetaculo)
    }

    exibirInformacoes() {
        console.log('Espetáculos Agendados:')
        this.espetaculos.forEach(espetaculo => {
            console.log(`\nTítulo: ${espetaculo.titulo}`)
            console.log(`Data e Horário: ${espetaculo.data} - ${espetaculo.horario}`)
            console.log(`Assentos Disponíveis: ${espetaculo.assentosDisponiveis}`)
            console.log('Reservas:')
            espetaculo.reservas.forEach(reserva => console.log(`Cliente: ${reserva.cliente.nome} - Quantidade: ${reserva.quantidade}`))
        })
    }
}

const espetaculoExemplo = new Espetaculo('Peça A', '2023-03-15', '20:00', 50)
const teatroExemplo = new Teatro()

teatroExemplo.agendarEspetaculo(espetaculoExemplo)

const clienteExemplo = new Cliente('Alice')
const reservaExemplo = clienteExemplo.fazerReserva(espetaculoExemplo, 2)

teatroExemplo.exibirInformacoes()
