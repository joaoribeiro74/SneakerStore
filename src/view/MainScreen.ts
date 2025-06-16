import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import ClientAccess from "./ClientAccess";
import SellerAccess from "./SellerAccess";

export default class MainScreen {
  private prompt = promptSync();
  private clientAccess: ClientAccess;
  private sellerAccess: SellerAccess;
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
    this.clientAccess = new ClientAccess(control);
    this.sellerAccess = new SellerAccess(control);
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
      );
      console.clear();

      switch (choice) {
        case 1:
          this.sellerAccess.sellerMenu();
          break;
        case 2:
          this.clientAccess.clientMenu();
          break;
        case 3:
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
