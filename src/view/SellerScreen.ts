import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import SneakerRegister from "./SneakerRegister";
import ApplyDiscountScreen from "./ApplyDiscountScreen";
import Seller from "../model/Seller";
import SneakerEdit from "./SneakerEdit";
import Order from "../model/Order";
export default class SellerScreen {
  private prompt = promptSync();
  private control: MainController;
  private seller: Seller;
  private sneakerRegister: SneakerRegister;
  private sneakerEdit: SneakerEdit;
  private applyDiscount: ApplyDiscountScreen;

  constructor(control: MainController, seller: Seller) {
    this.control = control;
    this.seller = seller;
    this.sneakerRegister = new SneakerRegister(control);
    this.sneakerEdit = new SneakerEdit(control);
    this.applyDiscount = new ApplyDiscountScreen(control);
  }

  public show(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      console.log("--- Menu de Vendedor ---\n");
      let choice = parseInt(
        this.prompt(
          `Bem-Vindo, ${this.seller.getName()}!\n` +
            " 1. Cadastrar Tênis\n" +
            " 2. Editar Informações do Tênis\n" +
            " 3. Aplicar descontos\n" +
            " 4. Listar produtos\n" +
            " 5. Finalizar pedidos de clientes\n" +
            " 6. Ver Dados\n" +
            " 7. Editar Dados\n" +
            " 8. Ver Histórico de Vendas\n" +
            " 9. Sair\n> "
        )
      );
      console.clear();

      switch (choice) {
        case 1:
          this.sneakerRegister.addSneaker();
          this.pause();
          break;
        case 2:
          this.sneakerEdit.editMenu();
          this.pause();
          break;
        case 3:
          this.applyDiscount.applyDiscount();
          this.pause();
          break;
        case 4:
          this.control.db.listAllSneakers();
          this.pause();
          break;
        case 5:
          this.finalizeClientOrder();
          this.pause();
          break;
        case 6:
          this.seeData();
          break;
        case 7:
          this.editData();
          break;
        case 8:
          this.control.db.listSalesBySeller(this.seller.getId());
          this.pause();
          break;
        case 9:
          continues = false;
          break;
        default:
          console.log("\nDigite um número válido!\n");
          this.pause();
          break;
      }
    }
    console.log("\nSAIU");
  }

  private pause(): void {
    this.prompt("\nPressione ENTER para continuar...");
  }

  private finalizeClientOrder(): void {
    const orders = this.control.db.getAllOrders();

    if (orders.length === 0) {
      console.log("\n🚫 Nenhum pedido pendente.");
      return;
    }

    console.log("\n--- Pedidos Pendentes ---\n");
    orders.forEach((order: Order, index: number) => {
      console.log(
        `${index + 1}. Cliente: ${order.getClient().getName()} | Itens: ${order.getItems().length} | Endereço de Envio: ${order.getDeliveryAddress().getAddress()}, ${order.getDeliveryAddress().getDistrict()}, ${order.getDeliveryAddress().getCity()} - ${order.getDeliveryAddress().getState()}, ${order.getDeliveryAddress().getCountry()}`
      );
    });

    const choice = parseInt(this.prompt("\nDigite o número do pedido que deseja finalizar: "));
    if (isNaN(choice) || choice < 1 || choice > orders.length) {
      console.log("\n❌ Opção inválida.");
      return;
    }

    const selectedOrder = orders[choice - 1];
    const client = selectedOrder.getClient();
    const cart = selectedOrder.getItems();

    // Cria uma venda para cada item do pedido
    const sales = this.control.getNewSales(client, this.seller, cart);
    sales.forEach(sale => this.control.db.addNewSale(sale));

    this.control.db.removeOrder(selectedOrder.getId());

    console.log("\n✅ Pedido finalizado com sucesso!");
  }

  private seeData(): void {
    console.log("--- Seus Dados ---\n");
    console.log(this.seller.displayInfo());
    this.pause();
  }

  private editData(): void {
    console.log("--- Editar Dados ---\n");

      const newName = this.prompt("Novo nome (deixe vazio para manter): ");
      const newEmail = this.prompt("Novo email (deixe vazio para manter): ");

      if (newName) this.seller.setName(newName);
      if (newEmail) this.seller.setEmail(newEmail);

      this.control.db.updateSeller(this.seller);
      console.log("\nDados atualizados com sucesso!");
      this.pause();
    }
}