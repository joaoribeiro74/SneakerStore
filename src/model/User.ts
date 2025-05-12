export enum UserType {
    client = "Cliente",
    seller = "Vendedor"
}

export default class User {
    private static nextId: number = 1;
    protected id: number;
    protected name: string = "";
    protected email: string = "";
    protected type: UserType;

    constructor(name: string, email: string, type: UserType) {
        this.id = User.nextId++;
        this.name = name;
        this.email = email;
        this.type = type;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getType(): UserType {
        return this.type;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public displayInfo(): string {
        return `${this.type} ${this.name} | Email: ${this.email}`;
    }
}