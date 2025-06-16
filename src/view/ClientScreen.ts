import promptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Client from "../model/Client";
import Address from "../model/Address";
import InputUtils from "../utils/InputUtils";
import { getNextId } from "../utils/IdManager";
import Order from "../model/Order";
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
      let choice = parseInt(
        this.prompt(
          `Bem-Vindo, ${this.client.getName()}!\n` +
            " 1. Ver Lista de Tênis\n" +
            " 2. Adicionar Tênis ao Carrinho\n" +
            " 3. Ver Carrinho\n" +
            " 4. Finalizar Pedido\n" +
            ` 5. Adicionar novo endereço\n` +
            " 6. Editar Dados\n" +
            " 7. Sair\n> "
        )
      );

      switch (choice) {
        case 1:
          this.control.db.listAllSneakers();
          break;
        case 2:
          this.addToCart();
          break;
        case 3:
          this.viewCart();
          break;
        case 4:
          this.finishOrder();
          break;
        case 5:
          this.addAddress();
          break;
        case 6:
          this.editData();
          break;
        case 7:
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

  private addToCart(): void {
    const id = Number(
      this.prompt("Digite o ID do tênis que deseja adicionar ao carrinho: ")
    );
    if (isNaN(id)) {
      console.log("\n❌ Entrada inválida. Digite um número.");
      this.pause();
      return;
    }
    const sneaker = this.control.db.findSneakerById(id);
    if (sneaker) {
      this.client.getCart().push(sneaker);
      console.log("\n✅ Tênis adicionado ao carrinho com sucesso!");
    } else {
      console.log("\n❌ Tênis não encontrado com o ID informado.");
    }
    this.pause();
  }

  private viewCart(): void {
    const cart = this.client.getCart();
    console.log("\n--- Carrinho ---\n");
    if (cart.length === 0) {
      console.log("Carrinho vazio.");
    } else {
      cart.forEach((s) => console.log(s.getInfo()));
    }
    this.pause();
  }

  private finishOrder(): void {
    const cart = this.client.getCart();
    if (cart.length === 0) {
      console.log("\n❌ Seu carrinho está vazio!");
      this.pause();
      return;
    }

    const addresses = this.client.getAddresses();
    if (addresses.length === 0) {
      console.log(
        "\n❌ Nenhum endereço cadastrado. Por favor, adicione um antes de finalizar o pedido."
      );
      this.pause();
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

    const choice = Number(
      this.prompt("\nDigite o número do endereço desejado: ")
    );
    if (isNaN(choice) || choice < 1 || choice > addresses.length) {
      console.log("\n❌ Opção inválida.");
      this.pause();
      return;
    }

    const selectedAddress = addresses[choice - 1];

    console.log("\n--- Itens do seu pedido ---\n");
    cart.forEach((s, i) => console.log(`${i + 1}. ${s.getInfo()}`));

    console.log(
      `\nPedido será enviado para: ${selectedAddress.getAddress()}, ${selectedAddress.getDistrict()}, ${selectedAddress.getCity()} - ${selectedAddress.getState()}, ${selectedAddress.getCountry()}`
    );

    const orderId = getNextId("Order");
    const order = new Order(
      orderId, this.client, [...cart], selectedAddress
    );
    this.control.db.addOrder(order);

    cart.length = 0;
    this.control.db.updateClient(this.client);

    console.log(
      "\n✅ Pedido enviado! Aguarde um vendedor processar sua compra."
    );

    this.pause();
  }

  private addAddress(): void {
    console.log("\n--- Adicionar Novo Endereço ---\n");

    const cep = InputUtils.getValidCepInput("CEP: ");
    const city = InputUtils.getInput("Cidade: ");
    const state = InputUtils.getValidStateInput("Estado: ");
    const country = InputUtils.getInput("País: ");
    const district = InputUtils.getInput("Bairro: ");
    const address = InputUtils.getInput("Endereço: ");
    const reference = InputUtils.getInput("Referência: ");

    const newAddress = new Address(
      cep,
      city,
      state,
      country,
      district,
      address,
      reference
    );
    this.client.getAddresses().push(newAddress);
    this.control.db.updateClient(this.client);

    console.log("\n✅ Endereço adicionado com sucesso!");
    this.pause();
  }

  private editData(): void {
    console.log("\n--- Editar Dados ---\n");

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
        }. ${address.getAddress()}, ${address.getDistrict()}, ${address.getCity()} - ${address.getState()}, ${address.getCountry()}`
      );
    });

    const option = Number(
      this.prompt("\nDigite o número do endereço que deseja editar: ")
    );
    if (isNaN(option) || option < 1 || option > addresses.length) {
      console.log("\n❌ Opção inválida.");
      this.pause();
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
        console.log("Estado inválido. Digite a sigla com duas letras (ex: SP, RJ, PR).");
        }
    }
    if (country) selected.setCountry(country);
    if (district) selected.setDistrict(district);
    if (address) selected.setAddress(address);
    if (reference) selected.setReference(reference);

    this.control.db.updateClient(this.client);
    console.log("\n✅ Dados do cliente atualizados com sucesso!");
    this.pause();
  }
}
