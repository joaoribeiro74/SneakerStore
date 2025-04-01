"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientController {
    constructor() {
        this.clients = [];
    }
    addClient(client) {
        this.clients.push(client);
        console.log(`Cliente ${client.getClientName()} cadastro com sucesso.`);
    }
    listClients() {
        if (this.clients.length > 0) {
            console.log("Clientes cadastrados:");
            this.clients.forEach(client => {
                console.log(`ID: ${client.getClientName()}, Email: ${client.getClientEmail()}`);
            });
        }
        else {
            console.log("Nenhum cliente cadastrado.");
        }
    }
    getClientById(clientId) {
        const client = this.clients.find(c => c.getId() === clientId); // Comparar o ID, não o nome
        if (client) {
            console.log(`Cliente encontrado: ${client.getClientName()}`);
            return client;
        }
        else {
            console.log("Cliente não encontrado.");
            return undefined;
        }
    }
    updateClient(clientId, updatedClient) {
        const index = this.clients.findIndex(c => c.getId() === clientId); // Comparar o ID, não o nome
        if (index !== -1) {
            this.clients[index] = updatedClient;
            console.log(`Cliente ID ${clientId} atualizado com sucesso.`);
        }
        else {
            console.log("Cliente não encontrado.");
        }
    }
}
exports.default = ClientController;
