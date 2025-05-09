import Client from "../model/Client";
import Sale from "../model/Sale";
import Sneaker from "../model/Sneaker";

export default class Database{
    private clientDb: Client[] = [];
    private sneakerDb: Sneaker[] = [];
    private saleDb: Sale[] = [];

    public addNewClient(client: Client): void {
        this.clientDb.push(client);
    }

    public getClientById(id: number): Client | null {
        return this.clientDb.find(client => client.getId() === id) || null;
    }

    public addNewSneaker(sneaker: Sneaker): void {
        this.sneakerDb.push(sneaker);
    }

    public getSneakerById(id: number): Sneaker | null {
        return this.sneakerDb.find(sneaker => sneaker.getId() === id) || null;
    }

    public addNewSale(sale: Sale){
        this.saleDb.push(sale);
    }

    public listAllClients(): void {
        console.log("\n--- Lista de Clientes ---\n");

        if (this.clientDb.length === 0) {
            console.log("Nenhum cliente cadastrado.\n");
            return;
        }

        for (const client of this.clientDb) {
            console.log(`ID do Cliente: ${client.getId()} | Nome: ${client.getClientName()} | Email: ${client.getClientEmail()} | Endereço: ${client.getAddress()}, ${client.getDistrict()}, ${client.getCity()} - ${client.getState()}, ${client.getCountry()}`);
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
            console.log(`ID da Venda: ${sale.getId()} | Nome do Comprador: ${sale.getClient().getClientName()} | Sneaker Vendido: ${sale.getSneaker().getBrand()} ${sale.getSneaker().getModel()} | Enviar para: ${sale.getFullAddress()}`);
        }
    }
}