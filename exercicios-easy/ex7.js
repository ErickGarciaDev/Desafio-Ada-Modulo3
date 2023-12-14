class Restaurante {
    constructor(nome) {
        this.nome = nome
        this.menu = []
    }

    adicionarItemAoMenu(item) {
        this.menu.push(item)
    }

    exibirMenu() {
        console.log(`Menu do Restaurante ${this.nome}:`)
        this.menu.forEach(item => console.log(`Nome: ${item.nome} - Preço: R$${item.preco.toFixed(2)}`))
    }
}

class Cliente {
    constructor(nome) {
        this.nome = nome
        this.pedidos = []
    }

    fazerPedido(restaurante) {
        return new Pedido(this, restaurante)
    }
}

class Pedido {
    constructor(cliente, restaurante) {
        this.cliente = cliente
        this.restaurante = restaurante
        this.itens = []
        this.status = 'pendente'
    }

    adicionarItem(item, quantidade) {
        this.itens.push({ item, quantidade })
    }

    calcularTotal() {
        return this.itens.reduce((total, item) => total + item.item.preco * item.quantidade, 0)
    }

    atualizarStatus(status) {
        this.status = status
    }
}

class ItemMenu {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
    }
}

const restauranteExemplo = new Restaurante('Restaurante A')

const itemMenu1 = new ItemMenu('Pizza Margherita', 25.99)
const itemMenu2 = new ItemMenu('Hamburguer Clássico', 15.99)

restauranteExemplo.adicionarItemAoMenu(itemMenu1)
restauranteExemplo.adicionarItemAoMenu(itemMenu2)

const clienteExemplo = new Cliente('João')
const pedidoExemplo = clienteExemplo.fazerPedido(restauranteExemplo)

pedidoExemplo.adicionarItem(itemMenu1, 2)
pedidoExemplo.adicionarItem(itemMenu2, 1)

console.log(`Total do Pedido: R$${pedidoExemplo.calcularTotal().toFixed(2)}`)

pedidoExemplo.atualizarStatus('em andamento')

console.log(`Status do Pedido: ${pedidoExemplo.status}`)
