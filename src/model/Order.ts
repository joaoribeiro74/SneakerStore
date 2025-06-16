import { getNextId } from "../utils/IdManager";
import Address from "./Address";
import Client from "./Client";
import Sneaker from "./Sneaker";

export default class Order {
  private id: number;
  private client: Client;
  private items: Sneaker[];
  private deliveryAddress: Address;

  constructor(id: number, client: Client, items: Sneaker[], address: Address) {
    this.id = getNextId("Order");
    this.id = id;
    this.client = client;
    this.items = items;
    this.deliveryAddress = address;
  }

  public getId() {
    return this.id;
  }
  public getClient() {
    return this.client;
  }
  public getItems() {
    return this.items;
  }
  public getDeliveryAddress() {
    return this.deliveryAddress;
  }

  static fromJSON(json: any): Order {
    const client = Client.fromJSON(json.client);
    const items = (json.items || []).map((itemJson: any) => Sneaker.fromJSON(itemJson));
    const address = Address.fromJSON(json.deliveryAddress);
    return new Order(json.id, client, items, address);
  }
}
