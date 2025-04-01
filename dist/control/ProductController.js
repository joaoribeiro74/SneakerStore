"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SneakersInfo_1 = __importDefault(require("../model/SneakersInfo")); // Importando a classe SneakersInfo
class ProductController {
    constructor() {
        this.sneakers = []; // Lista de sneakers (produtos)
    }
    // Método para criar um novo produto (tênis) com todas as propriedades
    createProduct(name, brand, price, stock, sizes, colors, gender, releaseDate) {
        const newSneaker = new SneakersInfo_1.default(); // Criando uma nova instância de SneakersInfo
        newSneaker.setProductName(name); // Setando o nome do produto
        newSneaker.setBrand(brand); // Setando a marca
        newSneaker.setPrice(price); // Setando o preço
        newSneaker.setStock(stock); // Setando o estoque
        newSneaker.setSizes(sizes); // Setando os tamanhos
        newSneaker.setColors(colors); // Setando as cores
        newSneaker.setGender(gender); // Setando o gênero
        newSneaker.setReleaseDate(releaseDate); // Setando a data de lançamento
        // Adiciona o novo tênis à lista de sneakers
        this.sneakers.push(newSneaker);
        console.log(`Tênis ${name} criado com sucesso.`);
        return newSneaker; // Retorna o novo objeto SneakersInfo
    }
    // Método para listar todos os produtos (tênis) cadastrados
    getAllProducts() {
        return this.sneakers; // Retorna todos os sneakers cadastrados
    }
    // Método para obter um produto específico pelo ID
    getProductById(id) {
        return this.sneakers.find(sneaker => sneaker.getId() === id); // Busca o sneaker pelo ID
    }
    // Método para atualizar um produto (tênis)
    updateProduct(id, name, brand, price, stock, sizes, colors, gender, releaseDate) {
        const sneaker = this.getProductById(id); // Busca o produto pelo ID
        if (sneaker) {
            if (name)
                sneaker.setProductName(name);
            if (brand)
                sneaker.setBrand(brand);
            if (price)
                sneaker.setPrice(price);
            if (stock !== undefined)
                sneaker.setStock(stock);
            if (sizes)
                sneaker.setSizes(sizes);
            if (colors)
                sneaker.setColors(colors);
            if (gender)
                sneaker.setGender(gender);
            if (releaseDate)
                sneaker.setReleaseDate(releaseDate);
            console.log(`Produto ${sneaker.getProductName()} atualizado com sucesso.`);
            return sneaker;
        }
        else {
            console.log("Produto não encontrado.");
            return undefined;
        }
    }
    // Método para excluir um produto pelo ID
    deleteProduct(id) {
        const index = this.sneakers.findIndex(sneaker => sneaker.getId() === id);
        if (index !== -1) {
            this.sneakers.splice(index, 1); // Remove o produto da lista
            console.log(`Produto ID ${id} excluído com sucesso.`);
            return true;
        }
        else {
            console.log("Produto não encontrado.");
            return false;
        }
    }
    // Método para adicionar estoque a um produto
    addStockToProduct(id, quantity) {
        const sneaker = this.getProductById(id); // Busca o produto pelo ID
        if (sneaker) {
            sneaker.addStock(quantity); // Adiciona a quantidade ao estoque
            console.log(`Estoque do produto ${sneaker.getProductName()} atualizado. Quantidade adicionada: ${quantity}`);
            return true;
        }
        else {
            console.log("Produto não encontrado.");
            return false;
        }
    }
}
exports.default = ProductController;
