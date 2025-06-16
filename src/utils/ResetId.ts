import fs from "fs";
import path from "path";
import { resetAllIds } from "../utils/IdManager";

export function resetAllData() {
  const files = [
    "clients.json",
    "sellers.json",
    "sneakers.json",
    "sales.json",
    "orders.json",
    "stock.json",
  ];

  const dataPath = path.join(__dirname, "..", "data");

  for (const file of files) {
    fs.writeFileSync(path.join(dataPath, file), "[]");
  }

  resetAllIds();
  console.log("Arquivos limpos e IDs resetados.");
}
