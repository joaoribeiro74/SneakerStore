export default class InvalidAddressException extends Error {
  constructor(message = "Endereço de entrega inválido. Escolha um endereço cadastrado.") {
    super(message);
    this.name = "InvalidAddressException";
  }
}
