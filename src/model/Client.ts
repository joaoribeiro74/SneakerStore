import { getNextId } from "../utils/IdManager";
import Address from "./Address";
import Sale from "./Sale";
import Sneaker from "./Sneaker";
import User from "./User";
import { UserType } from "./UserType";

export default class Client extends User {
  private addresses: Address[] = [];
  private purchaseHistory: Sale[] = [];
  private cart: Sneaker[] = [];

  constructor(id: number, name: string, email: string) {
    super(id, name, email, UserType.client);
  }

  public addAddress(address: Address): void {
    this.addresses.push(address);
  }

  public getAddresses(): Address[] {
    return this.addresses;
  }

  public addPurchase(sale: Sale): void {
    this.purchaseHistory.push(sale);
  }

  public getPurchaseHistory(): Sale[] {
    return this.purchaseHistory;
  }

  public addToCart(sneaker: Sneaker): void {
    this.cart.push(sneaker);
  }

  public getCart(): Sneaker[] {
    return this.cart;
  }

  public clearCart() {
    this.cart = [];
  }

  public displayInfo(): string {
    return `ID: ${this.getId()} | Nome: ${this.getName()} | Email: ${this.getEmail()}\nEndereços:\n${this.getAddresses().map(a => `- ${a.getAddress()}, ${a.getDistrict()}, ${a.getCity()} - ${a.getState()}, ${a.getCountry()}`).join("\n")}`;
  }

  static fromJSON(json: any): Client {
    const client = new Client(json.id, json.name, json.email);
    client.id = json.id;

    client.addresses = (json.addresses || []).map((addrJson: any) =>
      Address.fromJSON(addrJson)
    );

    client.purchaseHistory = (json.purchaseHistory || []).map((saleJson: any) =>
      Sale.fromJSON ? Sale.fromJSON(saleJson) : saleJson
    );

    client.cart = (json.cart || []).map((sneakerJson: any) =>
      Sneaker.fromJSON ? Sneaker.fromJSON(sneakerJson) : sneakerJson
    );

    return client;
  }
}
