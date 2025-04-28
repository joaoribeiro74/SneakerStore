import Database from "../db/Database";
import Client from "../model/Client";
import MainScreen from "../view/MainScreen";

export default class MainController{
    public db: Database = new Database();

    constructor(){
       new MainScreen(this);
    }

    public getNewClient(clientName: string, clientEmail: string, cep: string, city: string, state: string, country: string, district: string, address: string, reference: string): Client {
        return new Client(clientName, clientEmail, cep, city, state, country, district, address, reference!);
    }
}