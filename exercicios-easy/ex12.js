class Tarefa {
    constructor(descricao, dataVencimento) {
        this.descricao = descricao
        this.dataVencimento = dataVencimento
        this.concluida = false
    }

    marcarConcluida() {
        this.concluida = true
        console.log(`Tarefa "${this.descricao}" concluída.`)
    }
}

class ListaTarefas {
    constructor(nome, usuario) {
        this.nome = nome
        this.usuario = usuario
        this.tarefas = []
    }

    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa)
    }

    marcarTarefaConcluida(descricao) {
        const tarefa = this.tarefas.find(t => t.descricao === descricao)
        if (tarefa) {
            tarefa.marcarConcluida()
        } else {
            console.log(`Tarefa "${descricao}" não encontrada na lista "${this.nome}".`)
        }
    }
}

class Categoria {
    constructor(nome) {
        this.nome = nome
        this.tarefas = []
    }

    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa)
    }

    marcarTarefaConcluida(descricao) {
        const tarefa = this.tarefas.find(t => t.descricao === descricao)
        if (tarefa) {
            tarefa.marcarConcluida()
        } else {
            console.log(`Tarefa "${descricao}" não encontrada na categoria "${this.nome}".`)
        }
    }
}

class Usuario {
    constructor(nome) {
        this.nome = nome
        this.listasTarefas = []
        this.categorias = []
    }

    criarListaTarefas(nome) {
        const lista = new ListaTarefas(nome, this)
        this.listasTarefas.push(lista)
        return lista
    }

    criarCategoria(nome) {
        const categoria = new Categoria(nome)
        this.categorias.push(categoria)
        return categoria
    }
}

const usuarioExemplo = new Usuario('Alice')

const listaPessoal = usuarioExemplo.criarListaTarefas('Pessoal')
const listaTrabalho = usuarioExemplo.criarListaTarefas('Trabalho')

const categoriaImportante = usuarioExemplo.criarCategoria('Importante')
const categoriaLazer = usuarioExemplo.criarCategoria('Lazer')

const tarefa1 = new Tarefa('Fazer compras', '2023-05-15')
const tarefa2 = new Tarefa('Preparar apresentação', '2023-05-20')

listaPessoal.adicionarTarefa(tarefa1)
listaTrabalho.adicionarTarefa(tarefa2)

categoriaImportante.adicionarTarefa(tarefa1)
categoriaLazer.adicionarTarefa(tarefa2)

usuarioExemplo.listasTarefas.forEach(lista => {
    lista.tarefas.forEach(tarefa => console.log(`Lista: ${lista.nome} - Tarefa: ${tarefa.descricao} - Concluída: ${tarefa.concluida}`))
})

usuarioExemplo.categorias.forEach(categoria => {
    categoria.tarefas.forEach(tarefa => console.log(`Categoria: ${categoria.nome} - Tarefa: ${tarefa.descricao} - Concluída: ${tarefa.concluida}`))
})

listaPessoal.marcarTarefaConcluida('Fazer compras')
categoriaImportante.marcarTarefaConcluida('Fazer compras')

console.log('Após marcar como concluída:')
usuarioExemplo.listasTarefas.forEach(lista => {
    lista.tarefas.forEach(tarefa => console.log(`Lista: ${lista.nome} - Tarefa: ${tarefa.descricao} - Concluída: ${tarefa.concluida}`))
})

usuarioExemplo.categorias.forEach(categoria => {
    categoria.tarefas.forEach(tarefa => console.log(`Categoria: ${categoria.nome} - Tarefa: ${tarefa.descricao} - Concluída: ${tarefa.concluida}`))
})
