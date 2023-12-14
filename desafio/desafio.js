class Cliente {
    constructor(nome, endereco) {
        this.nome = nome
        this.endereco = endereco
        this.pedidos = []
    }

    fazerPedido(restaurante, items) {
        const pedido = new Pedido(this, restaurante, items)
        this.pedidos.push(pedido)
        restaurante.receberPedido(this, items)
        return pedido
    }

    consultarPedidos() {
        return this.pedidos
    }
}

class Restaurante {
    constructor(nome, menu) {
        this.nome = nome
        this.menu = menu
        this.pedidosRecebidos = []
    }

    exibirMenu() {
        console.log(`Menu do ${this.nome}:`)
        for (const item in this.menu) {
            console.log(`${item}: R$${this.menu[item].toFixed(2)}`)
        }
    }

    receberPedido(cliente, items) {
        this.pedidosRecebidos.push({ cliente, items, status: 'pendente' })
    }
}

class Pedido {
    constructor(cliente, restaurante, items) {
        this.cliente = cliente
        this.restaurante = restaurante
        this.items = items
        this.status = 'pendente'
        this.total = this.calcularTotal()
    }

    calcularTotal() {
        let total = 0
        for (const item of this.items) {
            total += this.restaurante.menu[item]
        }
        return total
    }

    atualizarStatus(status) {
        this.status = status
    }
}

const menuRestaurante = {
    'Pizza Margherita': 20.0,
    'Spaghetti Bolognese': 15.0,
    'Salada Caesar': 10.0,
}

const cliente1 = new Cliente('João', 'Rua A, 123')
const restaurante1 = new Restaurante('Pizzaria Bella', menuRestaurante)

restaurante1.exibirMenu()

const pedidoCliente1 = cliente1.fazerPedido(restaurante1, ['Pizza Margherita', 'Salada Caesar'])

console.log(`\nPedidos de ${cliente1.nome}:`)
console.log(cliente1.consultarPedidos())

pedidoCliente1.atualizarStatus('em andamento')

console.log(`\nAtualização de status do pedido: ${pedidoCliente1.status}`)
