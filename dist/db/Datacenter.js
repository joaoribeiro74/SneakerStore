"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Datacenter {
    constructor() {
        this.ProductInfo = [];
        this.clients = [];
        this.orders = [];
    }
    addNewSneaker(sneaker) {
        this.ProductInfo.push(sneaker);
    }
    removeSneaker(id) {
        this.ProductInfo.splice(id, 1);
    }
    getProductById(productId) {
        return this.ProductInfo.find(product => product.getId() === productId);
    }
    addPromotionToSneaker(sneakerId, promotion) {
        const sneaker = this.getProductById(sneakerId);
        if (sneaker) {
            sneaker.addPromotion(promotion);
        }
        else {
            console.log("Produto não encontrado.");
        }
    }
    removePromotionFromSneaker(sneakerId, promotionId) {
        const sneaker = this.getProductById(sneakerId);
        if (sneaker) {
            sneaker.removePromotion(promotionId);
        }
        else {
            console.log("Produto não encontrado.");
        }
    }
    getAllPromotions() {
        const promotions = [];
        this.ProductInfo.forEach(sneaker => {
            promotions.push(...sneaker.getPromotions());
        });
        return promotions;
    }
    addClient(client) {
        this.clients.push(client);
    }
    addOrder(order) {
        this.orders.push(order);
    }
    getAllOrders() {
        return this.orders;
    }
}
exports.default = Datacenter;
