export default class Product {
    private id: number = 0;
    private brand: string = "";
    private name: string = "";
    private price: number = 0;
    private stock: number = 0;
    
    public getId(): number {
        return this.id;
    }

    public getBrand(): string {
        return this.brand;
    }

    public getProductName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getStock(): number {
        return this.stock;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public setProductName(productName: string): void {
        this.name = productName;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public addStock(quantity: number): void {
        this.stock += quantity;
    }

    public removeStock(quantity: number): void {
        if (quantity <= this.stock) {
            this.stock -= quantity;
        } else {
            console.log(`Quantidade insuficiente em estoque para remover ${quantity} unidades.`);
        }
    }

    public checkStock(): number {
        return this.stock;
    }
}
