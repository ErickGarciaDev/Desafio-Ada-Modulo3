class Colaborador {
    constructor(nome, habilidades) {
        this.nome = nome
        this.habilidades = habilidades
    }
}

class Tarefa {
    constructor(nome, descricao, colaboradores = []) {
        this.nome = nome
        this.descricao = descricao
        this.colaboradores = colaboradores
        this.concluida = false
    }

    atribuirColaborador(colaborador) {
        if (this.colaboradores.indexOf(colaborador) === -1) {
            this.colaboradores.push(colaborador)
            console.log(`Colaborador ${colaborador.nome} atribuído à tarefa ${this.nome}.`)
        } else {
            console.log(`Colaborador ${colaborador.nome} já está atribuído à tarefa ${this.nome}.`)
        }
    }

    concluirTarefa() {
        this.concluida = true
        console.log(`Tarefa ${this.nome} concluída.`)
    }
}

class Projeto {
    constructor(nome) {
        this.nome = nome
        this.tarefas = []
    }

    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa)
    }

    exibirInformacoes() {
        console.log(`Projeto: ${this.nome}\n`)
        this.tarefas.forEach(tarefa => {
            console.log(`Tarefa: ${tarefa.nome}`)
            console.log(`Descrição: ${tarefa.descricao}`)
            console.log(`Colaboradores: ${tarefa.colaboradores.map(colaborador => colaborador.nome).join(', ')}`)
            console.log(`Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}`)
            console.log('\n------------------------\n')
        })
    }
}

class Equipe {
    constructor() {
        this.colaboradores = []
    }

    adicionarColaborador(colaborador) {
        this.colaboradores.push(colaborador)
    }
}

const colaborador1 = new Colaborador('Alice', ['Desenvolvimento'])
const colaborador2 = new Colaborador('Bob', ['Design'])
const colaborador3 = new Colaborador('Carol', ['Testes'])

const tarefa1 = new Tarefa('Implementar Feature A', 'Desenvolver a nova funcionalidade A')
const tarefa2 = new Tarefa('Design da Interface B', 'Criar o design da interface B')
const tarefa3 = new Tarefa('Testar Componente C', 'Realizar testes no componente C')

const equipeExemplo = new Equipe()
equipeExemplo.adicionarColaborador(colaborador1)
equipeExemplo.adicionarColaborador(colaborador2)
equipeExemplo.adicionarColaborador(colaborador3)

tarefa1.atribuirColaborador(colaborador1)
tarefa2.atribuirColaborador(colaborador2)
tarefa3.atribuirColaborador(colaborador3)

tarefa1.concluirTarefa()

const projetoExemplo = new Projeto('Projeto XYZ')
projetoExemplo.adicionarTarefa(tarefa1)
projetoExemplo.adicionarTarefa(tarefa2)
projetoExemplo.adicionarTarefa(tarefa3)

projetoExemplo.exibirInformacoes()
