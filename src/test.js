
console.log("\n \n++++++++++ PHASE DE TEST +++++++++++ \n \n\n")

/* let exp = prompt("Entrez l'expresion reguliere : ") */
exp = prompt("Entrez l'expression ")
console.log("Expresion a tester ", exp)
exp = postFixer(exp)
console.log("Sa forme postfixer ", exp)
pile = motToPile(exp)
// Construction de chaque AFN
for(i = 0; i < pile.length; i++){
    if(!isOperator(pile[i])){
        pile[i] = construction(pile[i])
    }
}

for(i = 0; i < pile.length; i++){
    if(isOperator(pile[i]) && (pile[i] === ".")){
        pile.splice(i, 1)
        a1 = pile.shift()
        a2 = pile.shift()
        aFinal = concatenation(a1, a2)
        pile.unshift(aFinal)
        i += 1
    }
     if(isOperator(pile[i]) && (pile[i] === "+")){
        pile.splice(i, 1)
        a1 = pile.shift()
        a2 = pile.shift()
        aFinal = union(a1, a2)
        pile.unshift(aFinal)
        i+=1
    } 

    if(isOperator(pile[i]) && (pile[i] === "*")){
        pile.splice(i, 1)
        a1 = pile.shift()
        aFinal = multiplicite(a1)
        pile.unshift(aFinal)
        i+=1
    }
} 
console.log(pile[0])
console.log("\n \n++++++++++ FIN PHASE DE TEST +++++++\n\n")


// TRACAGE SUR LA PAGE HTML 

afn = pile[0]
//console.log("Etat ", afn.getEtatInitial().getListeTransition())
let dotStr = "digraph fsm {\n";
dotStr += "rankdir=LR;\n";
dotStr += 'size="5,5";\n';
dotStr += "node [shape = doublecircle]; FINAL_STATE;\n";
dotStr += "node [shape = point]; INITIAL_STATE\n";
dotStr += "node [shape = circle];\n"; 
dotStr += "INITIAL_STATE -> " + afn.getEtatInitial().getEtiquetteEtat() + ";\n";

let listeEtat = afn.getEtatInitial().getListeTransition()

console.log(listeEtat)

for (i = 0; i < listeEtat.length; i++){
    transition = listeEtat[i]
    dotStr += " " + transition.getDestination().getEtiquetteEtat() + " -> " + transition.getDestination().getEtiquetteEtat() + " [label=" + transition.getSymbole() + "];\n";
} 
dotStr += "}";

d3.select("#afn").graphviz().zoom(false).renderDot(dotStr);