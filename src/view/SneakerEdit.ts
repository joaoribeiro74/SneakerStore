import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Stock from "../model/Stock";
import InputUtils from "../utils/InputUtils";
import Sneaker from "../model/Sneaker";
export default class SneakerEdit {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public editMenu(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      console.log("--- Editar Tênis ---\n");
      let choice = parseInt(
        this.prompt(
          "O que deseja fazer:\n" +
            " 1. Alterar informações do tênis\n" +
            " 2. Aumentar estoque\n" +
            " 3. Excluir tênis\n" +
            " 4. Voltar\n> "
        )
      );

      switch (choice) {
        case 1:
          this.editSneakerInfo();
          this.pause();
          break;
        case 2:
          this.increaseStock();
          this.pause();
          break;
        case 3:
          this.deleteSneaker();
          this.pause();
          break;
        case 4:
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

  private getSneakerById(): Sneaker | null {
    const id = parseInt(this.prompt("Digite o ID do tênis: "));
    const sneaker = this.control.db.getSneakerById(id);
    if (!sneaker) {
      console.log("Tênis não encontrado.");
      return null;
    }
    return sneaker;
  }

  private editSneakerInfo(): void {
    const sneaker = this.getSneakerById();
    if (!sneaker) return;

    console.log(
      `\nEditando: ${sneaker.getBrand()} ${sneaker.getModel()} (deixe vazio para manter o valor atual)`
    );

    const brand = InputUtils.getInput(`Nova marca [${sneaker.getBrand()}]: `);
    if (brand.trim()) sneaker.setBrand(brand);

    const model = InputUtils.getInput(`Novo modelo [${sneaker.getModel()}]: `);
    if (model.trim()) sneaker.setModel(model);

    const priceInput = InputUtils.getInput(
      `Novo preço [${sneaker.getPrice().toFixed(2)}]: `
    );
    if (priceInput.trim()) sneaker.setPrice(parseFloat(priceInput));

    const colors = InputUtils.getInput(
      `Novas cores [${sneaker.getColors()}]: `
    );
    if (colors.trim()) sneaker.setColors(colors);

    const gender = InputUtils.getInput(
      `Novo gênero [${sneaker.getGender()}]: `
    );
    if (gender.trim()) sneaker.setGender(gender);

    const sizeInput = InputUtils.getInput(
      `Novos tamanhos (ex: 38,39,40) [${sneaker.getSizes().join(",")}]: `
    );
    if (sizeInput.trim()) {
      const sizes = sizeInput
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
      sneaker.setSizes(sizes);
    }

    const dateInput = InputUtils.getInput(
      `Nova data de lançamento (dd-mm-yyyy) [${sneaker.getReleaseDate()}]: `
    );
    if (dateInput.trim()) {
      const newDate = InputUtils.getValidDateInput(dateInput);
      if (newDate) sneaker.setReleaseDate(newDate);
    }

    console.log("Informações atualizadas com sucesso!");
  }

  private increaseStock(): void {
    const sneaker = this.getSneakerById();
    if (!sneaker) return;

    const stock = this.control.db.getStockBySneakerId(sneaker.getId());
    if (!stock) {
      console.log("Este tênis não possui estoque registrado ainda.");
      const qtd = parseInt(
        this.prompt("Deseja adicionar estoque inicial? Quantidade: ")
      );
      if (!isNaN(qtd) && qtd > 0) {
        const newStock = new Stock(sneaker, qtd);
        this.control.db.addNewStock(newStock); // ou equivalente
        console.log("Estoque inicial adicionado com sucesso.");
      } else {
        console.log("Quantidade inválida. Operação cancelada.");
      }
      return;
    }

    const qtd = parseInt(this.prompt("Quantidade a adicionar no estoque: "));
    if (!isNaN(qtd) && qtd > 0) {
      const novaQuantidade = stock.getQuantity() + qtd;
      stock.updateQuantity(novaQuantidade);
      console.log("Estoque aumentado com sucesso.");
    } else {
      console.log("Quantidade inválida.");
    }
  }

  private deleteSneaker(): void {
    const sneaker = this.getSneakerById();
    if (!sneaker) return;

    const confirm = this.prompt(
      `Tem certeza que deseja excluir o tênis "${sneaker.getBrand()} ${sneaker.getModel()}"? (s/n): `
    ).toLowerCase();
    if (confirm === "s") {
      this.control.db.removeSneakerById(sneaker.getId());
      this.control.db.removeStockBySneakerId(sneaker.getId());
      console.log("Tênis excluído com sucesso.");
    } else {
      console.log("Exclusão cancelada.");
    }
  }
}
