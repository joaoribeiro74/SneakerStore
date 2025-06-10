import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";

export default class Database {
  private clientDb: Client[] = [];
  private sellerDb: Seller[] = [];
  private sneakerDb: Sneaker[] = [];
  private saleDb: Sale[] = [];
  private stockDb: Stock[] = [];

  public addNewClient(client: Client): void {
    this.clientDb.push(client);
  }

  public getClientById(id: number): Client | null {
    return this.clientDb.find((client) => client.getId() === id) || null;
  }

  public addNewSeller(seller: Seller): void {
    this.sellerDb.push(seller);
  }

  public getSellerById(id: number): Seller | null {
    return this.sellerDb.find((seller) => seller.getId() === id) || null;
  }

  public addNewSneaker(sneaker: Sneaker): void {
    this.sneakerDb.push(sneaker);
  }

  public getSneakerById(id: number): Sneaker | null {
    return this.sneakerDb.find((sneaker) => sneaker.getId() === id) || null;
  }

  public addNewSale(sale: Sale) {
    this.saleDb.push(sale);
  }

  public addNewStock(stock: Stock): void {
    this.stockDb.push(stock);
  }

  public getStockBySneakerId(id: number): Stock | null {
    const stock = this.stockDb.find(
      (stock) => stock.getSneaker().getId() === id
    );
    return stock || null;
  }

  public listSalesBySeller(sellerId: number): void {
    const filteredSales = this.sales.filter(sale => sale.getSeller().getId() === sellerId);
    if (filteredSales.length === 0) {
      console.log("Nenhuma venda encontrada para este vendedor.");
      return;
    }
    filteredSales.forEach(sale => {
      console.log(sale.getSummary());
    });
  }

  public listAllClients(): void {
    console.log("\n--- Lista de Clientes ---\n");

    if (this.clientDb.length === 0) {
      console.log("Nenhum cliente cadastrado.\n");
      return;
    }

    for (const client of this.clientDb) {
      const address = client.getAddresses()[0];

      console.log(
        `ID do Cliente: ${client.getId()} | Nome: ${client.getName()} | Email: ${client.getEmail()} | Endereço: ${address.getAddress()}, ${address.getDistrict()}, ${address.getCity()} - ${address.getState()}, ${address.getCountry()}`
      );
    }
  }

  public listAllSellers(): void {
    console.log("\n--- Lista de Vendedores ---\n");

    if (this.sellerDb.length === 0) {
      console.log("Nenhum vendedor cadastrado.\n");
      return;
    }

    for (const seller of this.sellerDb) {
      console.log(
        `ID do Vendedor: ${seller.getId()} | Nome: ${seller.getName()} | Email: ${seller.getEmail()} | Balanço: ${seller.getBalance()} | Vendas: ${seller.getSales()}`
      );
    }
  }

  public listAllSneakers(): void {
    console.log("\n--- Lista de Sneakers ---\n");

    if (this.sneakerDb.length === 0) {
      console.log("Nenhum sneaker cadastrado.\n");
      return;
    }

    for (const sneaker of this.sneakerDb) {
      console.log(sneaker.getInfo());
    }
  }

  public listAllSales(): void {
    console.log("\n--- Histórico de Vendas ---\n");

    if (this.saleDb.length === 0) {
      console.log("Nenhuma venda foi feita.");
      return;
    }

    for (const sale of this.saleDb) {
      console.log(
        `ID da Venda: ${sale.getId()} | Nome do Comprador: ${sale
          .getClient()
          .getName()} | Sneaker Vendido: ${sale.getSneaker().getBrand()} ${sale
          .getSneaker()
          .getModel()} | Enviar para: ${sale.getDeliveryAddressFormatted()}`
      );
    }
  }
}
