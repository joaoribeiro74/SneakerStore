"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleHistory {
    constructor(saleId, orderId, clientId, products, discountApplied) {
        this.saleId = 0;
        this.orderId = 0;
        this.clientId = 0;
        this.products = [];
        this.totalAmount = 0;
        this.discountApplied = 0;
        this.saleDate = new Date();
        this.saleId = saleId;
        this.orderId = orderId;
        this.clientId = clientId;
        this.products = products;
        this.discountApplied = discountApplied;
        this.calculateTotalAmount();
    }
    // Getter Methods
    getSaleId() {
        return this.saleId;
    }
    getOrderId() {
        return this.orderId;
    }
    getClientId() {
        return this.clientId;
    }
    getProducts() {
        return this.products;
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    getDiscountApplied() {
        return this.discountApplied;
    }
    getSaleDate() {
        return this.saleDate;
    }
    // Setter Methods
    setSaleId(saleId) {
        this.saleId = saleId;
    }
    setOrderId(orderId) {
        this.orderId = orderId;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
    setProducts(products) {
        this.products = products;
        this.calculateTotalAmount();
    }
    setDiscountApplied(discount) {
        this.discountApplied = discount;
        this.calculateTotalAmount();
    }
    calculateTotalAmount() {
        let amount = 0;
        this.products.forEach(product => {
            amount += product.getPrice();
        });
        this.totalAmount = amount * (1 - this.discountApplied);
    }
    getSaleSummary() {
        const productNames = this.products.map(product => product.getProductName()).join(", ");
        return `Sale ID: ${this.saleId}\nOrder ID: ${this.orderId}\nClient ID: ${this.clientId}\nProducts: ${productNames}\nTotal Amount: $${this.totalAmount.toFixed(2)}\nDiscount Applied: ${(this.discountApplied * 100).toFixed(2)}%\nSale Date: ${this.saleDate.toISOString().split('T')[0]}`;
    }
}
exports.default = SaleHistory;
