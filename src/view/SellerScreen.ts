import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import SneakerRegister from "./SneakerRegister";
import ApplyDiscountScreen from "./ApplyDiscountScreen";
import Seller from "../model/Seller";
export default class SellerScreen {
  private prompt = promptSync();
  private control: MainController;
  private seller: Seller;
  private sneakerRegister: SneakerRegister;
  private applyDiscount: ApplyDiscountScreen;

  constructor(control: MainController, seller: Seller) {
    this.control = control;
    this.seller = seller;
    this.sneakerRegister = new SneakerRegister(control);
    this.applyDiscount = new ApplyDiscountScreen(control);
    this.show();
  }

  public show(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      console.log("\n--- Menu de Vendedor ---\n");
      let choice = parseInt(
        this.prompt(
          "\nEscolha:\n" +
            " 1. Cadastrar Tênis\n" +
            " 2. Editar Informações do Tênis\n" +
            " 3. Aplicar descontos\n" +
            " 4. Listar produtos\n" +
            " 5. Finalizar pedidos de clientes\n" +
            " 6. Editar Dados\n" + 
            " 7. Ver Histórico de Vendas\n" +
            " 8. Sair\n> "
        )
      );

      switch (choice) {
        case 1:
          this.sneakerRegister.addSneaker();
          this.pause();
          break;
        case 2:
          this.sneakerRegister.editSneaker();
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
          // this.control.db.listSalesBySeller(/* vendedor atual */);
          this.pause();
          break;
        case 6:
          this.editData();
          this.pause();
          break;
        case 7:
          // this.control.db.listSalesBySeller(/* vendedor atual */);
          this.pause();
          break;
        case 8:
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
}