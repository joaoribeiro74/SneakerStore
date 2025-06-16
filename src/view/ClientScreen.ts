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
    console.log("\nSAIU");
  }

  private pause(): void {
    this.prompt("\nPressione ENTER para continuar...");
  }

  private addToCart(): void {
  const id = Number(this.prompt("Digite o ID do tênis que deseja adicionar ao carrinho: "));
  if (isNaN(id)) {
    console.log("\n❌ Entrada inválida. Digite um número.");
    this.pause();
    return;
  }

  const sneaker = this.control.db.findSneakerById(id);
  if (!sneaker) {
    console.log("\n❌ Tênis não encontrado com o ID informado.");
    this.pause();
    return;
  }

  const availableSizes = sneaker.getSizes(); // supondo que esse método existe e retorna number[]
  try {
    if (!availableSizes || availableSizes.length === 0) {
      throw new OutOfStockException("Nenhum tamanho disponível para este modelo.");
    }

    console.log("\n📏 Tamanhos disponíveis: " + availableSizes.join(", "));
    const size = Number(this.prompt("Digite o tamanho desejado: "));
    if (!availableSizes.includes(size)) {
      throw new OutOfStockException();
    }

    this.client.getCart().push({ sneaker, size });
    console.log(`\n✅ Tênis adicionado ao carrinho no tamanho ${size}!`);
  } catch (error) {
      if (error instanceof Error) {
      console.log("\n❌ " + error.message);
    } else {
      console.log("\n❌ Erro desconhecido");
    }
    this.pause();
    }
  }

  private viewCart(): void {
    const cart = this.client.getCart();
    console.log("--- Carrinho ---\n");
    if (cart.length === 0) {
      console.log("Carrinho vazio.");
    } else {
      cart.forEach((item, i) => {
        console.log(`${i + 1}. ${item.sneaker.getInfo()} | Tamanho Escolhido: ${item.size}`);
      });
    }
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
    try {
      if (isNaN(choice) || choice < 1 || choice > addresses.length) {
        throw new InvalidAddressException();
      }
    } catch (error) {
        if (error instanceof Error) {
        console.log("\n❌ " + error.message);
      } else {
        console.log("\n❌ Erro desconhecido");
      }
    this.pause();
    return;
    }
    
    const selectedAddress = addresses[choice - 1];

    console.clear();
    console.log("\n--- Itens do seu pedido ---\n");
    cart.forEach((item, i) => {
      console.log(`${i + 1}. ${item.sneaker.getInfo()} | Tamanho: ${item.size}`);
    });

    console.log(
      `\nPedido será enviado para: ${selectedAddress.getAddress()}, ${selectedAddress.getDistrict()}, ${selectedAddress.getCity()} - ${selectedAddress.getState()}, ${selectedAddress.getCountry()}`
    );

    const orderId = getNextId("Order");
    const sneakersOnly = cart.map((item) => item.sneaker);
    const order = new Order(orderId, this.client, sneakersOnly, selectedAddress);
    this.control.db.addOrder(order);

    cart.length = 0;
    this.control.db.updateClient(this.client);

    console.log(
      "\n✅ Pedido enviado! Aguarde um vendedor processar sua compra."
    );
  }

  private addAddress(): void {
    console.log("\n--- Adicionar Novo Endereço ---\n");

    const cep = InputUtils.getValidCepInput("CEP: ");
    const city = InputUtils.getInput("Cidade: ");
    const state = InputUtils.getValidStateInput("Estado: ");
    const country = InputUtils.getInput("País: ");
    const district = InputUtils.getInput("Bairro: ");
    const address = InputUtils.getInput("Endereço: ");
    const reference = InputUtils.getOptionalInput("Referência: ");

    const newAddress = new Address(
      cep,
      city,
      state,
      country,
      district,
      address,
      reference!
    );
    this.client.getAddresses().push(newAddress);
    this.control.db.updateClient(this.client);

    console.log("\n✅ Endereço adicionado com sucesso!");
  }

  private seeData(): void {
    console.log("--- Seus Dados ---\n");
    console.log(this.client.displayInfo());
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
        }. ${address.getAddress()}, ${address.getDistrict()}, ${address.getCity()} - ${address.getState()}, ${address.getCountry()}`
      );
    });

    const option = Number(
      this.prompt("\nDigite o número do endereço que deseja editar (ou 0 para não editar): ")
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
