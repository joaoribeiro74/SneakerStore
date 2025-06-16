import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Seller from "../model/Seller";
import InputUtils from "../utils/InputUtils";

export default class SellerRegister {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public addSeller(): void {
    console.log("\n--- Cadastro de Vendedor ---");

    let sellerName = InputUtils.getInput("Nome: ");
    let sellerEmail = InputUtils.getValidEmailInput("E-mail: ");

    let seller: Seller = this.control.getNewSeller(
      sellerName,
      sellerEmail,
    );
    try {
      this.control.db.addNewSeller(seller);
      console.log(`\nVendedor ${seller.getName()} cadastrado com sucesso!`);
    } catch (err) {
      console.log((err as Error).message);
    }
  }
}
