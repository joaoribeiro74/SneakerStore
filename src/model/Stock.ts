import Sneaker from "./Sneaker";

export default class Stock {
  private sneaker: Sneaker;
  private quantity: number;

  constructor(sneaker: Sneaker, quantity: number) {
    this.sneaker = sneaker;
    this.quantity = quantity;
  }

  public getSneaker(): Sneaker {
    return this.sneaker;
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
}
