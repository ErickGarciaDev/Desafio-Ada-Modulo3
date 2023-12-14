class Categoria {
    constructor(nome) {
        this.nome = nome
    }
}

class Despesa {
    constructor(valor, data, categoria) {
        this.valor = valor
        this.data = data
        this.categoria = categoria
    }
}

class Receita {
    constructor(valor, data, fonte) {
        this.valor = valor
        this.data = data
        this.fonte = fonte
    }
}

class Orcamento {
    constructor() {
        this.despesas = []
        this.receitas = []
    }

    registrarDespesa(valor, data, categoriaNome) {
        const categoria = this.encontrarOuCriarCategoria(categoriaNome)
        const despesa = new Despesa(valor, data, categoria)
        this.despesas.push(despesa)
    }

    registrarReceita(valor, data, fonte) {
        const receita = new Receita(valor, data, fonte)
        this.receitas.push(receita)
    }

    calcularSaldo() {
        const totalDespesas = this.despesas.reduce((total, despesa) => total + despesa.valor, 0)
        const totalReceitas = this.receitas.reduce((total, receita) => total + receita.valor, 0)
        return totalReceitas - totalDespesas
    }

    gerarRelatorioFinanceiro() {
        console.log('==== Relatório Financeiro ====\n')

        console.log('Despesas:')
        this.despesas.forEach(despesa => {
            console.log(`Data: ${despesa.data} - Categoria: ${despesa.categoria.nome} - Valor: R$${despesa.valor.toFixed(2)}`)
        })

        console.log('\nReceitas:')
        this.receitas.forEach(receita => {
            console.log(`Data: ${receita.data} - Fonte: ${receita.fonte} - Valor: R$${receita.valor.toFixed(2)}`)
        })

        const saldo = this.calcularSaldo()
        console.log(`\nSaldo Total: R$${saldo.toFixed(2)}`)
    }

    encontrarOuCriarCategoria(nome) {
        const categoriaExistente = this.despesas.find(despesa => despesa.categoria.nome === nome)
        if (categoriaExistente) {
            return categoriaExistente.categoria
        } else {
            const novaCategoria = new Categoria(nome)
            return novaCategoria
        }
    }
}

const orcamentoPessoal = new Orcamento()

orcamentoPessoal.registrarDespesa(150.0, '2023-05-10', 'Alimentação')
orcamentoPessoal.registrarDespesa(50.0, '2023-05-15', 'Transporte')

orcamentoPessoal.registrarReceita(500.0, '2023-05-05', 'Salário')
orcamentoPessoal.registrarReceita(200.0, '2023-05-20', 'Freelance')

orcamentoPessoal.gerarRelatorioFinanceiro()
