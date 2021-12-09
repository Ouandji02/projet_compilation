
/**
 * 
 * Ce fichier doit lui permettre de lier l'autmate aux evenements sur le DOM
 * 
 */

var btn_click = document.getElementById("button_convert")

btn_click.addEventListener('click', () => {

    alphabet = document.getElementById("input_alphabet")
    langage = document.getElementById("input_langage")

    if(langage.value.length === 0 || alphabet.value.length === 0){
        alert('Veuillez definir un alphabet et un langage !! ')
    }
    else if(!verificationLangage(alphabet.value, langage.value)){
        alert("Le langage n'appartient pas a l'alphabet!")
    }else{

        autmate = evaluation(langage.value)
        afn = autmate[0]

        
        // Zone de code permettant de tracer l'automate chez l'utilisateur

        let dotStr = "digraph fsm {\n";
        dotStr += "rankdir=LR;\n";
        dotStr += 'size="5";\n';
        dotStr += "node [shape = doublecircle]; " + afn.etatFinaux + ";\n";
        dotStr += "node [shape = point]; INITIAL_STATE\n";
        dotStr += "node [shape = circle];\n";
        dotStr += "INITIAL_STATE -> " + afn.etatInitial + ";\n";

        for (let transition of afn.transitions)
            dotStr += "" + transition.etat + " -> " + transition.etatSuivant + " [label=" + transition.symbole + "];\n";
        dotStr += "}";

        d3.select("#automate_afn").graphviz().zoom(false).renderDot(dotStr);
    }
})
