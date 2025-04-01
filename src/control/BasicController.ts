import PrimaryScreen from "../view/PrimaryScreen";

export default class BasicController{
    private primaryScreen: PrimaryScreen = new PrimaryScreen();

    public startSystem(): void{
        this.primaryScreen.getFirstScreen();
    }
}

