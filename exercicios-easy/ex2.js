class Produto {
    constructor(nome, preco, quantidadeEmEstoque, quantidadeMinima) {
        this.nome = nome
        this.preco = preco
        this.quantidadeEmEstoque = quantidadeEmEstoque
        this.quantidadeMinima = quantidadeMinima
    }
}

class Fornecedor {
    constructor(nome) {
        this.nome = nome
    }

    processarPedido(pedido) {
        console.log(`Pedido processado pelo fornecedor ${this.nome}.`)
        pedido.finalizarPedido()
    }
}

class Pedido {
    constructor(produto, quantidade) {
        this.produto = produto
        this.quantidade = quantidade
        this.status = 'pendente'
    }

    finalizarPedido() {
        this.status = 'concluído'
    }
}

class Estoque {
    constructor() {
        this.produtos = []
        this.pedidos = []
    }

    adicionarProduto(produto) {
        this.produtos.push(produto)
    }

    realizarPedidoReposicao(produto, quantidade) {
        if (produto.quantidadeEmEstoque < produto.quantidadeMinima) {
            const pedido = new Pedido(produto, quantidade)
            this.pedidos.push(pedido)
            console.log(`Pedido de reposição para o produto ${produto.nome} registrado.`)
            return pedido
        } else {
            console.log(`Não é necessário fazer um pedido de reposição para o produto ${produto.nome}.`)
            return null
        }
    }

    receberPedido(pedido) {
        if (pedido.status === 'concluído') {
            const produtoNoEstoque = this.produtos.find(produto => produto.nome === pedido.produto.nome)
            produtoNoEstoque.quantidadeEmEstoque += pedido.quantidade
            console.log(`Pedido recebido. Atualizado estoque do produto ${pedido.produto.nome}.`)
        } else {
            console.log(`Pedido ainda não foi processado pelo fornecedor.`)
        }
    }
}

const produtoExemplo = new Produto('Camiseta', 29.99, 10, 5)
const fornecedorExemplo = new Fornecedor('FornecedorABC')
const estoqueExemplo = new Estoque()

estoqueExemplo.adicionarProduto(produtoExemplo)

const pedidoReposicao = estoqueExemplo.realizarPedidoReposicao(produtoExemplo, 8)

fornecedorExemplo.processarPedido(pedidoReposicao)

estoqueExemplo.receberPedido(pedidoReposicao)

console.log(`Estoque do produto ${produtoExemplo.nome}: ${produtoExemplo.quantidadeEmEstoque}`)
