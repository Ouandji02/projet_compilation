class EtatDeterministe {

    constructor(etat, listeEtat, marquage) {
        this.etat = etat;
        this.listeEtat = listeEtat;
        this.marquage = marquage;
    }

    getEtat() {
        return this.etat;
    }

    getListeEtat() {
        return this.listeEtat;
    }

    setEtat(etat) {
        this.etat = etat;
    }

    setListeEtat(listeEtat) {
        this.listeEtat = listeEtat;
    }

    setMarquage(marquage) {
        this.marquage = marquage;
    }
    
    getMarquage(){
        return this.marquage;
    }

    
    //modification de la visiblite de l'etiquete
    compare(etat){
        if(etat.length == this.getListeEtat().length){
            for(i = 0; i < etat.length; i++){
                if(etat.get(i).getEtiquetteEtat() != this.getListeEtat().get(i).getEtiquetteEtat())
                    return false;
            }
            return true;
        }
        return false;
    }
    
    Finalization(){
        for(c of this.getListeEtat()){
            if(c.getIsFinal()){
                this.getEtat().setIsfinal(true);
            }
        }
    }

}