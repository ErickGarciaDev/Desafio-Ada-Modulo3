class Nota {
    constructor(valor, disciplina) {
        this.valor = valor
        this.disciplina = disciplina
    }
}

class Disciplina {
    constructor(nome) {
        this.nome = nome
        this.notas = []
    }

    adicionarNota(valor) {
        const nota = new Nota(valor, this)
        this.notas.push(nota)
        return nota
    }

    calcularMedia() {
        if (this.notas.length === 0) {
            return 0
        }
        const somaNotas = this.notas.reduce((soma, nota) => soma + nota.valor, 0)
        return somaNotas / this.notas.length
    }
}

class Boletim {
    constructor(aluno) {
        this.aluno = aluno
        this.disciplinas = []
    }

    adicionarDisciplina(disciplina) {
        this.disciplinas.push(disciplina)
    }

    consultarDesempenho() {
        console.log(`Boletim de ${this.aluno.nome}:\n`)
        this.disciplinas.forEach(disciplina => {
            const media = disciplina.calcularMedia()
            console.log(`Disciplina: ${disciplina.nome} - Média: ${media.toFixed(2)}`)
        })
    }
}

class Aluno {
    constructor(nome) {
        this.nome = nome
        this.boletim = new Boletim(this)
    }
}

const alunoExemplo = new Aluno('Carlos')

const disciplinaMatematica = new Disciplina('Matemática')
const disciplinaPortugues = new Disciplina('Português')

alunoExemplo.boletim.adicionarDisciplina(disciplinaMatematica)
alunoExemplo.boletim.adicionarDisciplina(disciplinaPortugues)

const notaMatematica1 = disciplinaMatematica.adicionarNota(7.5)
const notaMatematica2 = disciplinaMatematica.adicionarNota(8.0)
const notaPortugues1 = disciplinaPortugues.adicionarNota(6.5)
const notaPortugues2 = disciplinaPortugues.adicionarNota(7.0)

alunoExemplo.boletim.consultarDesempenho()
