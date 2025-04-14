import promptSync from 'prompt-sync';
import MainController from '../control/MainController';
import ClientRegister from './ClientRegister';

export default class MainScreen {
    private prompt = promptSync();
    private control: MainController;
    private clientRegister: ClientRegister;

    constructor(control: MainController) {
        this.control = control;
        this.clientRegister = new ClientRegister(control);
        this.mainMenu();
    }

    public mainMenu(): void {
        let continues: boolean = true;
        while (continues) {
            console.clear();
            let choice = parseInt(this.prompt(
                "\nEscolha:\n" +
                " 1. Cadastro de Tênis\n" +
                " 2. Cadastro de Cliente\n" +
                " 3. Criar Pedidos\n" +
                " 4. Listar Produtos\n" +
                " 5. Ver Histórico de Produtos\n" +
                " 6. Ver Lista de Clientes\n" +
                " 7. Sair\n> "
            ));

            switch (choice) {
                case 1:
                    console.log("\nVocê escolheu: Cadastro de Tênis\n");
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 2:
                    this.clientRegister.addClient();
                    this.prompt("\nPressione ENTER para continuar...\n");
                    break;
                case 3:
                    console.log("\nVocê escolheu: Criar Pedidos\n");
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 4:
                    console.log("\nVocê escolheu: Listar Produtos\n");
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 5:
                    console.log("\nVocê escolheu: Ver Histórico de Produtos\n");
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 6:
                    this.control.db.listAll();
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 7:
                    continues = false;
                    break;
                default:
                    console.log("\nDigite um número válido!\n");
                    this.prompt("Pressione ENTER para continuar...");
                    break;
            }
        }
        console.log("\nSAIU");
    }
}
