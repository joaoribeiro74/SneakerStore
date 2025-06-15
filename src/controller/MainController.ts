import Database from "../db/Database";
import Address from "../model/Address";
import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
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
    const client = new Client(name, email);
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
    const seller = new Seller(name, email);
    return seller;
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
    return new Sneaker(brand, model, price, colors, gender, sizes, releaseDate);
  }

  public getNewStock(sneaker: Sneaker, quantity: number): Stock {
    return new Stock(sneaker, quantity);
  }

  public getNewSale(sneakerId: number, clientId: number, sellerId: number): Sale | null {
    const client = this.db.getClientById(clientId);
    const stock = this.db.getStockBySneakerId(sneakerId);
    const seller = this.db.getSellerById(sellerId);

    if (!client) {
      console.log("\nCliente não encontrado.");
      return null;
    }

    if (!stock) {
      console.log("\nSneaker não encontrado no estoque.");
      return null;
    }

    if (!seller) {
    console.log("\nVendedor não encontrado.");
    return null;
    }

    const sneaker = stock.getSneaker();
    const address = client.getAddresses()[0];

    return new Sale(sneaker, client, address, stock, seller);
  }
}
