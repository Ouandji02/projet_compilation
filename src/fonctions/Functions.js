/**
 *      La constante EPSILON
 */

const EPSILON = 'λ'

/**
 * 
 *      Elle permet de donner la forme post-fixer d'une expression reguliere. 
 *      Exemple : 
 *          Entree : (a.(b)) 
 *          Sortie : a b . 
 */

function postFixer(infixRegex){
    var stack = [];
    var queue = [];
    var precedence = { // priorite sur les operateurs
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

/**
 * 
 *      Fonction de construction d'un automate minimal
 * 
 */

let et = 0
construction = (a) => {
    etat = []
    etat[0] = "q"+et
    etat[1] = "q"+(et+1)
    t = new Transition(etat[0], etat[1], a)
    et++

    return new Automate(
        etat[0],
        [etat[1]],
        [etat[0], etat[1]],
        [a],
        [t]
    )
}

/**
 * 
 *      Fonction de concatenation de deux automates 
 * 
 */

concatenation = (a, b) => {

    etat = a.getEtat().concat(b.getEtat()) 
  
    etatInitial = a.getEtatInitial()
  
    etat_f_a = a.getEtatFinaux()
  
    //t = new Transition(etat_f_a, b.getEtatInitial(), EPSILON) // Elle n'est pas forcemant neccessaire, mais importante, doit ajouter a chque fois une transitio EPSILON a toute fonction de concatenation
  
    alphabetA = a.getAlphabet()
    alphabetB = b.getAlphabet()
    t_all = []
    t_all = t_all.concat(a.getTransition())
    t_all = t_all.concat(b.getTransition())
   // t_all = t_all.concat(t)
    return new Automate(
        etatInitial, 
        b.getEtatFinaux(), 
        etat,
        alphabetA.concat(alphabetB),
        t_all
    )
}

/**
 * 
 *      Fonction de l'union de deux autmates
 * 
 */

union = (a, b) => {

    // Je refais pour une derbiere fois
    init = a.getEtatInitial()
  
    alphabet = []
    alphabetA = a.getAlphabet()
    alphabetB = b.getAlphabet()
    alphabet = alphabet.concat(alphabetA).concat(alphabetB)
  
    etat_init = construction(EPSILON)
    etat_inter = construction(EPSILON)
    etat_fin = construction(EPSILON)
  
    etat_init.setEtatInitial(init)
  
    etat_final = construction(EPSILON)
  
    inter_debut = etat_inter.getEtatInitial()
    inter_fin = etat_inter.getEtatFinaux()[0]

    ta = new Transition(a.getEtatFinaux()[0], b.getEtatFinaux()[0], alphabetA[0])
    tb = new Transition(inter_debut, inter_fin, alphabetB[0])
  
    t1 = new Transition(etat_init.getEtatInitial(), inter_debut, EPSILON)
    t2 = new Transition(etat_init.getEtatInitial(), b.getEtatInitial(), EPSILON)
    t3 = new Transition(b.getEtatFinaux()[0], etat_final.getEtatInitial(), EPSILON) 
    t4 = new Transition(inter_fin, etat_final.getEtatInitial(), EPSILON)
  
    fin = etat_fin.getEtatInitial()
  
    t_all = []
    t_all = t_all.concat(ta).concat(tb).concat(t1).concat(t2).concat(t3).concat(t4)/* .concat(a.getTransition().concat(b.getTransition())) */ // On doit supprimer les transitiosn a et b pour une bonne fonctionnalite
  
    etat = etat.concat(etat_init.getEtat().concat(etat_fin.getEtat()))
  
    return new Automate(
        init,
        etat_final.getEtatInitial(),
        etat,
        alphabet,
        t_all
    )
}

/**
 * 
 *      Fonction kleene, encore appele la fonction de multiplicite
 * 
 */

kleene = (a) => {

    init_a = a.getEtatInitial()
    
    etat_init = construction(EPSILON)
    etat_fin = construction(EPSILON)
  
    a.setEtatInitial(etat_init.getEtatInitial())
    a.setEtatFinaux(etat_fin.getEtatInitial())
  
    fin_a = etat_fin.getEtatFinaux()[0]
    etat_a = a.getEtatFinaux()
  
    t1 = new Transition(init_a, etat_init.getEtatInitial(), EPSILON)
    t2 = new Transition(init_a, fin_a, EPSILON)
    t3 = new Transition(a.getEtatInitial(), a.getEtatFinaux(), a.getAlphabet()[0])
    t4 = new Transition(a.getEtatFinaux(), a.getEtatInitial(), EPSILON)
    t5 = new Transition(a.getEtatFinaux(), fin_a, EPSILON)
  
    t_all = []
    t_all = t_all.concat(t1)
    t_all = t_all.concat(t2)
    t_all = t_all.concat(t3)
    t_all = t_all.concat(t4)
    t_all = t_all.concat(t5)
  
    etat = []
    etat = etat.concat(etat_init.getEtat().concat(etat_fin.getEtat()))
  
    return new Automate(
        init_a,
        fin_a,
        etat,
        a.getAlphabet(),
        t_all
    )  
}

/**
 * 
 *      Cette fonction permet de transformer un mot en une pile, donc recupere le mot, le transforme en tableau
 * 
 */
 
motToPile = mot => {
    let pile = []
    for(i= 0; i < mot.length; i++){
        pile.push(mot[i])
    }
    return pile
}

/**
 * 
 *      Cette fonction permet de tester si c;est une lettre ou un operateur
 * 
 */
  
isOperator = l =>{
    if(l == "." || l == "*" || l == "+"){
        return true
    }else{
        return false
    }
}

/**
 * 
 *      Fonction d'evaluation d'un autmate, elle recupere une expression reguliere et renvois l'automate correspondant !!
 * 
 */
evaluation = (regex) => {

    regex = postFixer(regex)
    regex = motToPile(regex)

    pile = []
    
    i = 0

    while(i < regex.length){

        if(!isOperator(regex[i])){
            // On construit un automate minimal et puis on l'empile dans notre variable pile
            pile.push(construction(regex[i]))
        }

        // Concatenation de deux automates
        if(isOperator(regex[i]) && regex[i] === "."){
            a = pile.pop()
            b = pile.pop()
            u = concatenation(b, a)
            pile.push(u)
        }

        // Union de deux automates
        if(isOperator(regex[i]) && regex[i] === "+"){
            a = pile.pop()
            console.log("Retire ", a)
            b = pile.pop()
            c = union(b, a)
            pile.push(c)
        }

        // Multiplicite sur un automate
        if(isOperator(regex[i]) && regex[i] === "*"){
            a = pile.pop()
            b = kleene(a)
            pile.push(b)
        }
        i++
    }

    return pile
}

/**
 *
 *      Fonction de verification d'un langage. 
 * 
 *      Code par Thierry
 * 
 * 
 */

const verificationLangage = (alphabet, langage) => {
    
    for(j = 0; j < langage.length; j++){
        if(alphabet.indexOf(langage[j]) == -1){
            if(['*','+','|','.','(',')'].indexOf(langage[j]) == -1){
               // alert(langage[j])
                return false
            } 
        }
    }
    var correct = 0;
    for(var i=0; i<=langage.length; i++){
        if(i==0 && (['*','+','|','.'].indexOf(langage[i]) != -1)){
            return false
        }
        if(langage[i] == '('){
            correct++;
        }
        if(langage[i+1] == ')'){
            correct --;
        }
        if(langage[i] == '*' && ['*'].indexOf(langage[i+1])!=-1){
            return false
        }
        if(langage[i] == "|" &&  ['*','.','|'].indexOf(langage[i+1])!=-1){
            return false
        }
        if(langage[i] == "." &&  ['*','.','|'].indexOf(langage[i+1])!=-1){
            return false
        }
    }
    if(correct != 0){
        return false
    }else{
        return true
    }
}