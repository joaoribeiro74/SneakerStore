import PromptSync from "prompt-sync";
import MainController from "../control/MainController";
import Product from "../model/Product";

export default class SneakerRegister{
    private prompt = PromptSync();
    private control!: MainController;

    constructor(control: MainController) {
        this.control = control;
    }

    public sneakerRegister() {
        
    }
}