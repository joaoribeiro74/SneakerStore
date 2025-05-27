import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";

export default class SneakerRegister {
  private prompt = PromptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public addSneaker(): void {
    console.log("\n--- Cadastro de Sneakers ---");

    let brand = this.getInput("Marca: ");
    let model = this.getInput("Modelo: ");
    let price = parseFloat(this.getValidPriceInput("Preço: "));
    let colors = this.getInput("Cor(es): ");
    let gender = this.getInput("Gênero: ");
    let sizeInput = this.getInput(
      "Tamanhos disponíveis (separados por vírgula): "
    );

    let sizes = sizeInput
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    let releaseDate = this.getValidDateInput(
      "Data de lançamento (dd-mm-yyyy): "
    );
    let quantity = parseInt(this.getInput("Estoque: "));

    let sneaker: Sneaker = this.control.getNewSneaker(
      brand,
      model,
      price,
      colors,
      gender,
      sizes,
      releaseDate
    );
    let stock: Stock = this.control.getNewStock(sneaker, quantity);

    this.control.db.addNewStock(stock);

    console.log(
      `\nSneaker ${sneaker.getBrand()} ${sneaker.getModel()} cadastrado com sucesso!`
    );
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

  private getValidPriceInput(promptText: string): string {
    const priceRegex = /^\d+([.,]\d{1,2})?$/;

    while (true) {
      const input = this.prompt(promptText).trim();

      if (priceRegex.test(input)) {
        return input.replace(",", "."); // normaliza para ponto
      }

      console.log(
        "Preço inválido. Use o formato 100 ou 100.99 (máximo 2 casas decimais)."
      );
    }
  }

  private getValidDateInput(promptText: string): string {
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[0-2])[-](19|20)\d{2}$/;

    while (true) {
      const input = this.prompt(promptText).trim();

      if (dateRegex.test(input)) {
        return input;
      }

      console.log("Data inválida. Use o formato dd-mm-yyyy (ex: 25-12-2024).");
    }
  }
}
