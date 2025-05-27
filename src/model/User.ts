import IUser from "./IUser";
import { UserType } from "./UserType";

export default abstract class User implements IUser {
  protected id!: number;
  protected name: string = "";
  protected email: string = "";
  protected type: UserType;

  constructor(name: string, email: string, type: UserType) {
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

  abstract displayInfo(): string;
}
