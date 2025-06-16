import { getNextId } from "../utils/IdManager";
import Sale from "./Sale";
import User from "./User";
import { UserType } from "./UserType";

export default class Seller extends User {
  private sales: Sale[] = [];
  private balance: number = 0;

  constructor(id: number, name: string, email: string) {
    super(id, name, email, UserType.seller);
  }

  public addSale(sale: Sale, value: number): void {
    this.sales.push(sale);
    this.balance += value;
  }

  public getSales(): Sale[] {
    return this.sales;
  }

  public getBalance(): number {
    return this.balance;
  }

  public displayInfo(): string {
    return `ID: ${this.getId()} | Vendedor: ${this.getName()} | Email: ${this.getEmail()}`;
  }

  static fromJSON(json: any): Seller {
    const seller = new Seller(json.id, json.name, json.email);
    seller.id = json.id;
    seller.balance = json.balance ?? 0;
    seller.sales = (json.sales ?? []).map((saleJson: any) => Sale.fromJSON(saleJson));
    return seller;
  }
}
