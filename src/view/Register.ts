import promptSync from "prompt-sync";
import ClientController from "../control/ClientController";
import Client from "../model/Client";

export default class Register {
    private clientController: ClientController;
    private prompt = promptSync();

    constructor(clientController: ClientController) {
        this.clientController = clientController;
    }

    public registerClient(): void {
        console.log("\n--- Cadastro de Cliente ---");

        const clientName = this.getInput("Nome: ");
        const clientEmail = this.getValidEmailInput("E-mail: ");
        const country = this.getInput("País: ");
        const cep = this.getValidCepInput("CEP: ");
        const state = this.getValidStateInput("Estado (Sigla): ");
        const city = this.getInput("Cidade: ");
        const district = this.getInput("Bairro: ");
        const address = this.getInput("Endereço: ");
        const reference = this.getOptionalInput("Referência (Opcional): ");

        try {
            const newClient = new Client(clientName, clientEmail, cep, city, state, country, district, address, reference!);
            this.clientController.addClient(newClient);
            console.log(`Cliente ${newClient.getClientName()} cadastrado com sucesso!`);
        } catch (error) {
            console.log("Erro ao cadastrar cliente");
        }
    }

    private getInput(promptText: string): string {
        while (true) {
            const input = this.prompt(promptText).trim();
            if (input.length > 0) {
                return input;
            }
            console.log("Este campo é obrigatório.");
        }
    }

    private getValidEmailInput(promptText: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        while (true) {
            const input = this.prompt(promptText).trim();
            if (emailRegex.test(input)) {
                return input;
            }
            console.log("E-mail inválido. Use o formato nome@dominio.com");
        }
    }    

    private getValidCepInput(promptText: string): string {
        const cepRegex = /^\d{5}-?\d{3}$/;
        while (true) {
            const input = this.prompt(promptText).trim();
            if (cepRegex.test(input)) {
                return input;
            }
            console.log("CEP inválido. Use o formato 00000-000 ou 00000000.");
        }
    }

    private getValidStateInput(promptText: string): string {
        const stateRegex = /^[A-Za-z]{2}$/;
    
        while (true) {
            const input = this.prompt(promptText).trim();
    
            if (stateRegex.test(input)) {
                return input.toUpperCase(); // opcional: normaliza pra maiúsculas
            }
    
            console.log("Estado inválido. Digite a sigla com duas letras (ex: SP, RJ, PR).");
        }
    }
    

    private getOptionalInput(promptText: string): string | null {
        const input = this.prompt(promptText).trim();

        return input.length === 0 ? null : input;
    }   
}
