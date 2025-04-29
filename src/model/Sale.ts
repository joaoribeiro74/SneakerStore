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

    getFullAddress(): string;
    getFullAddress(includeReference: boolean): string;
    public getFullAddress(includeReference: boolean = true): string {
        let address = `${this.client.getAddress()}, ${this.client.getDistrict()}, ${this.client.getCity()} - ${this.client.getState()}, ${this.client.getCountry()}`;
        if (includeReference && this.client.getReference()) {
            address += ` (Referência: ${this.client.getReference()})`;
        }
        return address;
    }
}