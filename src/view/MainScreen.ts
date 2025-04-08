import promptSync from 'prompt-sync';
import Register from './Register';
import ClientController from '../control/ClientController';

export default class MainScreen {
    private prompt = promptSync();
    private clientController = new ClientController();
    private register = new Register(this.clientController);

    constructor() {
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
                    try {
                      this.register.registerClient();
                    } catch (error: any) {
                      console.log(`Erro: ${error.message}`);
                    }
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
                    this.clientController.listClients();
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
