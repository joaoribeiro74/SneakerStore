"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaleHistoryController_1 = __importDefault(require("../control/SaleHistoryController"));
const OrderController_1 = __importDefault(require("../control/OrderController"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class SaleHistoryView {
    constructor() {
        this.prompt = (0, prompt_sync_1.default)();
        this.saleHistoryController = new SaleHistoryController_1.default();
        this.orderController = new OrderController_1.default();
    }
    // Método para exibir o histórico de vendas
    viewSaleHistory() {
        const saleHistories = this.saleHistoryController.getSaleHistory();
        if (saleHistories.length === 0) {
            console.log("Não há histórico de vendas.");
            return;
        }
        console.log("\nHistórico de Vendas:\n");
        saleHistories.forEach((saleHistory, index) => {
            console.log(`Venda ${index + 1}:`);
            console.log(`Pedido ID: ${saleHistory.getOrderId()}`);
            console.log(`Cliente ID: ${saleHistory.getClientId()}`);
            console.log("Produtos vendidos:");
            saleHistory.getProducts().forEach((product, productIndex) => {
                console.log(`  Produto ${productIndex + 1}: ${product.getProductName()} - R$ ${product.getPrice().toFixed(2)}`);
            });
            console.log(`Desconto Aplicado: ${saleHistory.getDiscountApplied() * 100}%`);
            console.log("---------------------------------------------------");
        });
    }
    // Método para exibir o resumo de um pedido específico no histórico
    viewSaleSummary() {
        const orderId = this.prompt("Digite o ID do pedido para ver o resumo: ");
        const summary = this.saleHistoryController.getSaleSummary(Number(orderId));
        console.log("\nResumo do Histórico de Vendas:");
        console.log(summary);
    }
}
exports.default = SaleHistoryView;
