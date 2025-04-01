"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor() {
        this.id = 0;
        this.brand = "";
        this.name = "";
        this.price = 0;
        this.stock = 0;
    }
    getId() {
        return this.id;
    }
    getBrand() {
        return this.brand;
    }
    getProductName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getStock() {
        return this.stock;
    }
    setId(id) {
        this.id = id;
    }
    setBrand(brand) {
        this.brand = brand;
    }
    setProductName(productName) {
        this.name = productName;
    }
    setPrice(price) {
        this.price = price;
    }
    setStock(stock) {
        this.stock = stock;
    }
    addStock(quantity) {
        this.stock += quantity;
    }
    removeStock(quantity) {
        if (quantity <= this.stock) {
            this.stock -= quantity;
        }
        else {
            console.log(`Quantidade insuficiente em estoque para remover ${quantity} unidades.`);
        }
    }
    checkStock() {
        return this.stock;
    }
}
exports.default = Product;
