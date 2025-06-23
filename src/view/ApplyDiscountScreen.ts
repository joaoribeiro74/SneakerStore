import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Sneaker from "../model/Sneaker";

export default class ApplyDiscountScreen {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public applyDiscount(): void {
    let sneakerId = parseInt(
      this.prompt("Digite o ID do Sneaker para aplicar o desconto: ")
    );
    let discountPercentage = parseFloat(
      this.prompt("Digite a porcentagem de desconto: ")
    );

    const success = this.control.applyDiscountToSneaker(sneakerId, discountPercentage);

    if (success) {
      console.log("\n✅ Desconto aplicado com sucesso!");
    } else {
      console.log("\n❌ Sneaker não encontrado.");
    }
  }
}
