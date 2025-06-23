import Database from "../db/Database";
import Address from "../model/Address";
import Client from "../model/Client";
import Order from "../model/Order";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import { getNextId } from "../utils/IdManager";
import MainScreen from "../view/MainScreen";
import { updateIdStoreWithMaxId } from "../utils/IdManager";
import OutOfStockException from "../exceptions/OutOfStockException";
import InvalidAddressException from "../exceptions/InvalidAddressException";

export default class MainController {
  public db: Database = new Database();

  constructor() {
    new MainScreen(this);
  }

  public getNewClient(
    name: string,
    email: string,
    cep: string,
    city: string,
    state: string,
    country: string,
    district: string,
    address: string,
    reference: string
  ): Client {
    const existingClient = this.db.findUserByEmail(email.toLowerCase());

    if (existingClient) {
      throw new Error(
        "\nJá existe um usuário cadastrado com este e-mail. Tente Novamente."
      );
    }

    const id = getNextId("Client");

    const client = new Client(id, name, email);
    const clientAddress = new Address(
      cep,
      city,
      state,
      country,
      district,
      address,
      reference
    );
    client.addAddress(clientAddress);
    return client;
  }

  public getNewSeller(name: string, email: string): Seller {
    const existingSeller = this.db.findUserByEmail(email.toLowerCase());

    if (existingSeller) {
      throw new Error(
        "\nJá existe um usuário cadastrado com este e-mail. Tente Novamente."
      );
    }

    const id = getNextId("Seller");
    return new Seller(id, name, email);
  }

  public getNewSneaker(
    brand: string,
    model: string,
    price: number,
    colors: string,
    gender: string,
    sizes: number[],
    releaseDate: string
  ): Sneaker {
    const id = getNextId("Sneaker");
    return new Sneaker(
      id,
      brand,
      model,
      price,
      colors,
      gender,
      sizes,
      releaseDate
    );
  }

  public getNewStock(sneaker: Sneaker, quantity: number): Stock {
    return new Stock(sneaker.getId(), quantity);
  }

  public getNewSales(
    client: Client,
    seller: Seller,
    sneakers: Sneaker[]
  ): Sale[] {
    const sales: Sale[] = [];

    for (const sneaker of sneakers) {
      const stock = this.db.getStockBySneakerId(sneaker.getId());
      if (!stock) {
        console.log(
          `\n❌ Estoque não encontrado para o tênis: ${sneaker.getBrand()} ${sneaker.getModel()}`
        );
        continue;
      }

      const id = getNextId("Sale");
      const sale = new Sale(
        id,
        sneaker,
        client,
        client.getAddresses()[0],
        stock,
        seller
      );
      this.db.updateStock(stock);
      sales.push(sale);
    }

    return sales;
  }

  public registerNewSneaker(data: {
    brand: string;
    model: string;
    price: number;
    colors: string;
    gender: string;
    sizes: number[];
    releaseDate: string; // já que no seu getNewSneaker releaseDate é string
    quantity: number;
  }): void {
    const sneaker = this.getNewSneaker(
      data.brand,
      data.model,
      data.price,
      data.colors,
      data.gender,
      data.sizes,
      data.releaseDate
    );

    const stock = this.getNewStock(sneaker, data.quantity);

    this.db.addNewSneaker(sneaker);
    this.db.addNewStock(stock);
  }

  public getSneakerById(id: number): Sneaker | null {
    return this.db.getSneakerById(id);
  }

  public updateSneakerInfo(sneaker: Sneaker): boolean {
    return this.db.updateSneaker(sneaker);
  }

  public increaseStock(sneakerId: number, quantity: number): boolean {
    const stock = this.db.getStockBySneakerId(sneakerId);
    if (!stock || quantity <= 0) return false;

    stock.updateQuantity(stock.getQuantity() + quantity);
    this.db.updateStock(stock);
    return true;
  }

  public deleteSneaker(sneakerId: number): boolean {
    const sneaker = this.db.getSneakerById(sneakerId);
    if (!sneaker) return false;

    this.db.removeSneakerById(sneakerId);
    this.db.removeStockBySneakerId(sneakerId);
    this.db.reorderSneakerAndStockIds(sneakerId);

    const maxId = this.db.getMaxSneakerId();
    updateIdStoreWithMaxId("Sneaker", maxId);
    return true;
  }

  public applyDiscountToSneaker(
    sneakerId: number,
    discountPercentage: number
  ): boolean {
    const sneaker = this.db.getSneakerById(sneakerId);
    if (!sneaker) return false;

    sneaker.applyDiscount(discountPercentage);
    this.db.updateSneaker(sneaker);
    return true;
  }

  public getAllSneakers() {
    return this.db.listAllSneakers();
  }

  public getPendingOrders(): Order[] {
    return this.db.getAllOrders();
  }

  public finalizeOrderByIndex(
    seller: Seller,
    orderIndex: number
  ): { success: boolean; message: string } {
    const orders = this.getPendingOrders();

    if (orders.length === 0) {
      return { success: false, message: "Nenhum pedido pendente." };
    }

    if (orderIndex < 0 || orderIndex >= orders.length) {
      return { success: false, message: "Opção inválida." };
    }

    const selectedOrder = orders[orderIndex];
    const client = selectedOrder.getClient();
    const cart = selectedOrder.getItems();

    const sales: Sale[] = this.getNewSales(client, seller, cart);
    sales.forEach((sale) => this.db.addNewSale(sale));

    this.db.removeOrder(selectedOrder.getId());

    return { success: true, message: "Pedido finalizado com sucesso!" };
  }

  public getSellerInfo(sellerId: number): string {
    const seller = this.db.findSellerById(sellerId);
    if (!seller) return "Vendedor não encontrado.";
    return seller.displayInfo();
  }

  public updateSellerData(
    sellerId: number,
    newName?: string,
    newEmail?: string
  ): boolean {
    const seller = this.db.findSellerById(sellerId);
    if (!seller) return false;

    if (newName) seller.setName(newName);
    if (newEmail) seller.setEmail(newEmail);

    this.db.updateSeller(seller);
    return true;
  }

  public addToCart(client: Client, sneakerId: number, size: number): void {
    const sneaker = this.db.findSneakerById(sneakerId);
    if (!sneaker) {
      throw new Error("Tênis não encontrado com o ID informado.");
    }
    const availableSizes = sneaker.getSizes();
    if (!availableSizes || !availableSizes.includes(size)) {
      throw new OutOfStockException("Tamanho não disponível para este modelo.");
    }
    client.getCart().push({ sneaker, size });
    this.db.updateClient(client);
  }

  public getCartItems(client: Client): { sneaker: any; size: number }[] {
    return client.getCart();
  }

  public finishOrder(client: Client, addressIndex: number): void {
    const cart = client.getCart();
    if (cart.length === 0) {
      throw new Error("Seu carrinho está vazio!");
    }

    const addresses = client.getAddresses();
    if (addresses.length === 0) {
      throw new Error("Nenhum endereço cadastrado.");
    }

    if (addressIndex < 0 || addressIndex >= addresses.length) {
      throw new InvalidAddressException("Endereço inválido selecionado.");
    }

    const selectedAddress = addresses[addressIndex];
    const sneakersOnly = cart.map((item) => item.sneaker);
    const orderId = getNextId("Order");

    const order = new Order(orderId, client, sneakersOnly, selectedAddress);
    this.db.addOrder(order);

    // Limpar carrinho após finalizar
    cart.length = 0;
    this.db.updateClient(client);
  }

  public addAddress(client: Client, address: Address): void {
    client.getAddresses().push(address);
    this.db.updateClient(client);
  }

  public getClientAddresses(client: Client): Address[] {
    return client.getAddresses();
  }

  editClientData(client: Client, prompt: (msg: string) => string): void {
    const newName = prompt("Novo nome (deixe vazio para manter): ");
    const newEmail = prompt("Novo email (deixe vazio para manter): ");

    if (newName) client.setName(newName);
    if (newEmail) client.setEmail(newEmail);

    const addresses = client.getAddresses();
    if (addresses.length === 0) {
      console.log("\nNenhum endereço cadastrado.");
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
      prompt(
        "Digite o número do endereço que deseja editar (ou 0 para não editar): "
      )
    );

    if (isNaN(option) || option < 0 || option > addresses.length) {
      console.log("\n❌ Opção inválida.");
      return;
    }

    if (option === 0) {
      console.log("\nEndereços mantidos sem alterações.");
      this.db.updateClient(client);
      return;
    }

    const selected = addresses[option - 1];
    console.log("\nDeixe vazio para manter o valor atual.");

    const cepInput = prompt(`CEP (${selected.getCep()}): `);
    const city = prompt(`Cidade (${selected.getCity()}): `);
    const stateInput = prompt(`Estado (${selected.getState()}): `);
    const country = prompt(`País (${selected.getCountry()}): `);
    const district = prompt(`Bairro (${selected.getDistrict()}): `);
    const address = prompt(`Endereço (${selected.getAddress()}): `);
    const reference = prompt(`Referência (${selected.getReference()}): `);

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

    this.db.updateClient(client);
    console.log("\n✅ Dados do cliente atualizados com sucesso!");
  }
}
