import promptSync from 'prompt-sync';
import MainController from '../controller/MainController';
import SellerScreen from './SellerScreen';
import SellerRegister from './SellerRegister';
export default class SellerAccess {
  private prompt = promptSync();
  private sellerRegister: SellerRegister;
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
    this.sellerRegister = new SellerRegister(control);
    this.menu();
  }

  public menu(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      let choice = parseInt(
        this.prompt(
          "\nEntrar como:\n" +
            " 1. Cadastrar\n" +
            " 2. Login\n" +
            " 3. Sair\n> "
        )
      );

      switch (choice) {
        case 1:
          this.registerSeller();
          break;
        case 2:
          this.loginSeller();
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

  private registerSeller(): void {
    this.sellerRegister.addSeller();
    this.pause();
  }

  private loginSeller(): void {
    const email = this.prompt("\nDigite seu email: ");
    const seller = this.control.db.findSellerByEmail(email);
    if (seller) {
      const sellerScreen = new SellerScreen(this.control, seller);
      sellerScreen.show();
    } else {
      console.log("Vendedor não encontrado.");
    }
    this.pause();
  }
}