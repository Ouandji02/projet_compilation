// Constante EPSILON
const EPSILON = 'ε';

/**
    * Classe qui doit definir une transition  
*/

class Transition {
    constructor(etat, etatSuivant, symbole, finale) {
      if (!(typeof etat === "string" || etat instanceof String))
        throw new Error("Etat non definie !!!!");
  
      if (!Array.isArray(etatSuivant)) {
        console.warn("Etat suivant non valide");
        let arr = [];
        arr.push(etatSuivant.toString());
        etatSuivant = arr;
      }
  
      if (!(typeof symbole === "string" || symbole instanceof String))
        throw new Error("Symbole invalide");
  
      this.etat = etat;
      this.etatSuivant = etatSuivant;
      this.symbole = symbole;
      this.finale = finale;
    }

    addTransition(symbole) {
        
    }
}

/** 
    *    Classe qui doit definir un AFN
*/

class AFN {
    constructor(etatInitial, etatFinaux, etats, alphabet, transitions) {
        if (!(typeof etatInitial === "string" || etatInitial instanceof String))
            throw new Error("Etat initial non defini !");
  
        if (!Array.isArray(etatFinaux)) {
            let arr = []
            arr.push(etatFinaux.toString())
            etatFinaux = arr
        }
  
        if (!Array.isArray(alphabet)) {
            let arr = [];
            arr.push(alphabet.toString());
            alphabet = arr;
        }
  
        if (!Array.isArray(transitions)) {
            let arr = [];
            arr.push(transitions);
            transitions = arr;
        }
    
        this.etatInitial = etatInitial;
        this.etatFinaux = etatFinaux;
        this.etats = etats;
        this.alphabet = alphabet;
        this.transitions = transitions;
    }
  

    // Fonction qui doit tracer l'AFN
    toDotString() {
        let dotStr = "digraph fsm {\n";
        dotStr += "rankdir=LR;\n";
        dotStr += 'size="8,5";\n';
        dotStr += "node [shape = point]; INITIAL_STATE\n";
        dotStr += "node [shape = doublecircle]; " + this.etatFinaux.join(",") + ";\n";
        dotStr += "node [shape = circle];\n";
        dotStr += "INITIAL_STATE -> " + this.formatDotState(this.etatInitial) + ";\n";
    
        for (let i = 0; i < this.transitions.length; i++) {
            let t = this.transitions[i];
    
            dotStr += "" + this.formatDotState(t.etat) + " -> " + this.formatDotState(t.etatSuivant) + " [label=" + t.symbole + "];\n";
        }
    
        dotStr += "}";
    
        return dotStr;
    }

    formatDotState(state_str) {
        state_str = state_str.toString();
        if (isMultiState(state_str)) {
            state_str = state_str.substring(1, state_str.length - 1);
            state_str = state_str.replace(/,/g, "");
            return state_str;
        } else {
            return state_str;
        }
    } 
}

// Nous allons ici definir les methode necessaire

/**
    * Fopnction de concatenation de deux automates  
*/

function altPair(first, second) {
    first.out.accepting = false;
    second.out.accepting = true;
  
    first.out.addTransition(EPSILON, second.in);
    first.out = second.in;
  
    return new NFA(first.in, second.out)
  }