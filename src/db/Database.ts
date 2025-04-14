import Client from "../model/Client";

export default class Database{
    private clientDb: Client[] = [];

    public addNewClient(client: Client): void {
        this.clientDb.push(client);
    }

    // public getClientById(id: number): Client | null {
    //    return this.clientDb.find(client => client.getId() === id) || null;
    //}

    public listAll(): void {
        console.log("\n--- Lista de Clientes ---\n");

        if (this.clientDb.length === 0) {
            console.log("Nenhum cliente cadastrado.\n");
            return;
        }

        for (const client of this.clientDb) {
            console.log(`ID: ${client.getId()} | Nome: ${client.getClientName()} | Email: ${client.getClientEmail()}`);
        }
    }
}