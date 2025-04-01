"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, clientId) {
        this.id = 0;
        this.clientId = 0;
        this.products = [];
        this.id = id;
        this.clientId = clientId;
        this.products = [];
    }
    getId() {
        return this.id;
    }
    getClientId() {
        return this.clientId;
    }
    getProducts() {
        return this.products;
    }
    setId(id) {
        this.id = id;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
    addProduct(product) {
        if (product) {
            this.products.push(product);
        }
        else {
            throw new Error("Produto inválido");
        }
    }
    setProducts(products) {
        if (products.length > 0) {
            this.products = products;
        }
        else {
            throw new Error("A lista de produtos não pode estar vazia");
        }
    }
    getOrderSummary() {
        const productNames = this.products.map(product => product.getProductName()).join(", ");
        return `Pedido ID: ${this.id}\nCliente ID: ${this.clientId}\nProdutos: ${productNames}`;
    }
}
exports.default = Order;
