import * as fs from "fs";
import * as path from "path";

export default class PersistenceManager<T> {
    private filePath: string;

    constructor(filename: string) {
        this.filePath = path.resolve(__dirname, "../db", filename);
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
        return JSON.parse(raw) as T[];
    }
}