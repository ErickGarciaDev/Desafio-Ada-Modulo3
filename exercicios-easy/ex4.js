class Produto {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
    }
}

class CarrinhoDeCompras {
    constructor() {
        this.produtos = []
    }

    adicionarProduto(produto, quantidade) {
        this.produtos.push({ produto, quantidade })
    }

    calcularTotal() {
        return this.produtos.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)
    }
}

class Cliente {
    constructor(nome, endereco) {
        this.nome = nome
        this.endereco = endereco
    }

    criarPedido(carrinho) {
        return new Pedido(this, carrinho)
    }
}

class Pedido {
    constructor(cliente, carrinho) {
        this.cliente = cliente
        this.produtos = carrinho.produtos
        this.statusEntrega = 'pendente'
    }

    calcularTotal() {
        return this.produtos.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)
    }

    atualizarStatusEntrega(status) {
        this.statusEntrega = status
    }
}

const produto1 = new Produto('Camiseta', 29.99)
const produto2 = new Produto('Calça Jeans', 49.99)

const carrinhoCliente1 = new CarrinhoDeCompras()
carrinhoCliente1.adicionarProduto(produto1, 2)
carrinhoCliente1.adicionarProduto(produto2, 1)

const cliente1 = new Cliente('Maria', 'Rua B, 456')
const pedidoCliente1 = cliente1.criarPedido(carrinhoCliente1)

console.log(`Total do Pedido: R$${pedidoCliente1.calcularTotal().toFixed(2)}`)

pedidoCliente1.atualizarStatusEntrega('em andamento')

console.log(`Status de Entrega do Pedido: ${pedidoCliente1.statusEntrega}`)
