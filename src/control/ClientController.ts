import Client from "../model/Client";

export default class ClientController {
    private clients: Client[] = [];

    public addClient(client: Client): void {
        this.clients.push(client);
    }

    public listClients(): void {
        if (this.clients.length > 0) {
            console.log("Clientes cadastrados:");
            this.clients.forEach(client => {
                console.log(`ID: ${client.getId()} | Nome: ${client.getClientName()} | Email: ${client.getClientEmail()}`);
            });
        } else {
            console.log("Nenhum cliente cadastrado.");
        }
    }

    public getClientById(clientId: number): Client | undefined {
        const client = this.clients.find(c => c.getId() === clientId); // Comparar o ID, não o nome
        if (client) {
            console.log(`Cliente encontrado: ${client.getClientName()}`);
            return client;
        } else {
            console.log("Cliente não encontrado.");
            return undefined;
        }
    }

    public updateClient(clientId: number, updatedClient: Client): void {
        const index = this.clients.findIndex(c => c.getId() === clientId); // Comparar o ID, não o nome
        if (index !== -1) {
            this.clients[index] = updatedClient;
            console.log(`Cliente ID ${clientId} atualizado com sucesso.`);
        } else {
            console.log("Cliente não encontrado.");
        }
    }
}
