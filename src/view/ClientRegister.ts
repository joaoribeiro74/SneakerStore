import promptSync from "prompt-sync";
import Client from "../model/Client";
import MainController from "../control/MainController";

export default class ClientRegister {
    private prompt = promptSync();
    private control: MainController;

    constructor(control: MainController) {
        this.control = control;
    }

    public addClient(): void {
        console.log("\n--- Cadastro de Cliente ---");

        let clientName = this.getInput("Nome: ");
        let clientEmail = this.getValidEmailInput("E-mail: ");
        let country = this.getInput("País: ");
        let cep = this.getValidCepInput("CEP: ");
        let state = this.getValidStateInput("Estado (Sigla): ");
        let city = this.getInput("Cidade: ");
        let district = this.getInput("Bairro: ");
        let address = this.getInput("Endereço: ");
        let reference = this.getOptionalInput("Referência (Opcional): ");

        let client = new Client(clientName, clientEmail, cep, city, state, country, district, address, reference!);
        this.control.db.addNewClient(client);
        console.log(`\nCliente ${client.getClientName()} cadastrado com sucesso!`);
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
