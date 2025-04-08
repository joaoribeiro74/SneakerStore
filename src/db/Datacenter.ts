import SneakersInfo from "../model/SneakersInfo";
import Register from "../view/Register";
import Client from "../model/Client";
import Order from "../model/Order";
import Product from "../model/Product";
import Sale from "../model/Discount";

export default class Datacenter{
    public ProductInfo: SneakersInfo[] = [];

    public addNewSneaker(sneaker: SneakersInfo): void{
        this.ProductInfo.push(sneaker);
    }

    public removeSneaker(id: number): void{
        this.ProductInfo.splice(id, 1);
    }

    getProductById(productId: number): SneakersInfo | undefined {
        return this.ProductInfo.find(product => product.getId() === productId);
    }


    public addPromotionToSneaker(sneakerId: number, promotion: Sale): void {
        const sneaker = this.getProductById(sneakerId);
        if (sneaker) {
            sneaker.addPromotion(promotion);
        } else {
            console.log("Produto não encontrado.");
        }
    }

    public removePromotionFromSneaker(sneakerId: number, promotionId: number): void {
        const sneaker = this.getProductById(sneakerId);
        if (sneaker) {
            sneaker.removePromotion(promotionId);
        } else {
            console.log("Produto não encontrado.");
        }
    }

    public getAllPromotions(): Sale[] {
        const promotions: Sale[] = [];
        this.ProductInfo.forEach(sneaker => {
            promotions.push(...sneaker.getPromotions());
        });
        return promotions;
    }


    private clients: Client[] = [];

    public addClient(client: Client): void {
        this.clients.push(client);
    }


    private orders: Order[] = [];

    public addOrder(order: Order): void{
        this.orders.push(order);
    }

    
    public getAllOrders(): Order[] {
        return this.orders
    }



}