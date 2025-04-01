"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaleHistory_1 = __importDefault(require("../model/SaleHistory"));
class SaleHistoryController {
    constructor() {
        this.saleHistories = [];
        this.orders = [];
    }
    recordSale(orderId) {
        const order = this.getOrderById(orderId);
        if (order) {
            // Criando o SaleHistory, passando os parâmetros necessários
            const saleHistory = new SaleHistory_1.default(this.saleHistories.length + 1, // saleId (incremental)
            order.getId(), // orderId
            order.getClientId(), // clientId
            order.getProducts(), // products
            0 // discountApplied (Se não houver desconto, coloque 0 ou valor padrão)
            );
            // Adicionando o histórico de venda
            this.saleHistories.push(saleHistory);
            console.log(`Venda registrada para o pedido ID ${orderId}.`);
        }
        else {
            console.log("Pedido não encontrado para registrar a venda.");
        }
    }
    getSaleHistory() {
        return this.saleHistories;
    }
    // Método para obter um pedido pelo ID
    getOrderById(orderId) {
        return this.orders.find(o => o.getId() === orderId);
    }
    // Método para exibir o resumo do histórico de vendas
    getSaleSummary(orderId) {
        const order = this.getOrderById(orderId);
        if (order) {
            const productNames = order.getProducts().map(product => product.getProductName()).join(", ");
            return `Pedido ID: ${orderId}\nProdutos: ${productNames}`;
        }
        return `Pedido ID ${orderId} não encontrado.`;
    }
}
exports.default = SaleHistoryController;
