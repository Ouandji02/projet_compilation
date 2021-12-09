/**  
 *  On considere notre Automate definie de maniere suivante :
 *    - Un etat initial, qui definie l'etat de depart de notre automate
 *    - Un ensemble d'eta finaux, qui definie la liste des etats finaux ( en fait, c'est un tableau. ). Mais avec la notation de Thomson, on aura juste un etat final par automate
 *    - Un ensemble d'etat, une liste qui prend la liste des etats que contient notre automate
 *    - Un alphabet, qui est l'alphabet sur lequel notre automate est definie
 *    - Une liste de transitions, qui donne la liste des tyransitions definie sur l'automate
 *          Powered by Workspace 
 **/


class Automate {
  constructor(etatInitial, etatFinaux, etats, alphabet, transitions) {
    this.etatInitial = etatInitial;
    this.etatFinaux = etatFinaux;
    this.etats = etats;
    this.alphabet = alphabet;
    this.transitions = transitions;
  }

  // GETTTERS

  getTransition = () => {
    return this.transitions
  }

  getEtatInitial = () => {
    return this.etatInitial
  }

  getEtatFinaux = () => {
    return this.etatFinaux
  }

  getEtat(){
    return this.etats
  }

  getAlphabet = () => {
    return this.alphabet
  }

  // SETTERS

  setEtatFinaux(etatFinaux){
    this.etatFinaux = etatFinaux
  } 

  setEtat = (etats) => {
    this.etats = etats
  }

  setEtatInitial(etat){
    this.etatInitial = etat
  }

  setTransition(t){
    this.transitions = t
  }
}  