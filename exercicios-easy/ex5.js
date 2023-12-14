class Aluno {
    constructor(nome, matricula) {
        this.nome = nome
        this.matricula = matricula
        this.disciplinas = []
    }

    matricularEmDisciplina(disciplina) {
        this.disciplinas.push(disciplina)
        disciplina.adicionarAluno(this)
    }

    calcularMedia(disciplina) {
        const notas = disciplina.notas.filter(nota => nota.aluno === this)
        const somaNotas = notas.reduce((soma, nota) => soma + nota.valor, 0)
        return notas.length > 0 ? somaNotas / notas.length : 0
    }

    verificarStatusAprovacao(disciplina) {
        const media = this.calcularMedia(disciplina)
        return media >= 7 ? 'Aprovado' : 'Reprovado'
    }
}

class Professor {
    constructor(nome) {
        this.nome = nome
    }

    atribuirNota(aluno, disciplina, valor) {
        disciplina.adicionarNota(aluno, valor)
    }
}

class Disciplina {
    constructor(nome) {
        this.nome = nome
        this.alunos = []
        this.notas = []
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno)
    }

    adicionarNota(aluno, valor) {
        this.notas.push({ aluno, valor })
    }
}

class Turma {
    constructor() {
        this.disciplinas = []
        this.alunos = []
    }

    adicionarDisciplina(disciplina) {
        this.disciplinas.push(disciplina)
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno)
    }
}

const aluno1 = new Aluno('João', '2023001')
const aluno2 = new Aluno('Maria', '2023002')

const disciplinaMatematica = new Disciplina('Matemática')
const disciplinaPortugues = new Disciplina('Português')

const turmaA = new Turma()

turmaA.adicionarDisciplina(disciplinaMatematica)
turmaA.adicionarDisciplina(disciplinaPortugues)

turmaA.adicionarAluno(aluno1)
turmaA.adicionarAluno(aluno2)

const professorMatematica = new Professor('Prof. Silva')
const professorPortugues = new Professor('Prof. Oliveira')

aluno1.matricularEmDisciplina(disciplinaMatematica)
aluno1.matricularEmDisciplina(disciplinaPortugues)

aluno2.matricularEmDisciplina(disciplinaMatematica)
aluno2.matricularEmDisciplina(disciplinaPortugues)

professorMatematica.atribuirNota(aluno1, disciplinaMatematica, 8)
professorPortugues.atribuirNota(aluno1, disciplinaPortugues, 7)

professorMatematica.atribuirNota(aluno2, disciplinaMatematica, 6)
professorPortugues.atribuirNota(aluno2, disciplinaPortugues, 9)

console.log(`Média de ${aluno1.nome} em ${disciplinaMatematica.nome}: ${aluno1.calcularMedia(disciplinaMatematica).toFixed(2)}`)
console.log(`Status de aprovação de ${aluno1.nome} em ${disciplinaMatematica.nome}: ${aluno1.verificarStatusAprovacao(disciplinaMatematica)}`)

console.log(`Média de ${aluno2.nome} em ${disciplinaPortugues.nome}: ${aluno2.calcularMedia(disciplinaPortugues).toFixed(2)}`)
console.log(`Status de aprovação de ${aluno2.nome} em ${disciplinaPortugues.nome}: ${aluno2.verificarStatusAprovacao(disciplinaPortugues)}`)
