import Database from "../db/Database";
import Address from "../model/Address";
import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import { getNextId } from "../utils/IdManager";
import MainScreen from "../view/MainScreen";

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
      throw new Error("\nJá existe um usuário cadastrado com este e-mail. Tente Novamente.");
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

  public getNewSeller(
    name: string,
    email: string,
  ): Seller {
    const existingSeller = this.db.findUserByEmail(email.toLowerCase());

    if (existingSeller) {
      throw new Error("\nJá existe um usuário cadastrado com este e-mail. Tente Novamente.");
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
    return new Sneaker(id, brand, model, price, colors, gender, sizes, releaseDate);
  }

  public getNewStock(sneaker: Sneaker, quantity: number): Stock {
    return new Stock(sneaker.getId(), quantity);
  }

  public getNewSales(client: Client, seller: Seller, sneakers: Sneaker[]): Sale[] {
    const sales: Sale[] = [];

    for (const sneaker of sneakers) {
      const stock = this.db.getStockBySneakerId(sneaker.getId());
      if (!stock) {
        console.log(`\n❌ Estoque não encontrado para o tênis: ${sneaker.getBrand()} ${sneaker.getModel()}`);
        continue;
      }

      const id = getNextId("Sale");
      const sale = new Sale(id, sneaker, client, client.getAddresses()[0], stock, seller);
      this.db.updateStock(stock);
      sales.push(sale);
    }

    return sales;
  }
}
