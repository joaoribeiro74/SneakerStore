import Client from "../model/Client"; // ajuste o caminho conforme sua estrutura
import { UserType } from "../model/UserType";
import Address from "../model/Address";

describe("Client class", () => {
  it("deve criar um cliente com nome, email e id corretos", () => {
    const client = new Client("João", "joao@email.com");

    expect(client.getName()).toBe("João");
    expect(client.getEmail()).toBe("joao@email.com");
    expect(client.getType()).toBe(UserType.client);
    expect(client.getId()).toBeGreaterThan(0);
  });

  it("deve adicionar um endereço corretamente", () => {
    const client = new Client("Maria", "maria@email.com");
    const clientAddress = new Address(
      "85012-230",
      "Guarapuava",
      "PR",
      "Brasil",
      "Trianon",
      "Rua Xavier da Silva, 400",
      "Perto da Lagoa"
    );
    const clientAddress2 = new Address(
      "05494-090",
      "São Paulo",
      "SP",
      "Brasil",
      "Vila Madalena",
      "Rua Madalena, 1204",
      ""
    );

    client.addAddress(clientAddress);
    client.addAddress(clientAddress2);

    expect(client.getAddresses()).toEqual(expect.arrayContaining([clientAddress, clientAddress2]));

    expect(client.getAddresses().length).toBe(2);
  });
});
