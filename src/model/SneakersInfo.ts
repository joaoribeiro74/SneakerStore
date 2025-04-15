import Sneaker from "./Sneaker";

export default class SneakersInfo extends Sneaker {
    private colors: string = "";
    private gender: string = "";
    private sizes: number[];
    private releaseDate: string;

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
}
