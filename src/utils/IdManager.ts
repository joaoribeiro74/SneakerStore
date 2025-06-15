import fs from "fs";
import path from "path";

const ID_STORE_PATH = path.resolve(__dirname, "../db/id_store.json");

let idStore: { [key: string]: number } = {};

try {
    if (fs.existsSync(ID_STORE_PATH)) {
        const data = fs.readFileSync(ID_STORE_PATH, "utf-8");
        idStore = JSON.parse(data);
    } 
} catch {
    idStore = {};
}

function save() {
    fs.writeFileSync(ID_STORE_PATH, JSON.stringify(idStore, null, 2));
}

export function getNextId(entityName: string): number {
    if (!idStore[entityName]) {
        idStore[entityName] = 1;
    } else {
        idStore[entityName]++;
    }

    save();

    return idStore[entityName];
}