export default class Sneaker {
    private static nextId: number = 1;
    private id: number = 0;
    private brand: string = "";
    private model: string = "";
    private price: number = 0;
    private colors: string = "";
    private gender: string = "";
    private sizes: number[];
    private releaseDate: string;
    private discountPercentage: number = 0;
    
    constructor(
        brand: string,
        model: string,
        price: number,
        colors: string,
        gender: string,
        sizes: number[],
        releaseDate: string,
    ) {
        this.id = Sneaker.nextId++;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.colors = colors;
        this.gender = gender;
        this.sizes = sizes;
        this.releaseDate = releaseDate;
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

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public setModel(model: string): void {
        this.model = model;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getColors(): string {
        return this.colors;
    }

    public getGender(): string {
        return this.gender;
    }

    public getSizes(): number[] {
        return this.sizes;
    }

    public getReleaseDate(): string {
        return this.releaseDate;
    }

    public setColors(colors: string): void {
        this.colors = colors;
    }

    public setGender(gender: string): void {
        this.gender = gender;
    }

    public setSizes(sizes: number[]): void {
        this.sizes = sizes;
    }

    public setReleaseDate(releaseDate: string): void {
        this.releaseDate = releaseDate;
    }

    public applyDiscount(discount: number): void {
        this.discountPercentage = discount;
    }

    public getDiscountPrice(): number {
        let originalPrice = this.getPrice();
        if (this.discountPercentage > 0) {
            let discountAmount = (this.discountPercentage / 100) * originalPrice;
            return originalPrice - discountAmount; 
        }
        return originalPrice;
    }

    public getInfo(): string {
        let sneaker = `ID do Produto: ${this.getId()} | Nome: ${this.getBrand()} ${this.getModel()} | Cores: ${this.getColors()} | Gênero: ${this.getGender()} | Tamanhos: ${this.getSizes()} | Data de Lançamento: ${this.getReleaseDate()} | Preço: ${this.getPrice()}`;
        if (this.discountPercentage > 0) {
            sneaker += ` | Desconto: ${this.discountPercentage}% | Preço com Desconto: ${this.getPrice().toFixed(2)}`;
        } 
        return sneaker;
    }
}
