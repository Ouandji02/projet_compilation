
class Transition {

    constructor(symbole, destination) {
        this.symbole = symbole;
        this.destination = destination;
    }	

    getSymbole() {
        return this.symbole;
    }
    setSymbole(symbole) {
        this.symbole = symbole;
    }         
            
    getDestination() {
        return this.destination;
    }
            
            
    setDestination(destination) {
        this.destination = destination;
    }
}
