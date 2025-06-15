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

  constructor(name: string, email: string) {
    super(name, email, UserType.client);
    this.id = getNextId("Client");
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
    return `ID do Cliente: ${this.getId()} | Nome: ${this.getName()} | Email: ${this.getEmail()}`;
  }
}
