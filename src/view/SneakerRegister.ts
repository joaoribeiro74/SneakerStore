import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import InputUtils from "../utils/InputUtils";

export default class SneakerRegister {
  private prompt = PromptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public addSneaker(): void {
    console.log("\n--- Cadastro de Sneakers ---");

    let brand = InputUtils.getInput("Marca: ");
    let model = InputUtils.getInput("Modelo: ");
    let price = parseFloat(InputUtils.getValidPriceInput("Preço: "));
    let colors = InputUtils.getInput("Cor(es): ");
    let gender = InputUtils.getInput("Gênero: ");
    let sizeInput = InputUtils.getInput(
      "Tamanhos disponíveis (separados por vírgula): "
    );

    let sizes = sizeInput
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    let releaseDate = InputUtils.getValidDateInput(
      "Data de lançamento (dd-mm-yyyy): "
    );
    let quantity = parseInt(InputUtils.getInput("Estoque: "));

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
}
