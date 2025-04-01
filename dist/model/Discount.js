"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Discount {
    // Construtor com valores opcionais
    constructor(id = 0, productId = 0, discountRate = 0, startDate = new Date(), endDate = new Date()) {
        this.id = 0;
        this.productId = 0;
        this.id = id;
        this.productId = productId;
        this.discountRate = discountRate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    // Getters
    getId() {
        return this.id;
    }
    getProductId() {
        return this.productId;
    }
    getDiscountRate() {
        return this.discountRate;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    // Setters
    setDiscountRate(discountRate) {
        if (discountRate < 0 || discountRate > 1) {
            throw new Error("A taxa de desconto deve estar entre 0 e 1 (0% a 100%).");
        }
        this.discountRate = discountRate;
    }
    setStartDate(startDate) {
        this.startDate = startDate;
    }
    setEndDate(endDate) {
        if (endDate <= this.startDate) {
            throw new Error("A data de término deve ser posterior à data de início.");
        }
        this.endDate = endDate;
    }
    // Verifica se o desconto está ativo
    isDiscountActive() {
        const today = new Date();
        return today >= this.startDate && today <= this.endDate;
    }
    // Aplica o desconto ao preço de um tênis específico
    applyDiscount(sneaker) {
        if (sneaker.getId() === this.productId && this.isDiscountActive()) {
            return sneaker.getPrice() * (1 - this.discountRate);
        }
        return sneaker.getPrice();
    }
}
exports.default = Discount;
