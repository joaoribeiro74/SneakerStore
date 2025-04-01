"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ClientController_1 = __importDefault(require("../control/ClientController"));
const OrderController_1 = __importDefault(require("../control/OrderController"));
const SaleHistoryController_1 = __importDefault(require("../control/SaleHistoryController"));
const ProductController_1 = __importDefault(require("../control/ProductController"));
const Register_1 = __importDefault(require("./Register"));
class PrimaryScreen {
    constructor() {
        this.prompt = (0, prompt_sync_1.default)();
        this.clientController = new ClientController_1.default();
        this.orderController = new OrderController_1.default();
        this.saleHistoryController = new SaleHistoryController_1.default();
        this.productController = new ProductController_1.default();
        this.register = new Register_1.default();
    }
    getFirstScreen() {
        console.log("\nBem-vindo ao sistema de loja de tênis!");
        let showScreen = false;
        while (!showScreen) {
            // Get user input
            //console.clear();
            let choice = this.prompt("Escolha:\n1 - Registrar\n2 - Listar Produtos\n3 - Criar Pedido\n4 - Ver Histórico de Pedidos\n5 - Sair\n");
            switch (choice) {
                case "1":
                    this.register.registerClient();
                    break;
                case "2":
                    this.productController.getAllProducts();
                    break;
                case "3":
                    this.createOrder();
                    break;
                case "4":
                    this.viewSaleHistory();
                    break;
                case "5":
                    console.log("Saindo...");
                    showScreen = true;
                    break;
                default:
                    console.log("Resposta Inválida! Tente Novamente.");
            }
        }
    }
    createOrder() {
        const clientId = this.prompt("Digite o ID do cliente para criar o pedido: ");
        const order = this.orderController.createOrder(Number(clientId));
        console.log(`Pedido criado para o cliente ID ${clientId}, Pedido ID: ${order.getId()}`);
    }
    viewSaleHistory() {
        const saleHistory = this.saleHistoryController.getSaleHistory(); // Obtém o histórico de vendas
        if (saleHistory.length > 0) {
            console.log("Histórico de Pedidos:");
            saleHistory.forEach((sale, index) => {
                console.log(`Venda ${index + 1}: Pedido ID ${sale.getOrderId()} - Cliente ID ${sale.getClientId()}`);
            });
        }
        else {
            console.log("Nenhuma venda registrada.");
        }
    }
}
exports.default = PrimaryScreen;
