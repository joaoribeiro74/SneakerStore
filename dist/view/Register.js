"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ClientController_1 = __importDefault(require("../control/ClientController"));
const Client_1 = __importDefault(require("../model/Client"));
class Register {
    constructor() {
        this.prompt = (0, prompt_sync_1.default)();
        this.clientController = new ClientController_1.default();
    }
    registerClient() {
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
            const newClient = new Client_1.default(clientName, clientEmail, cep, city, state, country, district, address, addressNumber);
            this.clientController.addClient(newClient);
            console.log(`Cliente ${newClient.getClientName()} cadastrado com sucesso!`);
        }
        catch (error) {
            console.log("Erro ao cadastrar cliente");
        }
    }
    getInput(prompt) {
        const input = this.prompt(prompt);
        if (!input || input.trim().length === 0) {
            throw new Error("Este campo é obrigatório.");
        }
        return input.trim();
    }
    getNumericInput(prompt) {
        const input = this.prompt(prompt);
        const numericInput = Number(input);
        if (isNaN(numericInput) || numericInput <= 0) {
            throw new Error("Valor inválido. O número deve ser maior que 0.");
        }
        return numericInput;
    }
}
exports.default = Register;
