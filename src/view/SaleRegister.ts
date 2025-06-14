import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Client from "../model/Client";
import Sale from "../model/Sale";

export default class SaleRegister {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public addSale(): void {
    console.log("\n--- Criar Pedido ---");

    let clientId = this.getInput("Digite o ID do cliente: ");
    let sneakerId = this.getInput("Digite o ID do sneaker: ");

    let sale = this.control.getNewSale(Number(sneakerId), Number(clientId), Number(sneakerId));

    if (sale) {
      this.control.db.addNewSale(sale);
      console.log(`Venda realizada com sucesso!\n`);
      console.log(
        `Cliente: ${sale.getClient().getName()} | Sneaker: ${sale
          .getSneaker()
          .getBrand()} ${sale.getSneaker().getModel()}`
      );
    } else {
      console.log(
        "\nNão foi possível criar a venda. Verifique os IDs e tente novamente."
      );
    }
  }

  private getInput(promptText: string): string {
    while (true) {
      const input = this.prompt(promptText).trim();
      if (input.length > 0) {
        return input;
      }
      console.log("Este campo é obrigatório.");
    }
  }
}
