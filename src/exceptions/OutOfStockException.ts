export default class OutOfStockException extends Error {
  constructor(message = "Estoque insuficiente para o produto.") {
    super(message);
    this.name = "OutOfStockException";
  }
}
