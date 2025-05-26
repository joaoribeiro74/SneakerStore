import Client from "../model/Client"; // ajuste o caminho conforme sua estrutura
import { UserType } from "../model/UserType";

describe("Client class", () => {
  it("deve criar um cliente com nome, email e id corretos", () => {
    const client = new Client("João", "joao@email.com");

    expect(client.getName()).toBe("João");
    expect(client.getEmail()).toBe("joao@email.com");
    expect(client.getType()).toBe(UserType.client);
    expect(client.getId()).toBeGreaterThan(0); // ID separado de seller
  });

  it("deve adicionar um endereço corretamente", () => {
    const client = new Client("Maria", "maria@email.com");
    const address = { street: "Rua A", number: 123, city: "SP" } as any; // mock simplificado

    client.addAddress(address);

    expect(client.getAddresses()).toContain(address);
  });
});
