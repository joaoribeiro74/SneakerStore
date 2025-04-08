import SneakersInfo from "./SneakersInfo";
import Product from './Product';

export default class Order{
    private id: number = 0;
    private clientId: number = 0;
    private products: SneakersInfo[] = [];

    constructor(id: number, clientId: number) {
        this.id = id;
        this.clientId = clientId;
        this.products = [];
    }

    getId(): number {
        return this.id;
    }

    getClientId(): number {
        return this.clientId;
    }

    getProducts(): SneakersInfo[] {
        return this.products;
    }

    setId(id: number): void {
        this.id = id;
    }

    setClientId(clientId: number): void {
        this.clientId = clientId;
    }

    addProduct(product: SneakersInfo): void {
        if (product) {
            this.products.push(product);
        } else {
            throw new Error("Produto inválido");
        }
    }

    setProducts(products: SneakersInfo[]): void {
        if (products.length > 0) {
            this.products = products;
        } else {
            throw new Error("A lista de produtos não pode estar vazia");
        }
    }

    getOrderSummary(): string {
        const productNames = this.products.map(product => product.getProductName()).join(", ");
        return `Pedido ID: ${this.id}\nCliente ID: ${this.clientId}\nProdutos: ${productNames}`;        
    }
}