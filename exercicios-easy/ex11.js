class Hotel {
    constructor(nome) {
        this.nome = nome
        this.quartos = []
        this.reservas = []
    }

    adicionarQuarto(numero, tipo) {
        const quarto = new Quarto(numero, tipo)
        this.quartos.push(quarto)
    }

    consultarDisponibilidade(tipoQuarto, dataInicio, dataFim) {
        const quartosDisponiveis = this.quartos.filter(quarto => quarto.disponivel && quarto.tipo === tipoQuarto)
        return quartosDisponiveis.filter(quarto => this.verificarDisponibilidade(quarto, dataInicio, dataFim))
    }

    verificarDisponibilidade(quarto, dataInicio, dataFim) {
        for (const reserva of this.reservas) {
            if (reserva.quarto === quarto && this.verificarConflitoDatas(reserva, dataInicio, dataFim)) {
                return false
            }
        }
        return true
    }

    fazerReserva(hospede, quarto, dataInicio, dataFim) {
        if (quarto.disponivel && this.verificarDisponibilidade(quarto, dataInicio, dataFim)) {
            const reserva = new Reserva(hospede, quarto, dataInicio, dataFim)
            this.reservas.push(reserva)
            quarto.reservar()
            return reserva
        } else {
            console.log('Quarto não disponível para as datas selecionadas.')
            return null
        }
    }

    exibirInformacoes() {
        console.log(`Informações do Hotel ${this.nome}:`)
        console.log('Quartos Disponíveis:')
        this.quartos.forEach(quarto => console.log(`Quarto ${quarto.numero} - ${quarto.tipo}: ${quarto.disponivel ? 'Disponível' : 'Ocupado'}`))
        console.log('\nReservas:')
        this.reservas.forEach(reserva => reserva.exibirDetalhes())
    }
}

class Quarto {
    constructor(numero, tipo) {
        this.numero = numero
        this.tipo = tipo
        this.disponivel = true
    }

    reservar() {
        this.disponivel = false
    }
}

class Hospede {
    constructor(nome, email) {
        this.nome = nome
        this.email = email
    }
}

class Reserva {
    constructor(hospede, quarto, dataInicio, dataFim) {
        this.hospede = hospede
        this.quarto = quarto
        this.dataInicio = dataInicio
        this.dataFim = dataFim
    }

    exibirDetalhes() {
        console.log(`${this.hospede.nome} reservou o Quarto ${this.quarto.numero} (${this.quarto.tipo}) de ${this.dataInicio} a ${this.dataFim}.`)
    }
}

const hotelExemplo = new Hotel('Hotel ABC')

hotelExemplo.adicionarQuarto(101, 'simples')
hotelExemplo.adicionarQuarto(201, 'duplo')
hotelExemplo.adicionarQuarto(301, 'suíte')

const hospedeExemplo = new Hospede('Alice', 'alice@example.com')

const quartosDisponiveis = hotelExemplo.consultarDisponibilidade('simples', '2023-01-01', '2023-01-10')
console.log(`Quartos simples disponíveis: ${quartosDisponiveis.map(quarto => quarto.numero).join(', ')}`)

const reservaExemplo = hotelExemplo.fazerReserva(hospedeExemplo, quartosDisponiveis[0], '2023-01-05', '2023-01-08')

hotelExemplo.exibirInformacoes()
