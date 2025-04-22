import promptSync from "prompt-sync";
import MainController from "../control/MainController";

export default class AddSale{
    private prompt = promptSync();
    private control: MainController;
    
    constructor(control: MainController) {
        this.control = control;
    }
}