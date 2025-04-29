import Database from "../db/Database";
import Client from "../model/Client";
import Sale from "../model/Sale";
import Sneaker from "../model/Sneaker";
import MainScreen from "../view/MainScreen";

export default class MainController{
    public db: Database = new Database();

    constructor(){
       new MainScreen(this);
    }

    public getNewClient(clientName: string, clientEmail: string, cep: string, city: string, state: string, country: string, district: string, address: string, reference: string): Client {
        return new Client(clientName, clientEmail, cep, city, state, country, district, address, reference!);
    }

    public getNewSneaker(brand: string, model: string, price: number, stock: number, colors: string, gender: string, sizes: number[], releaseDate: string): Sneaker {
        return new Sneaker(brand, model, price, stock, colors, gender, sizes, releaseDate);
    }

    public getNewSale(sneakerId: number, clientId: number): Sale | null {
        let client = this.db.getClientById(clientId);
        let sneaker = this.db.getSneakerById(sneakerId);

        if (!client) {
            console.log("\nCliente não encontrado.");
            return null;
        }

        if (!sneaker) {
            console.log("\nSneaker não encontrado.");
            return null;
        }

        return new Sale(sneaker, client); 
    }
}