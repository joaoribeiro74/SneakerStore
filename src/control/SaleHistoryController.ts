import SaleHistory from "../model/SaleHistory";
import Order from "../model/Order";
import Product from "../model/Product";
import Discount from "../model/Discount";  // Verifique se o nome está correto no seu projeto

export default class SaleHistoryController {
    private saleHistories: SaleHistory[] = [];
    private orders: Order[] = [];

    public recordSale(orderId: number): void {
        const order = this.getOrderById(orderId);

        if (order) {
            // Criando o SaleHistory, passando os parâmetros necessários
            const saleHistory = new SaleHistory(
                this.saleHistories.length + 1,  // saleId (incremental)
                order.getId(),                 // orderId
                order.getClientId(),           // clientId
                order.getProducts(),           // products
                0                               // discountApplied (Se não houver desconto, coloque 0 ou valor padrão)
            );

            // Adicionando o histórico de venda
            this.saleHistories.push(saleHistory);
            console.log(`Venda registrada para o pedido ID ${orderId}.`);
        } else {
            console.log("Pedido não encontrado para registrar a venda.");
        }
    }

    public getSaleHistory(): SaleHistory[] {
        return this.saleHistories;
    }

    // Método para obter um pedido pelo ID
    private getOrderById(orderId: number): Order | undefined {
        return this.orders.find(o => o.getId() === orderId);
    }

    // Método para exibir o resumo do histórico de vendas
    public getSaleSummary(orderId: number): string {
        const order = this.getOrderById(orderId);
        
        if (order) {
            const productNames = order.getProducts().map(product => product.getProductName()).join(", ");
            return `Pedido ID: ${orderId}\nProdutos: ${productNames}`;
        }
        return `Pedido ID ${orderId} não encontrado.`;
    }
}
