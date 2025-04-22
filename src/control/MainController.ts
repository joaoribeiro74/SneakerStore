import Database from "../db/Database";
import Client from "../model/Client";
import MainScreen from "../view/MainScreen";

export default class MainController{
    public db: Database = new Database();

    constructor(){
       new MainScreen(this);
    }
}