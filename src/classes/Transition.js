/**
 *      Classe Transition
 *      Cette classe est define par :
 *          - Un etat de depart,
 *          - Une liste d'etat qui peuvent etre accessible
 *          - Un symbole permettant de definir la transition
 *      Cette classe permet de definir une transition sur un symbole
 */

class Transition {
    constructor(etat, etatSuivant, symbole) {
        this.etat = etat;
        this.etatSuivant = etatSuivant;
        this.symbole = symbole;
    }

    // GETTERS. On a juste donnee les plus important => Ce qu'on devait utiliser
    getEtat = () => {
        return this.etat
    }

    // SETTERS. Toujours, on a definie les plus importants
    getSymbole = () => {
        return this.symbole
    }
}