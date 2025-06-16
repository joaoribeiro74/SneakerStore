import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import Order from "../model/Order";
import PersistenceManager from "../utils/PersistenceManager";
import User from "../model/User";

export default class Database {
  private clientDb: Client[] = [];
  private sellerDb: Seller[] = [];
  private sneakerDb: Sneaker[] = [];
  private saleDb: Sale[] = [];
  private stockDb: Stock[] = [];
  private orderDb: Order[] = [];

  private clientStorage = new PersistenceManager<Client>("clients.json", Client);
  private sellerStorage = new PersistenceManager<Seller>("sellers.json", Seller);
  private sneakerStorage = new PersistenceManager<Sneaker>("sneakers.json", Sneaker);
  private saleStorage = new PersistenceManager<Sale>("sales.json", Sale);
  private stockStorage = new PersistenceManager<Stock>("stock.json", Stock);
  private orderStorage = new PersistenceManager<Order>("orders.json", Order);

  constructor() {
    this.clientDb = this.clientStorage.loadData();
    this.sellerDb = this.sellerStorage.loadData();
    this.sneakerDb = this.sneakerStorage.loadData();
    this.saleDb = this.saleStorage.loadData();
    this.stockDb = this.stockStorage.loadData();
    this.orderDb = this.orderStorage.loadData();
  }

  public addNewClient(client: Client): void {
    this.clientDb.push(client);
    this.clientStorage.saveData(this.clientDb);
  }

  public updateClient(updatedClient: Client): void {
    const index = this.clientDb.findIndex(
      (client) => client.getId() === updatedClient.getId()
    );

    if (index === -1) {
      throw new Error("Cliente não encontrado.");
    }

    this.clientDb[index] = updatedClient;
    this.clientStorage.saveData(this.clientDb);
  }

  public addNewSeller(seller: Seller): void {
    this.sellerDb.push(seller);
    this.sellerStorage.saveData(this.sellerDb);
  }

  public updateSeller(updatedSeller: Seller): void {
    const index = this.sellerDb.findIndex(
      (seller) => seller.getId() === updatedSeller.getId()
    );
    if (index === -1) throw new Error("Vendedor não encontrado");
    this.sellerDb[index] = updatedSeller;
    this.sellerStorage.saveData(this.sellerDb);
  }

  public addNewSneaker(sneaker: Sneaker): void {
    this.sneakerDb.push(sneaker);
    this.sneakerStorage.saveData(this.sneakerDb);
  }

  public getSneakerById(id: number): Sneaker | null {
    return this.sneakerDb.find((sneaker) => sneaker.getId() === id) || null;
  }

  public removeSneakerById(id: number): void {
    this.sneakerDb = this.sneakerDb.filter((sneaker) => sneaker.getId() !== id);
    this.sneakerStorage.saveData(this.sneakerDb);
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

  public removeStockBySneakerId(sneakerId: number): void {
    this.stockDb = this.stockDb.filter(
      (stock) => stock.getSneaker().getId() !== sneakerId
    );
    this.stockStorage.saveData(this.stockDb);
  }

  public getAllOrders(): Order[] {
    return this.orderDb;
  }

  public addOrder(order: Order): void {
    this.orderDb.push(order);
    this.orderStorage.saveData(this.orderDb);
  }

  public removeOrder(orderId: number): boolean {
    const index = this.orderDb.findIndex(order => order.getId() === orderId);
    
    if (index === -1) {
      return false; // Pedido não encontrado
    }

    this.orderDb.splice(index, 1);
    this.orderStorage.saveData(this.orderDb);
    return true; // Pedido removido com sucesso
  }

  public findUserByEmail(email: string): User | undefined {
    const lowerEmail = email.toLowerCase();

    const client = this.clientDb.find(
      (c: Client) => c.getEmail().toLowerCase() === lowerEmail
    );

    if (client) return client;

    const seller = this.sellerDb.find(
      (s: Seller) => s.getEmail().toLowerCase() === lowerEmail
    );

    return seller;
  }

  public findSneakerById(id: number): Sneaker | undefined {
    return this.sneakerDb.find((sneaker: Sneaker) => sneaker.getId() === id);
  }
  
  public listAllSneakers(): void {
    console.log("--- Lista de Sneakers ---\n");

    if (this.sneakerDb.length === 0) {
      console.log("Nenhum sneaker cadastrado.");
      return;
    }

    for (const sneaker of this.sneakerDb) {
      console.log(sneaker.getInfo());
    }
  }
  public listSalesBySeller(sellerId: number): void {
    console.log("\n--- Vendas Realizadas por Este Vendedor ---\n");

    const sales = this.saleDb.filter(
      (sale) => sale.getSeller().getId() === sellerId
    );

    if (sales.length === 0) {
      console.log("Nenhuma venda encontrada para este vendedor.");
      return;
    }

    for (const sale of sales) {
      console.log(
        `ID da Venda: ${sale.getId()} | Comprador: ${sale
          .getClient()
          .getName()} | Tênis: ${sale.getSneaker().getBrand()} ${sale
          .getSneaker()
          .getModel()} | Envio: ${sale.getDeliveryAddressFormatted()}`
      );
    }
  }
}
