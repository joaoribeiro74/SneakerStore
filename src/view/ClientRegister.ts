import promptSync from "prompt-sync";
import Client from "../model/Client";
import MainController from "../controller/MainController";
import InputUtils from "../utils/InputUtils";

export default class ClientRegister {
  private prompt = promptSync();
  private control: MainController;

  constructor(control: MainController) {
    this.control = control;
  }

  public addClient(): void {
    console.log("\n--- Cadastro de Cliente ---");

    let clientName = InputUtils.getInput("Nome: ");
    let clientEmail = InputUtils.getValidEmailInput("E-mail: ");
    let country = InputUtils.getInput("País: ");
    let cep = InputUtils.getValidCepInput("CEP: ");
    let state = InputUtils.getValidStateInput("Estado (Sigla): ");
    let city = InputUtils.getInput("Cidade: ");
    let district = InputUtils.getInput("Bairro: ");
    let address = InputUtils.getInput("Endereço: ");
    let reference = InputUtils.getOptionalInput("Referência (Opcional): ");

    try {
      const client: Client = this.control.getNewClient(clientName, clientEmail, cep, city, state, country, district, address, reference!);
      this.control.db.addNewClient(client);
      console.log(`\nCliente ${client.getName()} cadastrado com sucesso!`);
    } catch (err) {
      console.log((err as Error).message);
    }
  }
}
