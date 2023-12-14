class Produto {
    constructor(nome, preco, quantidadeEmEstoque) {
        this.nome = nome
        this.preco = preco
        this.quantidadeEmEstoque = quantidadeEmEstoque
    }
}

class Estoque {
    constructor() {
        this.produtos = []
    }

    adicionarProduto(produto) {
        this.produtos.push(produto)
    }

    atualizarEstoque(carrinho) {
        carrinho.itens.forEach(item => {
            const produto = this.produtos.find(p => p.nome === item.produto.nome)
            if (produto) {
                produto.quantidadeEmEstoque -= item.quantidade
            }
        })
    }
}

class CarrinhoDeCompras {
    constructor() {
        this.itens = []
    }

    adicionarItem(produto, quantidade) {
        this.itens.push({ produto, quantidade })
    }

    calcularTotal() {
        return this.itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)
    }
}

class Cliente {
    constructor(nome) {
        this.nome = nome
    }

    realizarCompra(carrinho, estoque) {
        estoque.atualizarEstoque(carrinho)
    }
}

const produto1 = new Produto('Arroz', 5.99, 100)
const produto2 = new Produto('Feijão', 4.99, 50)

const estoqueSupermercado = new Estoque()
estoqueSupermercado.adicionarProduto(produto1)
estoqueSupermercado.adicionarProduto(produto2)

const clienteExemplo = new Cliente('Joana')
const carrinhoExemplo = new CarrinhoDeCompras()

carrinhoExemplo.adicionarItem(produto1, 3)
carrinhoExemplo.adicionarItem(produto2, 2)

console.log(`Total da Compra: R$${carrinhoExemplo.calcularTotal().toFixed(2)}`)

clienteExemplo.realizarCompra(carrinhoExemplo, estoqueSupermercado)

console.log(`Quantidade de Arroz em Estoque: ${produto1.quantidadeEmEstoque}`)
console.log(`Quantidade de Feijão em Estoque: ${produto2.quantidadeEmEstoque}`)
