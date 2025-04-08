import Product from "./Product";
import Sale from "./Discount";

export default class SneakersInfo extends Product {
    private colors: string[] = [];
    private gender: string = "";
    private sizes: number[] = [];
    private releaseDate: string = "";
    private promotions: Sale[] = [];

    public getColors(): string[] {
        return this.colors;
    }

    public getGender(): string {
        return this.gender;
    }

    public getReleaseDate(): string {
        return this.releaseDate;
    }

    public getSizes(): number[] {
        return this.sizes;
    }

    public getPromotions(): Sale[] {
        return this.promotions;
    }

    public setColors(colors: string[]): void {
        this.colors = colors;
    }

    public setGender(gender: string): void {
        this.gender = gender;
    }

    public setReleaseDate(releaseDate: string): void {
        this.releaseDate = releaseDate;
    }

    public setSizes(sizes: number[]): void {
        this.sizes = sizes;
    }

    public addColor(color: string): void {
        this.colors.push(color);
    }

    public removeColor(color: string): void {
        this.colors = this.colors.filter(c => c !== color);
    }

    public addSize(size: number): void {
        this.sizes.push(size);
    }

    public removeSize(size: number): void {
        this.sizes = this.sizes.filter(s => s !== size);
    }

    public addPromotion(promotion: Sale): void {
        this.promotions.push(promotion);
    }

    public removePromotion(promotionId: number): void {
        this.promotions = this.promotions.filter(promotion => promotion.getId() !== promotionId);
    }
}
