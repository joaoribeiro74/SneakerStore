import Address from "../model/Address";
import Client from "../model/Client";
import Sale from "../model/Sale";
import Seller from "../model/Seller";
import Sneaker from "../model/Sneaker";
import Stock from "../model/Stock";
import { UserType } from "../model/UserType";

describe("Seller class", () => {
    it("deve criar um vendedor com nome, email e id corretos", () => {
        const seller = new Seller(2, "Joaquim", "joaquim@email.com");

        expect(seller.getName()).toBe("Joaquim");
        expect(seller.getEmail()).toBe("joaquim@email.com");
        expect(seller.getType()).toBe(UserType.seller);
        expect(seller.getId()).toBeGreaterThan(0);
    });

    it("deve adicionar uma venda corretamente", () => {
        const seller = new Seller(1, "Maria", "maria@email.com");
        
        const sneaker = new Sneaker(1, "Nike", "Air Jordan 1 Dunk Low", 1000, "Branco e Marrom", "Masculino", [40], "31-12-2024" );
        const client = new Client(3, "José", "jose@email.com");
        const address = new Address("85012-230", "Guarapuava", "PR", "Brasil", "Trianon", "Rua Xavier da Silva, 400", "Próximo ao mercado");
        const stock = new Stock(sneaker.getId(), 10);
       
        client.addAddress(address);

        const sale = new Sale(1, sneaker, client, address, stock, seller);

        expect(seller.getSales()).toContain(sale);
        expect(seller.getBalance()).toBe(1000);
    });
});