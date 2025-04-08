import Order from "./Order";
import SneakersInfo from "./SneakersInfo";

export default class SaleHistory {
    private saleId: number = 0;
    private orderId: number = 0;
    private clientId: number = 0;
    private products: SneakersInfo[] = [];
    private totalAmount: number = 0;
    private discountApplied: number = 0;
    private saleDate: Date = new Date();

    constructor(saleId: number, orderId: number, clientId: number, products: SneakersInfo[], discountApplied: number) {
        this.saleId = saleId;
        this.orderId = orderId;
        this.clientId = clientId;
        this.products = products;
        this.discountApplied = discountApplied;
        this.calculateTotalAmount();
    }

    // Getter Methods
    public getSaleId(): number {
        return this.saleId;
    }

    public getOrderId(): number {
        return this.orderId;
    }

    public getClientId(): number {
        return this.clientId;
    }

    public getProducts(): SneakersInfo[] {
        return this.products;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public getDiscountApplied(): number {
        return this.discountApplied;
    }

    public getSaleDate(): Date {
        return this.saleDate;
    }

    // Setter Methods
    public setSaleId(saleId: number): void {
        this.saleId = saleId;
    }

    public setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    public setClientId(clientId: number): void {
        this.clientId = clientId;
    }

    public setProducts(products: SneakersInfo[]): void {
        this.products = products;
        this.calculateTotalAmount();
    }

    public setDiscountApplied(discount: number): void {
        this.discountApplied = discount;
        this.calculateTotalAmount();  
    }

    private calculateTotalAmount(): void {
        let amount = 0;
        this.products.forEach(product => {
            amount += product.getPrice();
        });

        this.totalAmount = amount * (1 - this.discountApplied);
    }

    public getSaleSummary(): string {
        const productNames = this.products.map(product => product.getProductName()).join(", ");
        return `Sale ID: ${this.saleId}\nOrder ID: ${this.orderId}\nClient ID: ${this.clientId}\nProducts: ${productNames}\nTotal Amount: $${this.totalAmount.toFixed(2)}\nDiscount Applied: ${(this.discountApplied * 100).toFixed(2)}%\nSale Date: ${this.saleDate.toISOString().split('T')[0]}`;
    }
}
