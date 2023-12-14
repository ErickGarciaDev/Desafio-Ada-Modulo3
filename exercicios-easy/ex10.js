class Paciente {
    constructor(nome, cpf) {
        this.nome = nome
        this.cpf = cpf
        this.historicoMedico = new HistoricoMedico()
    }

    agendarConsulta(medico, data, hora) {
        return medico.agendarConsulta(this, data, hora)
    }

    consultarHistoricoMedico() {
        this.historicoMedico.exibirConsultas()
    }
}

class Medico {
    constructor(nome, especialidade) {
        this.nome = nome
        this.especialidade = especialidade
    }

    agendarConsulta(paciente, data, hora) {
        const consulta = new Consulta(data, hora, paciente)
        paciente.historicoMedico.adicionarConsulta(consulta)
        return consulta
    }

    registrarDiagnostico(consulta, diagnostico) {
        consulta.registrarDiagnostico(diagnostico)
    }
}

class Consulta {
    constructor(data, hora, paciente) {
        this.data = data
        this.hora = hora
        this.paciente = paciente
        this.diagnostico = ''
    }

    registrarDiagnostico(diagnostico) {
        this.diagnostico = diagnostico
    }
}

class HistoricoMedico {
    constructor() {
        this.consultas = []
    }

    adicionarConsulta(consulta) {
        this.consultas.push(consulta)
    }

    exibirConsultas() {
        console.log(`Histórico Médico de ${this.consultas[0].paciente.nome}:\n`)
        this.consultas.forEach(consulta => {
            console.log(`Data: ${consulta.data} - Hora: ${consulta.hora}`)
            console.log(`Diagnóstico: ${consulta.diagnostico || 'Não registrado'}`)
            console.log('\n------------------------\n')
        })
    }
}

const medicoExemplo = new Medico('Dr. Silva', 'Cardiologia')
const pacienteExemplo = new Paciente('Ana', '123.456.789-01')

const consulta1 = pacienteExemplo.agendarConsulta(medicoExemplo, '2023-05-10', '15:30')
medicoExemplo.registrarDiagnostico(consulta1, 'Pressão arterial elevada, recomendar dieta e exercícios.')

const consulta2 = pacienteExemplo.agendarConsulta(medicoExemplo, '2023-06-15', '16:45')
medicoExemplo.registrarDiagnostico(consulta2, 'Recuperação satisfatória, sem problemas identificados.')

pacienteExemplo.consultarHistoricoMedico()
