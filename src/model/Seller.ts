import Sale from "./Sale";
import User, { UserType } from "./User";

export default class Seller extends User {
    private sales: Sale[] = [];
    private balance: number = 0;

    constructor(name: string, email: string) {
        super(name, email, UserType.seller);
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
}