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
    console.log("--- Cadastro de Sneakers ---\n");

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

    try {
      this.control.registerNewSneaker({
        brand,
        model,
        price,
        colors,
        gender,
        sizes,
        releaseDate,
        quantity,
      });
      console.log(`\nSneaker ${brand} ${model} cadastrado com sucesso!`);
    } catch (error) {
      console.log(`Erro ao cadastrar sneaker: ${(error as Error).message}`);
    }
  }
}
