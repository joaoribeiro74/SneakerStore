import Database from "../db/Database";
import MainScreen from "../view/MainScreen";

export default class MainController{
    public db: Database = new Database();

    constructor(){
       new MainScreen(this);
    }
}