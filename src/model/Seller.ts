import { getNextId } from "../utils/IdManager";
import Sale from "./Sale";
import User from "./User";
import { UserType } from "./UserType";

export default class Seller extends User {
  private sales: Sale[] = [];
  private balance: number = 0;

  constructor(name: string, email: string) {
    super(name, email, UserType.seller);
    this.id = getNextId("Seller");
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
    return `Vendedor: ${this.getName()} | Total de Vendas: ${
      this.sales.length
    } | Saldo: R$ ${this.balance.toFixed(2)}`;
  }
}
