import { UserType } from "./UserType";

export default class User {
    private static nextId: number = 1;
    private id: number;
    private name: string = "";
    private email: string = "";
    private type: UserType;

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