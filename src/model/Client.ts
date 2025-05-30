import Address from "./Address";
import Sale from "./Sale";
import User from "./User";
import { UserType } from "./UserType";

export default class Client extends User {
  private static nextId: number = 1;
  private addresses: Address[] = [];
  private purchaseHistory: Sale[] = [];

  constructor(name: string, email: string) {
    super(name, email, UserType.client);
    this.id = Client.nextId++;
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

  public displayInfo(): string {
    return `ID do Cliente: ${this.getId()} | Nome: ${this.getName()} | Email: ${this.getEmail()}`;
  }
}
