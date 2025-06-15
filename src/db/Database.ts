import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import PersistenceManager from "../utils/PersistenceManager";

export default class Database {
  private clientDb: Client[] = [];
  private sellerDb: Seller[] = [];
  private sneakerDb: Sneaker[] = [];
  private saleDb: Sale[] = [];
  private stockDb: Stock[] = [];

  private clientStorage = new PersistenceManager<Client>("clients.json");
  private sellerStorage = new PersistenceManager<Seller>("sellers.json");
  private sneakerStorage = new PersistenceManager<Sneaker>("sneakers.json");
  private saleStorage = new PersistenceManager<Sale>("sales.json");
  private stockStorage = new PersistenceManager<Stock>("stock.json");

  constructor() {
    this.clientDb = this.clientStorage.loadData();
    this.sellerDb = this.sellerStorage.loadData();
    this.sneakerDb = this.sneakerStorage.loadData();
    this.saleDb = this.saleStorage.loadData();
    this.stockDb = this.stockStorage.loadData();
  }

  public addNewClient(client: Client): void {
    this.clientDb.push(client);
    this.clientStorage.saveData(this.clientDb);
  }

  public updateClient(updatedClient: Client): void {
    const index = this.clientDb.findIndex(client => client.getId() === updatedClient.getId());

    if (index === -1) {
      throw new Error("Client not found");
    }

    this.clientDb[index] = updatedClient;
    this.clientStorage.saveData(this.clientDb);
  }

  public getClientById(id: number): Client | null {
    return this.clientDb.find((client) => client.getId() === id) || null;
  }

  public addNewSeller(seller: Seller): void {
    this.sellerDb.push(seller);
    this.sellerStorage.saveData(this.sellerDb);
  }

  public updateSeller(updatedSeller: Seller): void {
    const index = this.sellerDb.findIndex(seller => seller.getId() === updatedSeller.getId());
    if (index === -1) throw new Error("Seller not found");
    this.sellerDb[index] = updatedSeller;
    this.sellerStorage.saveData(this.sellerDb);
  }

  public getSellerById(id: number): Seller | null {
    return this.sellerDb.find((seller) => seller.getId() === id) || null;
  }

  public addNewSneaker(sneaker: Sneaker): void {
    this.sneakerDb.push(sneaker);
    this.sneakerStorage.saveData(this.sneakerDb);
  }

  public getSneakerById(id: number): Sneaker | null {
    return this.sneakerDb.find((sneaker) => sneaker.getId() === id) || null;
  }

  public addNewSale(sale: Sale) {
    this.saleDb.push(sale);
    this.saleStorage.saveData(this.saleDb);
  }

  public addNewStock(stock: Stock): void {
    this.stockDb.push(stock);
    this.stockStorage.saveData(this.stockDb);
  }

  public getStockBySneakerId(id: number): Stock | null {
    const stock = this.stockDb.find(
      (stock) => stock.getSneaker().getId() === id
    );
    return stock || null;
  }

  public findClientByEmail(email: string): Client | undefined {
    return this.clientDb.find((client: Client) => client.getEmail() === email);
  }

  public findSellerByEmail(email: string): Seller | undefined {
    return this.sellerDb.find((seller: Seller) => seller.getEmail() === email);
  }

  public findSneakerById(id: number): Sneaker | undefined {
    return this.sneakerDb.find((sneaker: Sneaker) => sneaker.getId() === id);
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
