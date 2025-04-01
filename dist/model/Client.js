"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(clientName, clientEmail, cep, city, state, country, district, address, addressNumber) {
        this.id = 0;
        this.clientName = "";
        this.clientEmail = "";
        this.cep = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.district = "";
        this.address = "";
        this.addressNumber = 0;
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
    getId() {
        return this.id;
    }
    getClientName() {
        return this.clientName;
    }
    getClientEmail() {
        return this.clientEmail;
    }
    getCep() {
        return this.cep;
    }
    getCity() {
        return this.city;
    }
    getState() {
        return this.state;
    }
    getCountry() {
        return this.country;
    }
    getDistrict() {
        return this.district;
    }
    getAddress() {
        return this.address;
    }
    getAddressNumber() {
        return this.addressNumber;
    }
    setId(id) {
        this.id = id;
    }
    setClientName(clientName) {
        if (clientName.length > 0) {
            this.clientName = clientName;
        }
        else {
            throw new Error("Nome do Cliente não pode ser vazio");
        }
    }
    setClientEmail(clientEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(clientEmail)) {
            this.clientEmail = clientEmail;
        }
        else {
            throw new Error("Email inválido");
        }
    }
    setCep(cep) {
        if (cep.length === 8 && !isNaN(Number(cep))) {
            this.cep = cep;
        }
        else {
            throw new Error("CEP Inválido");
        }
    }
    setCity(city) {
        this.city = city;
    }
    setState(state) {
        this.state = state;
    }
    setCountry(country) {
        this.country = country;
    }
    setDistrict(district) {
        this.district = district;
    }
    setAddress(address) {
        this.address = address;
    }
    setAddressNumber(addressNumber) {
        if (addressNumber > 0) {
            this.addressNumber = addressNumber;
        }
        else {
            throw new Error("Número do endereço inválido");
        }
    }
}
exports.default = Client;
