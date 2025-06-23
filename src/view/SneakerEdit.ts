import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Stock from "../model/Stock";
import InputUtils from "../utils/InputUtils";
import Sneaker from "../model/Sneaker";
import { updateIdStoreWithMaxId } from "../utils/IdManager";
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
      console.clear();

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
  }

  private pause(): void {
    this.prompt("\nPressione ENTER para continuar...");
  }

  private getSneakerById(): Sneaker | null {
    const id = parseInt(this.prompt("Digite o ID do tênis: "));
    const sneaker = this.control.getSneakerById(id); // ✅ Usa o controller
    if (!sneaker) {
      console.log("\nTênis não encontrado.");
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

    const brand = this.prompt(`Nova marca (${sneaker.getBrand()}): `);
    const model = this.prompt(`Novo modelo (${sneaker.getModel()}): `);
    const priceInput = this.prompt(
      `Novo preço (${sneaker.getPrice().toFixed(2)}): `
    );
    const colors = this.prompt(`Novas cores (${sneaker.getColors()}): `);
    const gender = this.prompt(`Novo gênero (${sneaker.getGender()}): `);
    const sizeInput = this.prompt(
      `Novos tamanhos (ex: 38,39,40) (${sneaker.getSizes().join(",")}): `
    );
    const dateInput = this.prompt(
      `Nova data de lançamento (dd-mm-yyyy) (${sneaker.getReleaseDate()}): `
    );

    let isValid = true;

    if (brand) sneaker.setBrand(brand);
    if (model) sneaker.setModel(model);
    if (priceInput) {
      const priceRegex = /^\d+([.,]\d{1,2})?$/;
      if (priceRegex.test(priceInput)) {
        const parsed = parseFloat(priceInput.replace(",", "."));
        sneaker.setPrice(parsed);
      } else {
        console.log("\n❌ Preço inválido. Use um número válido (ex: 199.99)");
        isValid = false;
      }
    }
    if (colors) sneaker.setColors(colors);
    if (gender) sneaker.setGender(gender);
    if (sizeInput) {
      const sizes = sizeInput
        .split(/[\s,]+/)
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
      if (sizes.length > 0) {
        sneaker.setSizes(sizes);
      } else {
        console.log(
          "\n❌ Tamanhos inválidos. Use vírgulas ou espaço entre os números (ex: 38,39,40)"
        );
        isValid = false;
      }
    }
    if (dateInput) {
      const dateRegex =
        /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[0-2])[-](19|20)\d{2}$/;
      if (dateRegex.test(dateInput)) {
        sneaker.setReleaseDate(dateInput);
      } else {
        console.log(
          "\n❌ Data inválida. Use o formato dd-mm-yyyy (ex: 25-12-2024)"
        );
        isValid = false;
      }
    }

    if (!isValid) {
      console.log("\n⚠️ Nenhuma alteração foi salva devido aos erros acima.");
      return;
    }

    const success = this.control.updateSneakerInfo(sneaker);
    if (success) {
      console.log("\n✅ Informações do tênis atualizadas com sucesso!");
    } else {
      console.log("\n❌ Erro ao atualizar o tênis.");
    }
  }

  private increaseStock(): void {
    const sneaker = this.getSneakerById();
    if (!sneaker) return;

    const qtd = parseInt(this.prompt("Quantidade a adicionar no estoque: "));
    if (isNaN(qtd) || qtd <= 0) {
      console.log("\n❌ Quantidade inválida.");
      return;
    }

    const success = this.control.increaseStock(sneaker.getId(), qtd);
    if (success) {
      console.log("\n✅ Estoque aumentado com sucesso.");
    } else {
      console.log("\n❌ Erro ao atualizar o estoque.");
    }
  }

  private deleteSneaker(): void {
    const sneaker = this.getSneakerById();
    if (!sneaker) return;

    const confirm = this.prompt(
      `\nTem certeza que deseja excluir o tênis "${sneaker.getBrand()} ${sneaker.getModel()}"? (s/n): `
    ).toLowerCase();

    if (confirm === "s") {
      const success = this.control.deleteSneaker(sneaker.getId());
      if (success) {
        console.log("\n✅ Tênis excluído com sucesso.");
      } else {
        console.log("\n❌ Erro ao excluir o tênis.");
      }
    } else {
      console.log("\nExclusão cancelada.");
    }
  }
}
