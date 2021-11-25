class Automate {
    constructor(etatInitial, listeEtat){
        this.etatInitial = etatInitial
        this.listeEtat = listeEtat
    }

    getEtatInitial = () => {
        return this.etatInitial
    }

    getListeEtat = () => {
        return this.listeEtat
    }

    setEtatInitial = (etat) => {
        this.etatInitial = etat 
    }

    setListeEtat = (liste) => {
        this.listeEtat = liste 
    } 
}