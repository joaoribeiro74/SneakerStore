import Sneaker from "./Sneaker";

export default class Stock {
  private sneakerId: number;
  private sneaker?: Sneaker;
  private quantity: number;

  constructor(sneakerId: number, quantity: number) {
    this.sneakerId = sneakerId;
    this.quantity = quantity;
  }

  public setSneaker(sneaker: Sneaker) {
    this.sneaker = sneaker;
  }

  public getSneaker(): Sneaker {
    if (!this.sneaker) {
      throw new Error("Sneaker não carregado. Use setSneaker ou carregue do banco.");
    }
    return this.sneaker;
  }

  public getSneakerId(): number {
    return this.sneakerId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public updateQuantity(newQuantity: number): void {
    if (newQuantity < 0) {
      throw new Error("A quantidade não pode ser negativa.");
    }
    this.quantity = newQuantity;
  }

  public removeStock(amount: number): void {
    if (amount < 0) {
      throw new Error("A quantidade a ser removida não pode ser negativa.");
    }
    if (this.quantity < amount) {
      throw new Error("Quantidade insuficiente no estoque.");
    }
    this.quantity -= amount;
  }

  public hasEnoughStock(amount: number): boolean {
    return this.quantity >= amount;
  }

  public toJSON() {
    return {
      sneakerId: this.sneakerId,
      quantity: this.quantity,
    };
  }

  static fromJSON(json: any, sneaker?: Sneaker): Stock {
    const stock = new Stock(json.sneakerId, json.quantity);
    if (sneaker) {
      stock.setSneaker(sneaker);
    }
    return stock;
  }
}
