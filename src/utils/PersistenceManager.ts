import * as fs from "fs";
import * as path from "path";
import { Serializable } from "../model/Serializable";

export default class PersistenceManager<T> {
    private filePath: string;
    private classRef: Serializable<T> & { new(...args: any[]): T };

    constructor(filename: string, classRef: Serializable<T> & { new(...args: any[]): T }) {
        this.filePath = path.resolve(__dirname, "../db", filename);
        this.classRef = classRef;
        this.createFileIfNotExists();
    }

    private createFileIfNotExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]", "utf-8");
        }
    }

    public saveData(data: T[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    public loadData(): T[] {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const parsed = JSON.parse(raw);
        return parsed.map((obj: any) => this.classRef.fromJSON(obj));
    }
}