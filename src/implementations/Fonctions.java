package implementations;

// Importation des Classes et autres ici.
import classes.Automate;
public interface Fonctions {
    
    // Fonction de verification des chaines de caracteres saisie par l'utilisateur
    public boolean verifcation(String chaine);
    
    // Fonction de verifcation si c'est un operateur ou un symbole
    public boolean estOperateur(char val);
    
    // Fonction d'evaluation d'un automate
    // public Automate evaluation(Automate a);
    
    // Fonction de concatenation de deux automates
    public Automate concatenation(Automate a1, Automate a2);
    
    // Fonction de l'union de deux automates
    public Automate union(Automate a1, Automate a2);
    
    // Fonctiuon de l'exponentiation de l'automate (Le theoreme de Klenne)
    public Automate klenne(Automate a);
    
    // Fonction de definition de lapriorite sur les operateur
    public int priorite(char operateur);
    
}