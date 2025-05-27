import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Sneaker from "../model/Sneaker";

export default class ApplyDiscountScreen {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public applyDiscountToSneaker(): void {
    let sneakerId = parseInt(
      this.prompt("Digite o ID do Sneaker para aplicar o desconto: ")
    );
    let discountPercentage = parseFloat(
      this.prompt("Digite a porcentagem de desconto: ")
    );

    let sneaker = this.control.db.getSneakerById(sneakerId);

    if (sneaker instanceof Sneaker) {
      sneaker.applyDiscount(discountPercentage);

      console.log("\nDesconto aplicado com sucesso!");
    } else {
      console.log("\nSneaker não encontrado.");
    }
  }
}
