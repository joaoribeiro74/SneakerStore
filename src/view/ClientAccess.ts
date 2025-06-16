import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import ClientRegister from "./ClientRegister";
import ClientScreen from "./ClientScreen";
import Client from "../model/Client";
export default class ClientAccess {
  private prompt = promptSync();
  private clientRegister: ClientRegister;
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
    this.clientRegister = new ClientRegister(control);
  }

  public clientMenu(): void {
    let continues: boolean = true;
    while (continues) {
      let choice = parseInt(
        this.prompt(
          "Cliente:\n" +
            " 1. Cadastrar\n" +
            " 2. Login\n" +
            " 3. Voltar\n> "
        )
      );
      console.clear();

      switch (choice) {
        case 1:
          this.registerClient();
          break;
        case 2:
          this.loginClient();
          break;
        case 3:
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

  private registerClient(): void {
    this.clientRegister.addClient();
    this.pause();
    console.clear();
  }

  private loginClient(): void {
    const email = this.prompt("Digite seu email: ");
    const user = this.control.db.findUserByEmail(email.toLowerCase());

    if (user && user instanceof Client) {
      const clientScreen = new ClientScreen(this.control, user);
      clientScreen.show();
    } else {
      console.log("\nCliente não encontrado.");
    }
    this.pause();
  }
}
