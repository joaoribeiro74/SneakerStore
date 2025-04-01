import promptSync from "prompt-sync";
import ClientController from "../control/ClientController";
import Client from "../model/Client";

export default class Register {
    private clientController: ClientController;
    private prompt = promptSync();

    constructor() {
        this.clientController = new ClientController();
    }

    public registerClient(): void {
        console.log("\n--- Cadastro de Cliente ---");

        const clientName = this.getInput("Digite o nome do cliente:");
        const clientEmail = this.getInput("Digite o e-mail do cliente:");
        const cep = this.getInput("Digite o CEP do cliente:");
        const city = this.getInput("Digite a cidade do cliente:");
        const state = this.getInput("Digite o estado do cliente:");
        const country = this.getInput("Digite o país do cliente:");
        const district = this.getInput("Digite o bairro do cliente:");
        const address = this.getInput("Digite o endereço do cliente:");
        const addressNumber = this.getNumericInput("Digite o número do endereço:");

        try {
            const newClient = new Client(clientName, clientEmail, cep, city, state, country, district, address, addressNumber);
            this.clientController.addClient(newClient);
            console.log(`Cliente ${newClient.getClientName()} cadastrado com sucesso!`);
        } catch (error) {
            console.log("Erro ao cadastrar cliente");
        }
    }

    private getInput(prompt: string): string {
        const input = this.prompt(prompt);
        if (!input || input.trim().length === 0) {
            throw new Error("Este campo é obrigatório.");
        }
        return input.trim();
    }

    private getNumericInput(prompt: string): number {
        const input = this.prompt(prompt);
        const numericInput = Number(input);
        if (isNaN(numericInput) || numericInput <= 0) {
            throw new Error("Valor inválido. O número deve ser maior que 0.");
        }
        return numericInput;
    }
}
