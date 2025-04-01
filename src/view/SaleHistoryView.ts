import SaleHistoryController from "../control/SaleHistoryController";
import OrderController from "../control/OrderController";
import promptSync from "prompt-sync";

export default class SaleHistoryView {
    private prompt = promptSync();
    private saleHistoryController: SaleHistoryController;
    private orderController: OrderController;

    constructor() {
        this.saleHistoryController = new SaleHistoryController();
        this.orderController = new OrderController();
    }

    // Método para exibir o histórico de vendas
    public viewSaleHistory(): void {
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
    public viewSaleSummary(): void {
        const orderId = this.prompt("Digite o ID do pedido para ver o resumo: ");
        const summary = this.saleHistoryController.getSaleSummary(Number(orderId));

        console.log("\nResumo do Histórico de Vendas:");
        console.log(summary);
    }
}
