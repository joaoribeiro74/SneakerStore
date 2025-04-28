import Sneaker from "./Sneaker";

export default class SneakersInfo extends Sneaker {
    private colors: string = "";
    private gender: string = "";
    private sizes: number[];
    private releaseDate: string;
    private discountPercentage: number = 0;

    constructor (
        brand: string,
        model: string,
        price: number,
        stock: number,
        colors: string,
        gender: string,
        sizes: number[],
        releaseDate: string,
    ) {
        super(brand, model, price, stock);

        this.colors = colors;
        this.gender = gender;
        this.sizes = sizes;
        this.releaseDate = releaseDate;

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

    public override getPrice(): number {
        let originalPrice = super.getPrice();
        if (this.discountPercentage > 0) {
            let discountAmount = (this.discountPercentage / 100) * originalPrice;
            return originalPrice - discountAmount; 
        }
        return originalPrice;
    }

    public getInfo(): string {
        let sneakerInfo = `ID do Produto: ${super.getId()} | Nome: ${super.getBrand()} ${super.getModel()} | Estoque: ${super.getStock()} | Cores: ${this.getColors()} | Gênero: ${this.getGender()} | Tamanhos: ${this.getSizes()} | Data de Lançamento: ${this.getReleaseDate()}`;
        if (this.discountPercentage > 0) {
            sneakerInfo += ` | Preço: ${super.getPrice()} | Desconto: ${this.discountPercentage}% | Preço com Desconto: ${this.getPrice().toFixed(2)}`;
        } else {
            sneakerInfo += ` | Preço: ${super.getPrice()}`;
        }
        return sneakerInfo;
    }
}
