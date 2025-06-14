import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import SneakerRegister from "./SneakerRegister";
import ApplyDiscountScreen from "./ApplyDiscountScreen";
export default class ClientRegister {
  private prompt = promptSync();
  private control: MainController;
  private sneakerRegister: SneakerRegister;
  private applyDiscount: ApplyDiscountScreen;

  constructor(control: MainController) {
    this.control = control;
    this.sneakerRegister = new SneakerRegister(control);
    this.applyDiscount = new ApplyDiscountScreen(control);
    this.mainMenu();
  }

  public mainMenu(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      console.log("\n--- Menu de Vendedor ---\n");
      let choice = parseInt(
        this.prompt(
          "\nEscolha:\n" +
            " 1. Cadastrar Tênis\n" +
            " 2. Aplicar Desconto no Tênis\n" +
            " 3. Listar Produtos\n" +
            " 4. Listar Clientes\n" +
            " 5. Ver Histórico de Vendas\n" +
            " 6. Voltar\n> "
        )
      );

      switch (choice) {
        case 1:
          this.sneakerRegister.addSneaker();
          this.prompt("\nPressione ENTER para continuar...");
          break;
        case 2:
          this.applyDiscount.applyDiscountToSneaker();
          this.prompt("\nPressione ENTER para continuar...");
          break;
        case 3:
          this.control.db.listAllSneakers();
          this.prompt("\nPressione ENTER para continuar...");
          break;
        case 4:
          this.control.db.listAllClients();
          this.prompt("\nPressione ENTER para continuar...");
          break;
        case 5:
          // this.control.db.listSalesBySeller(/* vendedor atual */);
          this.prompt("\nPressione ENTER para continuar...");
          break;
        case 6:
          continues = false;
          break;
        default:
          console.log("\nDigite um número válido!\n");
          this.prompt("\nPressione ENTER para continuar...");
          break;
      }
    }
    console.log("\nSAIU");
  }
}