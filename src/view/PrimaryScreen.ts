import promptSync from "prompt-sync";
import ClientController from "../control/ClientController";
import OrderController from "../control/OrderController";
import SaleHistoryController from "../control/SaleHistoryController";
import ProductController from "../control/ProductController";
import Register from "./Register";

export default class PrimaryScreen{
    private prompt = promptSync();
    private clientController: ClientController;
    private orderController: OrderController;
    private saleHistoryController: SaleHistoryController;
    private productController: ProductController;
    private register: Register;

    constructor() {
      this.clientController = new ClientController();
      this.orderController = new OrderController();
      this.saleHistoryController = new SaleHistoryController();
      this.productController = new ProductController();
      this.register = new Register();
    }

    public getFirstScreen():void {
      console.log("\nBem-vindo ao sistema de loja de tênis!");
            let showScreen: boolean = false;
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

          private createOrder(): void {
            const clientId = this.prompt("Digite o ID do cliente para criar o pedido: ");
            const order = this.orderController.createOrder(Number(clientId));
            console.log(`Pedido criado para o cliente ID ${clientId}, Pedido ID: ${order.getId()}`);
          }
      
          private viewSaleHistory(): void {
            const saleHistory = this.saleHistoryController.getSaleHistory(); // Obtém o histórico de vendas
              if (saleHistory.length > 0) {
                  console.log("Histórico de Pedidos:");
                  saleHistory.forEach((sale, index) => {
                      console.log(`Venda ${index + 1}: Pedido ID ${sale.getOrderId()} - Cliente ID ${sale.getClientId()}`);
                  });
              } else {
                  console.log("Nenhuma venda registrada.");
              }
          }
        }
        
  