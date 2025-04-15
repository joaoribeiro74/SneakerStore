import promptSync from 'prompt-sync';
import MainController from '../control/MainController';
import ClientRegister from './ClientRegister';
import SneakerRegister from './SneakerRegister';

export default class MainScreen {
    private prompt = promptSync();
    private control: MainController;
    private clientRegister: ClientRegister;
    private sneakerRegister: SneakerRegister;

    constructor(control: MainController) {
        this.control = control;
        this.clientRegister = new ClientRegister(control);
        this.sneakerRegister = new SneakerRegister(control);
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
                " 3. Listar Produtos\n" +
                " 4. Listar Clientes\n" +
                " 5. Criar Pedidos\n" +
                " 6. Histórico de Vendas\n" +
                " 7. Sair\n> "
            ));

            switch (choice) {
                case 1:
                    this.sneakerRegister.addSneaker();
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 2:
                    this.clientRegister.addClient();
                    this.prompt("\nPressione ENTER para continuar...\n");
                    break;
                case 3:
                    this.control.db.listAllSneakers();
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 4:
                    this.control.db.listAllClients();
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 5:
                    console.log("--- Criar Pedidos ---")
                    this.prompt("Pressione ENTER para continuar...");
                    break;
                case 6:
                    this.control.db.listAllSales();
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
