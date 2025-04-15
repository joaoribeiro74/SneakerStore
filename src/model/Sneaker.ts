export default class Sneaker {
    private static nextId: number = 1;
    private id: number = 0;
    private brand: string = "";
    private model: string = "";
    private price: number = 0;
    private stock: number = 0;
    
    constructor(
        brand: string,
        model: string,
        price: number,
        stock: number,
    ) {
        this.id = Sneaker.nextId++;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.stock = stock;
    }

    public getId(): number {
        return this.id;
    }

    public getBrand(): string {
        return this.brand;
    }

    public getModel(): string {
        return this.model;
    }

    public getPrice(): number {
        return this.price;
    }

    public getStock(): number {
        return this.stock;
    }

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public setModel(model: string): void {
        this.model = model;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }
}
