export default class Client{
    private static nextId: number = 1;
    private id: number;
    private clientName: string = "";
    private clientEmail: string = "";
    private cep: string = "";
    private city: string = "";
    private state: string = "";
    private country: string = "";
    private district: string = "";
    private address: string = "";
    private reference!: string;

    constructor(
        clientName: string, 
        clientEmail: string, 
        cep: string, 
        city: string, 
        state: string, 
        country: string, 
        district: string, 
        address: string, 
        reference: string,
    ) {
        this.id = Client.nextId++;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.cep = cep;
        this.city = city;
        this.state = state;
        this.country = country;
        this.district = district;
        this.address = address;
        this.reference = reference;
    }

    getId(): number {
        return this.id;
    }

    getClientName(): string {
        return this.clientName;
    }

    getClientEmail(): string {
        return this.clientEmail;
    }

    getCep(): string {
        return this.cep;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getCountry(): string {
        return this.country;
    }

    getDistrict(): string {
        return this.district;
    }

    getAddress(): string {
        return this.address;
    }

    getReference(): string {
        return this.reference;
    }

    setClientName(clientName: string): void {
        if (clientName.length > 0) {
            this.clientName = clientName;
        } else {
            throw new Error("Nome do Cliente não pode ser vazio");
        }
    }

    setClientEmail(clientEmail: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(clientEmail)) {
            this.clientEmail = clientEmail;
        } else {
            throw new Error("Email inválido");
        }
    }

    setCep(cep: string): void {
        if (cep.length === 8 && !isNaN(Number(cep))) {
            this.cep = cep;
        } else {
            throw new Error("CEP Inválido");
        }
    }

    setCity(city: string): void {
        this.city = city;
    }

    setState(state: string): void {
        this.state = state;
    }

    setCountry(country: string): void {
        this.country = country;
    }

    setDistrict(district: string): void {
        this.district = district;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setReference(reference: string): void {
        this.reference = reference;
    }
}