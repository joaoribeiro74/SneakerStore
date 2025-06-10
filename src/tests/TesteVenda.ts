// src/testes/testeVenda.ts
import Client from "../model/Client";
import Address from "../model/Address";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import Sale from "../model/Sale";
import InvalidAddressException from "../exceptions/InvalidAddressException";
import OutOfStockException from "../exceptions/OutOfStockException";
import Seller from "../model/Seller";

const client = new Client("Carlos", "carlos@email.com");
const address = new Address("00000-000", "Cidade", "UF", "Brasil", "Bairro", "Rua A, 123", "Referência");

const sneaker = new Sneaker("Nike", "Air Jordan 4", 1599, "Branco e Azul", "Masculino", [40], "24-03-2025");
const stock = new Stock(sneaker, 5);

const seller = new Seller("Fernanda", "fernanda@email.com");
console.log("🔍 Vendedor criado:", seller.displayInfo());

client.addAddress(address);

try {
  const sale = new Sale(sneaker, client, address, stock, seller);

  console.log("✅ Venda criada com sucesso:", sale.getId());
  console.log("📊 Vendedor após a venda:", seller.displayInfo());
} catch (error) {
  if (error instanceof InvalidAddressException) {
    console.error("❌ " + error.message);
  } else if (error instanceof OutOfStockException) {
    console.error("❌ " + error.message);
  } else {
    console.error("❌ Erro inesperado:", error);
  }
}
