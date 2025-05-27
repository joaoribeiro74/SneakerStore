import { UserType } from "./UserType";

export default interface IUser {
  getId(): number;
  getName(): string;
  getEmail(): string;
  getType(): UserType;
  setName(name: string): void;
  setEmail(email: string): void;
  displayInfo(): string;
}
