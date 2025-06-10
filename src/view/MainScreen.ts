import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import ClientRegister from "./ClientRegister";
import SneakerRegister from "./SneakerRegister";
import SaleRegister from "./SaleRegister";
import ApplyDiscountScreen from "./ApplyDiscountScreen";

export default class MainScreen {
  private prompt = promptSync();
  private control: MainController;
  private clientRegister: ClientRegister;
  private sneakerRegister: SneakerRegister;
  private saleRegister: SaleRegister;
  private applyDiscount: ApplyDiscountScreen;

  constructor(control: MainController) {
    this.control = control;
    this.clientRegister = new ClientRegister(control);
    this.sneakerRegister = new SneakerRegister(control);
    this.saleRegister = new SaleRegister(control);
    this.applyDiscount = new ApplyDiscountScreen(control);
    this.mainMenu();
  }

  public mainMenu(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      let choice = parseInt(
        this.prompt(
          "\nEntrar como:\n" +
            " 1. Vendedor\n" +
            " 2. Cliente\n" +
            " 3. Sair\n> "
        )
      )
      // let choice = parseInt(
      //  this.prompt(
      //    "\nEscolha:\n" +
      //      " 1. Cadastro de Tênis\n" +
      //      " 2. Cadastro de Cliente\n" +
      //      " 3. Aplicar Desconto no Tênis\n" +
      //      " 4. Listar Produtos\n" +
      //      " 5. Listar Clientes\n" +
      //      " 6. Criar Pedidos\n" +
      //      " 7. Histórico de Vendas\n" +
      //      " 8. Sair\n> "
      //  )
      //);

      switch (choice) {
        case 1:
      //  case 1:
      //    this.sneakerRegister.addSneaker();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 2:
      //    this.clientRegister.addClient();
      //    this.prompt("\nPressione ENTER para continuar...\n");
      //    break;
      //  case 3:
      //    this.applyDiscount.applyDiscountToSneaker();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 4:
      //    this.control.db.listAllSneakers();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 5:
      //    this.control.db.listAllClients();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 6:
      //    this.saleRegister.addSale();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 7:
      //    this.control.db.listAllSales();
      //    this.prompt("\nPressione ENTER para continuar...");
      //    break;
      //  case 8:
      //    continues = false;
      //    break;
        default:
          console.log("\nDigite um número válido!\n");
          this.prompt("\nPressione ENTER para continuar...");
          break;
      }
    }
    console.log("\nSAIU");
  }
}
