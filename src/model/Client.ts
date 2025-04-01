export default class Client{
    private id: number = 0;
    private clientName: string = "";
    private clientEmail: string = "";
    private cep: string = "";
    private city: string = "";
    private state: string = "";
    private country: string = "";
    private district: string = "";
    private address: string = "";
    private addressNumber: number = 0;

    constructor(
        clientName: string, 
        clientEmail: string, 
        cep: string, 
        city: string, 
        state: string, 
        country: string, 
        district: string, 
        address: string, 
        addressNumber: number
    ) {
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.cep = cep;
        this.city = city;
        this.state = state;
        this.country = country;
        this.district = district;
        this.address = address;
        this.addressNumber = addressNumber;
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

    getAddressNumber(): number {
        return this.addressNumber;
    }

    setId(id: number): void {
        this.id = id;
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

    setAddressNumber(addressNumber: number): void {
        if (addressNumber > 0) {
        this.addressNumber = addressNumber;
        } else {
            throw new Error("Número do endereço inválido");
        }
    }
}