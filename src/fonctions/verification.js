const EPSILON = 'ε';


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

// Fonction de priorite sur les operateurs
priorite = (op) => {
    if(op == '|')
        return 3;
    else if(op == '.')
        return 5;
    //dans le cas ou on a le *
    else
        return 6;
}
// Autre methode de la fonction postFixer 

function postFixer(infixRegex){
    var stack = [];
    var queue = [];
    var precedence = { // priorite des operateurs
        "*" : 3,
        "." : 2,
        "+" : 1
    }

    for (let index = 0; index < infixRegex.length; index++) {
        const element = infixRegex[index];

        if(element == "*" || element == "." || element == "+"){
            while(stack.length > 0 && precedence[stack[stack.length - 1]] >= precedence[element]){
                queue.push(stack.pop());
            }
            stack.push(element);
        }
        else if(element == "("){
            stack.push(element);
        }
        else if(element == ")"){
            while(stack[stack.length-1] != "("){
                queue.push(stack.pop());
            }
            stack.pop();
        }
        else{
            queue.push(element);
        }
    }

    while(stack.length > 0){
        queue.push(stack.pop());
    }

    return queue.toString().replaceAll(",", "");
}

// Construction d'un automate 
construction = (symbole) => {
    list_t = []
    etat_debut = new EtatTransition(list_t ,false);
    list_etats = []
    etat_fin = new EtatTransition([], true);
    t = new Transition(symbole, etat_fin);
    list_t.push(t);
    
    list_etats.push(etat_debut);
    list_etats.push(etat_fin);
    return new Automate(etat_debut, etat_fin)
}

a = construction("a")
b = construction('b')

//console.log(b) 

// Fonction de concatenation, prend deux automates en entree et en retourne un
concatenation = (a1, a2) => {
    t = new Transition(EPSILON, a2.getEtatInitial())
    etat_final_ele(a1).getListeTransition().push(t);
    etat_final_ele(a1).setIsFinal(false);
    etat1 = a2.getListeEtat()
    /* for(i = 0; i < etat1.length; i++) {
        /* a1.getListeEtat().push(etat1[i]); */
       /*  a1.setListeEtat(etats[i])
    } */
    a = new Automate(a1.getEtatInitial(), a2.getListeEtat());
    return a;
}

// Union
union = (a1, a2) => {    
    t = new Transition(EPSILON, a1.getEtatInitial());
    t1 = new Transition(EPSILON, a2.getEtatInitial());
    etat_fin = []
    t2 = new Transition(EPSILON, etat_fin)
    t3 = new Transition(EPSILON, etat_fin);
    list_trans_etat_init = []
    list_trans_etat_init.push(t);
    list_trans_etat_init.push(t1);
    etat_init = new EtatTransition(list_trans_etat_init, false);
    etat_final_ele(a1).getListeTransition().push(t2);
    etat_final_ele(a2).getListeTransition().push(t3);
    
    etat_final_ele(a2).setIsFinal(false);
    etat_final_ele(a1).setIsFinal(false);
    listes_etats = []
    listes_etats.push(a1.getListeEtat());
    listes_etats.push(etat_init);
    listes_etats.push(etat_fin);
    etat = []
    etat.push(a2.getListeEtat())
    for(i = 0; i < etat.length; i++) {
        listes_etats.push(etat[i]);
        
    }
    return new Automate(etat_init, listes_etats);
}

// Multiplicite
multiplicite =  a => {
    t1 = new Transition(EPSILON, a.getEtatInitial());
    list_transition = []
    list_transition.push(t1);
    etat_debut = new EtatTransition(list_transition, false);
    etat_fin = new EtatTransition([], true);
    t3 = new Transition(EPSILON, etat_fin);
    etat_final_ele(a).getListeTransition().push(t1);
    etat_final_ele(a).getListeTransition().push(t3);
    etat_final_ele(a).setIsFinal(false);
    etat_debut.getListeTransition().push(new Transition(EPSILON, etat_fin));
    a.setListeEtat(etat_debut)
    a.setListeEtat(etat_fin)
    
    automate = new Automate(etat_debut,a.getListeEtat()); 
    return automate;
}

// Affichage d'un Automate 

afficherAutomate = (a) => {
    etat = a.getListeEtat()
    console.log(etat)
    for (i = 0; i < etat.length; i++) {
        etatI = etat[i].getListeTransition()
        if(!(etatI.isEmpty)) {
            let t = etat[i].getListeTransition()
            for (j = 0; j < t.length; j++) {
                console.log(etat[i].getEtiquetteEtat()+ " "+t[j].getSymbole()+" "/* +t[j].getDestination().getEtiquetteEtat() */);
            }
        }
    } 
}

etat_final_ele = (a) => {
    etats = a.getListeEtat()
    for(i = 0; i < etats.length; i++) {
        if(etats[i].getIsFinal() == true)
            return etats[i];
    }
    return etats
}

 c = concatenation(construction("a"), construction("b"))
 d = union(construction("a"), construction("b"))
 m = multiplicite(construction("a"))
 
console.log("Auto Union ", d)
console.log("Auto concatenation ", c)
console.log("Multiplicite ", m)


isOperator = l =>{
    if(l == "." || l == "*" || l == "+"){
        return true
    }else{
        return false
    }
    
}

motToPile = mot => {
    let pile = []
    for(i= 0; i < mot.length; i++){
        pile.push(mot[i])
    }
    return pile
}