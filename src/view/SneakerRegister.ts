import PromptSync from "prompt-sync";
import MainController from "../control/MainController";
import Sneaker from "../model/Sneaker";

export default class SneakerRegister{
    private prompt = PromptSync();
    private control: MainController;

    constructor(control: MainController) {
        this.control = control;
    }

    public addSneaker(): void {
        console.log("\n--- Cadastro de Sneakers ---");

        let brand = this.getInput("Marca: ");
        let model = this.getInput("Modelo: ");
        let price = parseFloat(this.getValidPriceInput("Preço: "));
        let stock = parseInt(this.getInput("Estoque: "));

        let sneaker = new Sneaker(brand, model, price, stock);
        this.control.db.addNewSneaker(sneaker);
        console.log(`\nSneaker ${sneaker.getBrand()} ${sneaker.getModel()} cadastrado com sucesso!\n`);
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

    private getValidPriceInput(promptText: string): string {
        const priceRegex = /^\d+([.,]\d{1,2})?$/;
    
        while (true) {
            const input = this.prompt(promptText).trim();
    
            if (priceRegex.test(input)) {
                return input.replace(",", "."); // normaliza para ponto
            }
    
            console.log("Preço inválido. Use o formato 100 ou 100.99 (máximo 2 casas decimais).");
        }
    }
    
}