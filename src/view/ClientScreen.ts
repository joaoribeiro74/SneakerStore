import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Client from "../model/Client";
import Address from "../model/Address";
import InputUtils from "../utils/InputUtils";
import { getNextId } from "../utils/IdManager";
import Order from "../model/Order";
import InvalidAddressException from "../exceptions/InvalidAddressException";
import OutOfStockException from "../exceptions/OutOfStockException";
export default class ClientScreen {
  private prompt = promptSync();
  private control: MainController;
  private client: Client;

  constructor(control: MainController, client: Client) {
    this.control = control;
    this.client = client;
  }

  public show(): void {
    let continues: boolean = true;
    while (continues) {
      console.clear();
      console.log("--- Menu de Cliente ---\n");
      let choice = parseInt(
        this.prompt(
          `Bem-Vindo, ${this.client.getName()}!\n` +
            " 1. Ver Lista de Tênis\n" +
            " 2. Adicionar Tênis ao Carrinho\n" +
            " 3. Ver Carrinho\n" +
            " 4. Finalizar Pedido\n" +
            ` 5. Adicionar novo endereço\n` +
            " 6. Ver Dados\n" +
            " 7. Editar Dados\n" +
            " 8. Sair\n> "
        )
      );
      console.clear();

      switch (choice) {
        case 1:
          this.control.db.listAllSneakers();
          this.pause();
          break;
        case 2:
          this.addToCart();
          this.pause();
          break;
        case 3:
          this.viewCart();
          this.pause();
          break;
        case 4:
          this.finishOrder();
          this.pause();
          break;
        case 5:
          this.addAddress();
          this.pause();
          break;
        case 6:
          this.seeData();
          this.pause();
          break;
        case 7:
          this.editData();
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
  }

  private pause(): void {
    this.prompt("\nPressione ENTER para continuar...");
  }

  private addToCart(): void {
    const id = Number(
      this.prompt("Digite o ID do tênis que deseja adicionar ao carrinho: ")
    );
    if (isNaN(id)) {
      console.log("\n❌ Entrada inválida. Digite um número.");
      return;
    }

    const sneaker = this.control.db.findSneakerById(id);
    if (!sneaker) {
      console.log("\n❌ Tênis não encontrado.");
      return;
    }

    const availableSizes = sneaker.getSizes();
    if (!availableSizes || availableSizes.length === 0) {
      console.log("\n❌ Nenhum tamanho disponível para este modelo.");
      return;
    }

    console.log("\n📏 Tamanhos disponíveis: " + availableSizes.join(", "));
    const size = Number(this.prompt("Digite o tamanho desejado: "));

    try {
      this.control.addToCart(this.client, id, size);
      console.log(`\n✅ Tênis adicionado ao carrinho no tamanho ${size}!`);
    } catch (error) {
      if (error instanceof Error) {
        console.log("\n❌ " + error.message);
      } else {
        console.log("\n❌ Erro desconhecido.");
      }
    }
  }

  private viewCart(): void {
    const cartItems = this.control.getCartItems(this.client);
    console.log("--- Carrinho ---\n");
    if (cartItems.length === 0) {
      console.log("Carrinho vazio.");
    } else {
      cartItems.forEach((item, i) => {
        console.log(
          `${i + 1}. ${item.sneaker.getInfo()} | Tamanho: ${item.size}`
        );
      });
    }
  }

  private finishOrder(): void {
    const cart = this.control.getCartItems(this.client);
    if (cart.length === 0) {
      console.log("\n❌ Seu carrinho está vazio!");
      return;
    }

    const addresses = this.control.getClientAddresses(this.client);
    if (addresses.length === 0) {
      console.log("\n❌ Nenhum endereço cadastrado. Por favor, adicione um.");
      return;
    }

    console.log("\nSelecione o endereço para entrega:");
    addresses.forEach((address, index) => {
      console.log(
        `${
          index + 1
        }. ${address.getAddress()}, ${address.getDistrict()}, ${address.getCity()} - ${address.getState()}, ${address.getCountry()}`
      );
    });

    const choice =
      Number(this.prompt("\nDigite o número do endereço desejado: ")) - 1;

    try {
      this.control.finishOrder(this.client, choice);
      console.log("\n✅ Pedido finalizado com sucesso! Aguarde o vendedor.");
    } catch (error) {
      if (error instanceof Error) {
        console.log("\n❌ " + error.message);
      } else {
        console.log("\n❌ Erro desconhecido.");
      }
    }
  }

  private addAddress(): void {
    console.log("\n--- Adicionar Novo Endereço ---\n");

    const cep = InputUtils.getValidCepInput("CEP: ");
    const city = InputUtils.getInput("Cidade: ");
    const state = InputUtils.getInput("Estado (sigla ex: SP): ");
    const country = InputUtils.getInput("País: ");
    const district = InputUtils.getInput("Bairro: ");
    const addressLine = InputUtils.getInput("Endereço (Rua, Nº): ");
    const reference = InputUtils.getInput("Referência (opcional): ");

    const newAddress = new Address(
      cep,
      city,
      state,
      country,
      district,
      addressLine,
      reference
    );
    this.control.addAddress(this.client, newAddress);
    console.log("\n✅ Endereço adicionado com sucesso!");
  }

   private seeData(): void {
    console.log("--- Seus Dados ---\n");
    console.log(`Nome: ${this.client.getName()}`);
    console.log(`Email: ${this.client.getEmail()}`);

    const addresses = this.control.getClientAddresses(this.client);
    if (addresses.length > 0) {
      console.log("\nEndereços:");
      addresses.forEach((a, i) => {
        console.log(
          `${i + 1}. ${a.getAddress()}, ${a.getDistrict()}, ${a.getCity()} - ${a.getState()}, ${a.getCountry()}`
        );
      });
    } else {
      console.log("Nenhum endereço cadastrado.");
    }
  }
  private editData(): void {
    console.log("--- Editar Dados ---\n");

    const newName = this.prompt("Novo nome (deixe vazio para manter): ");
    const newEmail = this.prompt("Novo email (deixe vazio para manter): ");

    if (newName) this.client.setName(newName);
    if (newEmail) this.client.setEmail(newEmail);

    const addresses = this.client.getAddresses();
    if (addresses.length === 0) {
      console.log("\nNenhum endereço cadastrado.");
      this.pause();
      return;
    }

    console.log("\nEndereços cadastrados:");
    addresses.forEach((address, index) => {
      console.log(
        `${
          index + 1
        }. ${address.getAddress()}, ${address.getDistrict()}, ${address.getCity()} - ${address.getState()}, ${address.getCountry()} \n`
      );
    });

    const option = Number(
      this.prompt(
        "Digite o número do endereço que deseja editar (ou 0 para não editar): "
      )
    );
    if (isNaN(option) || option < 0 || option > addresses.length) {
      console.log("\n❌ Opção inválida.");
      this.pause();
      return;
    }

    if (option === 0) {
      console.log("\nEndereços mantidos sem alterações.");
      this.control.db.updateClient(this.client);
      return;
    }

    const selected = addresses[option - 1];
    console.log("\nDeixe vazio para manter o valor atual.");

    const cepInput = this.prompt(`CEP (${selected.getCep()}): `);
    const city = this.prompt(`Cidade (${selected.getCity()}): `);
    const stateInput = this.prompt(`Estado (${selected.getState()}): `);
    const country = this.prompt(`País (${selected.getCountry()}): `);
    const district = this.prompt(`Bairro (${selected.getDistrict()}): `);
    const address = this.prompt(`Endereço (${selected.getAddress()}): `);
    const reference = this.prompt(`Referência (${selected.getReference()}): `);

    if (cepInput) {
      const cepRegex = /^\d{5}-?\d{3}$/;
      if (cepRegex.test(cepInput)) {
        selected.setCep(cepInput);
      } else {
        console.log("CEP inválido. Use o formato 00000-000 ou 00000000.");
      }
    }
    if (city) selected.setCity(city);
    if (stateInput) {
      const stateRegex = /^[A-Za-z]{2}$/;
      if (stateRegex.test(stateInput)) {
        selected.setState(stateInput.toUpperCase());
      } else {
        console.log(
          "Estado inválido. Digite a sigla com duas letras (ex: SP, RJ, PR)."
        );
      }
    }
    if (country) selected.setCountry(country);
    if (district) selected.setDistrict(district);
    if (address) selected.setAddress(address);
    if (reference) selected.setReference(reference);

    this.control.db.updateClient(this.client);
    console.log("\n✅ Dados do cliente atualizados com sucesso!");
  }
}
