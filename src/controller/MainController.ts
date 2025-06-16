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

  public getNewSales(client: Client, seller: Seller, sneakers: Sneaker[]): Sale[] {
    const sales: Sale[] = [];

    for (const sneaker of sneakers) {
      const stock = this.db.getStockBySneakerId(sneaker.getId());
      if (!stock) {
        console.log(`\n❌ Estoque não encontrado para o tênis: ${sneaker.getBrand()} ${sneaker.getModel()}`);
        continue;
      }

      const sale = new Sale(sneaker, client, client.getAddresses()[0], stock, seller);
      sales.push(sale);
    }

    return sales;
  }
}
