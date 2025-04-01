"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../model/Order"));
class OrderController {
    constructor() {
        this.orders = []; // Lista de pedidos
        this.clients = []; // Lista de clientes
        this.products = []; // Lista de produtos
    }
    // Método para adicionar um produto a um pedido com controle de estoque
    addProductToOrder(orderId, product, quantity) {
        const order = this.getOrderById(orderId);
        const productInStock = this.getProductById(product.getId());
        if (!order) {
            return "Pedido não encontrado.";
        }
        if (!productInStock) {
            return "Produto não encontrado.";
        }
        if (productInStock.getStock() < quantity) {
            return "Estoque insuficiente para este produto.";
        }
        // Verifica se o produto já está no pedido
        const existingProduct = order.getProducts().find(p => p.getId() === product.getId());
        if (existingProduct) {
            // Atualiza a quantidade do produto no pedido, caso já exista
            existingProduct.addStock(quantity);
        }
        else {
            product.addStock(quantity); // Adiciona o produto ao pedido
            order.addProduct(product);
        }
        productInStock.removeStock(quantity); // Reduz o estoque do produto
        return `Produto ${product.getProductName()} foi adicionado ao pedido ID ${orderId}. Quantidade: ${quantity}`;
    }
    // Método para obter um produto pelo ID (para verificar o estoque)
    getProductById(productId) {
        return this.products.find(p => p.getId() === productId);
    }
    // Método para criar um novo pedido
    createOrder(clientId) {
        const client = this.getClientById(clientId);
        if (!client) {
            console.log("Cliente não encontrado.");
        }
        const newOrder = new Order_1.default(this.orders.length + 1, clientId); // ID do pedido é incremental
        this.orders.push(newOrder);
        return newOrder;
    }
    // Método para finalizar um pedido
    finalizeOrder(orderId) {
        const order = this.getOrderById(orderId);
        if (!order) {
            return "Pedido não encontrado.";
        }
        // Verifica se há estoque suficiente para todos os produtos no pedido
        const insufficientStockProducts = order.getProducts().filter(product => {
            const productInStock = this.getProductById(product.getId());
            return productInStock && productInStock.getStock() < product.checkStock();
        });
        if (insufficientStockProducts.length > 0) {
            return `Estoque insuficiente para os seguintes produtos: ${insufficientStockProducts.map(p => p.getProductName()).join(", ")}.`;
        }
        // Realiza qualquer outro processamento necessário para finalizar o pedido
        // Ex: Calcular preço final, aplicar descontos, etc.
        return `Pedido ID ${orderId} finalizado com sucesso.`;
    }
    // Métodos auxiliares (exemplo, obter pedidos e clientes)
    getOrderById(orderId) {
        return this.orders.find(o => o.getId() === orderId);
    }
    getClientById(clientId) {
        return this.clients.find(c => c.getId() === clientId);
    }
}
exports.default = OrderController;
