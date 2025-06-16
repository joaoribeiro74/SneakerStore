export default class Address {
  private cep: string = "";
  private city: string = "";
  private state: string = "";
  private country: string = "";
  private district: string = "";
  private address: string = "";
  private reference!: string;

  constructor(
    cep: string,
    city: string,
    state: string,
    country: string,
    district: string,
    address: string,
    reference: string
  ) {
    this.cep = cep;
    this.city = city;
    this.state = state;
    this.country = country;
    this.district = district;
    this.address = address;
    this.reference = reference || "Sem referência";
  }

  public getCep(): string {
    return this.cep;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCountry(): string {
    return this.country;
  }

  public getDistrict(): string {
    return this.district;
  }

  public getAddress(): string {
    return this.address;
  }

  public getReference(): string {
    return this.reference;
  }

  public setCep(cep: string): void {
    this.cep = cep;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public setCountry(country: string): void {
    this.country = country;
  }

  public setDistrict(district: string): void {
    this.district = district;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setReference(reference: string): void {
    this.reference = reference;
  }

  static fromJSON(json: any): Address {
    return new Address(
      json.cep,
      json.city,
      json.state,
      json.country,
      json.district,
      json.address,
      json.reference
    );
  }
}
