class SalaConferencia {
    constructor(nome, capacidade) {
        this.nome = nome
        this.capacidade = capacidade
        this.disponibilidade = []
    }

    verificarDisponibilidade(data, horaInicio, horaFim) {
        const conflito = this.disponibilidade.some(reserva => {
            const reservaInicio = new Date(`${reserva.data} ${reserva.horaInicio}`)
            const reservaFim = new Date(`${reserva.data} ${reserva.horaFim}`)
            const novaReservaInicio = new Date(`${data} ${horaInicio}`)
            const novaReservaFim = new Date(`${data} ${horaFim}`)

            return (
                (novaReservaInicio >= reservaInicio && novaReservaInicio < reservaFim) ||
                (novaReservaFim > reservaInicio && novaReservaFim <= reservaFim) ||
                (novaReservaInicio <= reservaInicio && novaReservaFim >= reservaFim)
            )
        })

        return !conflito
    }

    adicionarReserva(reserva) {
        this.disponibilidade.push({
            data: reserva.data,
            horaInicio: reserva.horaInicio,
            horaFim: reserva.horaFim,
        })
    }

    cancelarReserva(reserva) {
        const index = this.disponibilidade.findIndex(
            r =>
                r.data === reserva.data &&
                r.horaInicio === reserva.horaInicio &&
                r.horaFim === reserva.horaFim
        )

        if (index !== -1) {
            this.disponibilidade.splice(index, 1)
        }
    }
}

class Reserva {
    constructor(sala, usuario, data, horaInicio, horaFim) {
        this.sala = sala
        this.usuario = usuario
        this.data = data
        this.horaInicio = horaInicio
        this.horaFim = horaFim
    }

    realizarReserva() {
        if (this.sala.verificarDisponibilidade(this.data, this.horaInicio, this.horaFim)) {
            this.sala.adicionarReserva(this)
            console.log(`Reserva realizada por ${this.usuario.nome} para a sala ${this.sala.nome} em ${this.data}, das ${this.horaInicio} às ${this.horaFim}.`)
            return true
        } else {
            console.log(`Conflito de horário. A sala ${this.sala.nome} não está disponível para o horário solicitado.`)
            return false
        }
    }

    cancelarReserva() {
        this.sala.cancelarReserva(this)
        console.log(`Reserva cancelada por ${this.usuario.nome} para a sala ${this.sala.nome} em ${this.data}, das ${this.horaInicio} às ${this.horaFim}.`)
    }
}

class Usuario {
    constructor(nome) {
        this.nome = nome
    }
}

class Calendario {
    constructor() {
        this.salas = []
    }

    adicionarSala(sala) {
        this.salas.push(sala)
    }
}

const salaA = new SalaConferencia('Sala A', 20)
const salaB = new SalaConferencia('Sala B', 15)

const calendarioEmpresa = new Calendario()
calendarioEmpresa.adicionarSala(salaA)
calendarioEmpresa.adicionarSala(salaB)

const usuario1 = new Usuario('João')
const usuario2 = new Usuario('Maria')

const reserva1 = new Reserva(salaA, usuario1, '2023-05-10', '10:00', '11:30')
reserva1.realizarReserva()

const reserva2 = new Reserva(salaA, usuario2, '2023-05-10', '11:00', '12:00')
reserva2.realizarReserva()  // Conflito de horário, não será realizada

reserva1.cancelarReserva()  // Cancela a reserva anterior

const reserva3 = new Reserva(salaA, usuario2, '2023-05-10', '11:00', '12:00')
reserva3.realizarReserva()  // Agora a reserva é realizada com sucesso
