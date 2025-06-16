import Address from "./Address";
import Client from "./Client";
import Sneaker from "./Sneaker";
import Stock from "./Stock";
import InvalidAddressException from "../exceptions/InvalidAddressException";
import OutOfStockException from "../exceptions/OutOfStockException";
import Seller from "./Seller";
import { getNextId } from "../utils/IdManager";

export default class Sale {
  private id: number = 0;
  private sneaker: Sneaker;
  private client: Client;
  private deliveryAddress: Address;
  private stock: Stock;
  private seller: Seller;

  constructor(
    sneaker: Sneaker,
    client: Client,
    deliveryAddress: Address,
    stock: Stock,
    seller: Seller
  ) {
    if (!this.isValidDeliveryAddress(client, deliveryAddress)) {
      throw new InvalidAddressException();
    }

    if (!stock.hasEnoughStock(1)) {
      throw new OutOfStockException();
    }

    this.id = getNextId("Sale");
    this.sneaker = sneaker;
    this.client = client;
    this.deliveryAddress = deliveryAddress;
    this.stock = stock;
    this.seller = seller;

    this.stock.removeStock(1);
  }

  public getId(): number {
    return this.id;
  }

  public getSneaker(): Sneaker {
    return this.sneaker;
  }

  public getClient(): Client {
    return this.client;
  }

  public getDeliveryAddress(): Address {
    return this.deliveryAddress;
  }

  public getSeller(): Seller {
  return this.seller;
  }
  
  public setSneaker(sneaker: Sneaker) {
    this.sneaker = sneaker;
  }

  public setClient(client: Client) {
    this.client = client;
  }

  public setDeliveryAddress(address: Address) {
    this.deliveryAddress = address;
  }

  private isValidDeliveryAddress(client: Client, address: Address): boolean {
    return client.getAddresses().some((addr) => addr === address);
  }

  getDeliveryAddressFormatted(): string;
  getDeliveryAddressFormatted(includeReference: boolean): string;
  public getDeliveryAddressFormatted(includeReference: boolean = true): string {
    let address = `${this.deliveryAddress.getAddress()}, ${this.deliveryAddress.getDistrict()}, ${this.deliveryAddress.getCity()} - ${this.deliveryAddress.getState()}, ${this.deliveryAddress.getCountry()}`;
    if (includeReference && this.deliveryAddress.getReference()) {
      address += ` (Referência: ${this.deliveryAddress.getReference()})`;
    }
    return address;
  }

  static fromJSON(json: any): Sale {
    const sneaker = Sneaker.fromJSON(json.sneaker);
    const client = Client.fromJSON(json.client);
    const address = Address.fromJSON(json.deliveryAddress);
    const stock = Stock.fromJSON(json.stock);
    const seller = Seller.fromJSON(json.seller);

    const sale = Object.create(Sale.prototype) as Sale;

    sale.id = json.id;
    sale.sneaker = sneaker;
    sale.client = client;
    sale.deliveryAddress = address;
    sale.stock = stock;
    sale.seller = seller;

    return sale;
  }
}
