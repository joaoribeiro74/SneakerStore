import Address from "./Address";
import Client from "./Client";
import Sneaker from "./Sneaker";

export default class Order {
  private id: number;
  private client: Client;
  private items: Sneaker[];
  private deliveryAddress: Address;

  constructor(id: number, client: Client, items: Sneaker[], address: Address) {
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
}
