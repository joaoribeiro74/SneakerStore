import Client from "./Client";
import Sneaker from "./Sneaker";

export default class Sale{
    private static nextId: number = 1;
    private id: number = 0;
    private sneaker: Sneaker;
    private client: Client;

    constructor(
        sneaker: Sneaker,
        client: Client,
    ) {
        this.id = Sale.nextId++;
        this.sneaker = sneaker;
        this.client = client;
    }

    public doSale(sneaker: Sneaker, client: Client){
        this.sneaker = sneaker;
        this.client = client;
    }

    public getId(): number{
        return this.id;
    }

    public getSneaker(): Sneaker{
        return this.sneaker;
    }
    
    public getClient(): Client{
        return this.client;
    }

    public setSneaker(sneaker: Sneaker){
        this.sneaker = sneaker;
    }

    public setClient(client: Client) {
        this.client = client;
    }
}