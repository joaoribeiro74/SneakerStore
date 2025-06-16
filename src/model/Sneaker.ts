import { getNextId } from "../utils/IdManager";

export default class Sneaker {
  private id: number;
  private brand: string = "";
  private model: string = "";
  private price: number = 0;
  private colors: string = "";
  private gender: string = "";
  private sizes: number[];
  private releaseDate: string;
  private discountPercentage: number = 0;
  private originalPrice: number;

  constructor(
    id: number,
    brand: string,
    model: string,
    price: number,
    colors: string,
    gender: string,
    sizes: number[],
    releaseDate: string,
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.price = price;
    this.colors = colors;
    this.gender = gender;
    this.sizes = sizes;
    this.releaseDate = releaseDate;
    this.originalPrice = price;
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
    return this.originalPrice;
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

  public setId(id: number): void {
    this.id = id;
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

  public getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  public getDiscountPrice(): number {
    const discountAmount = (this.discountPercentage / 100) * this.originalPrice;
    return parseFloat((this.originalPrice - discountAmount).toFixed(2));
  }

  public applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Desconto deve estar entre 0% e 100%.");
    }
    this.discountPercentage = percentage;
  }

  public getInfo(): string {
    let sneaker = `ID do Produto: ${this.getId()} | Nome: ${this.getBrand()} ${this.getModel()} | Cores: ${this.getColors()} | Gênero: ${this.getGender()} | Tamanhos: ${this.getSizes()} | Data de Lançamento: ${this.getReleaseDate()} | Preço: ${this.getPrice()}`;
    if (this.discountPercentage > 0) {
      sneaker += ` | Desconto: ${
        this.discountPercentage
      }% | Preço com Desconto: ${this.getDiscountPrice().toFixed(2)}`;
    }
    return sneaker;
  }

  static fromJSON(json: any): Sneaker {
    const sneaker = new Sneaker(
      json.id,
      json.brand,
      json.model,
      json.price,
      json.colors,
      json.gender,
      json.sizes,
      json.releaseDate
    );
    sneaker.discountPercentage = json.discountPercentage || 0;
    return sneaker;
  }
}
