var form = document.getElementById("form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let mot = document.getElementById("mot").value
    let expression = document.getElementById("expre").value
    TestAFN(expression, mot)
})

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var flag;
var hashTable = {}; // Hashtable represente la transition de tous les etats
var finalStack = []; // finalstack contient le resultat de l'application de CreateAFN sur chaque etat

function TestAFN(regex, input){ // Pour l'instant, on tient beaucoup plus compte de la concatenation
    flag = false; // contient le resultat de l'operation, true or false
    var postfix = Parse(regex); // Prend la forme infixe et retourne sa forme postfixe pour le travail
    hashTable = {}; // Represente la table de transition en quelque sorte
    finalStack = []; // Pile finale de la creation des etats
    CreateAFN(postfix, hashTable, finalStack); // Cree les etats (le tout) et connecte les etats a l'AFN

    for (let index = 0; index < Object.keys(hashTable).length; index++) { 

        hashTable["q" + index].accept = false;

        for (let index2 = 0; index2 < finalStack[0].acceptStates.length; index2++) {

            if(finalStack[0].acceptStates[index2] == "q" + index){
                hashTable["q" + index].accept = true;
            }
        }
    }

    CheckInput(input, hashTable, finalStack[0].initialState, 0); // Verifie l'entree sur chaque caractere

    for(index = 0; index < finalStack.length; index++){
        console.log(hashTable['q'+index].initialState)
    }

    if(flag){
        alert("Le mot est reconnu par l'expression reguliere")
    }else
        alert("le mot n'est pas reconnu ")
    for(i = 0; i < Object.keys(hashTable).length; i++)
        console.log(hashTable["q"+i])
}

function CheckInput(input, hashTable, currentState, index){ // Fonction qui trqite l'expression reguliere pris en parametre

    if(index == input.length){

        if(hashTable[currentState].accept == true){ // Si l'etat courant est acceptable, on retourne true
            flag = true;
        }
        else{
            for (let i = 0; i < hashTable[currentState]["EPSILON"].length; i++) {
                CheckInput(input, hashTable, hashTable[currentState]["EPSILON"][i], index); // Si l'etat n'est pas acceptable
            }
        }

    }
    else if(index < input.length){ 

        if(hashTable[currentState][input[index]] == undefined){
            for (let i = 0; i < hashTable[currentState]["EPSILON"].length; i++) {
                CheckInput(input, hashTable, hashTable[currentState]["EPSILON"][i], index); // Va a l'etat de EPSILON
            }
        }
        else{
            for (let i = 0; i < hashTable[currentState][input[index]].length; i++) {
                CheckInput(input, hashTable, hashTable[currentState][input[index]][i], index + 1); // Vas a l'etat courant avec ton operande
            }
        }

    }
}

function CreateAFN(postfix, hashTable, finalStack){  // Creation de l'AFN

    var stateCounter = 0; // compteur du label de chaque etat
    var resultCounter = 0; // compteur du resultat
    for (let index = 0; index < postfix.length; index++) { // Si l'oprande et les operateurs sont trouve 
        const element = postfix[index];

        switch(element){

            case "*": // Kleenne
                var operand = finalStack.pop();

                if(typeof(operand) == 'string'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['EPSILON'].push('q' + stateCounter); // a: ['q1']
                    tempState['accept'] = true;

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1[operand] = [];
                    state1[operand].push('q' + stateCounter); // a: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;

                    var state2 = {};
                    state2['label'] = 'q' + stateCounter; //q2
                    stateCounter++;
                    state2['EPSILON'] = [];
                    state2['accept'] = true;
                    state2['EPSILON'].push(state1.label);

                    hashTable[state2.label] = state2;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(tempState.label);
                    result.acceptStates.push(state2.label);

                    finalStack.push(result);
                }
                else if(typeof(operand) == 'object'){ // Pas bien compris

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter;
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['EPSILON'].push(operand.initialState);
                    tempState['accept'] = true;

                    hashTable[tempState.label] = tempState;

                    hashTable[operand.initialState].accept = false;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(tempState.label);

                    for (let index = 0; index < operand.acceptStates.length; index++) {
                        const element = operand.acceptStates[index];

                        hashTable[element].EPSILON.push(operand.initialState);
                        result.acceptStates.push(hashTable[element].label);

                    }

                    finalStack.push(result);
                }

            break;
            case "+": // union
                var operand1 = finalStack.pop();
                var operand2 = finalStack.pop();

                if(typeof(operand1) == 'string' && typeof(operand2) == 'string'){ // On verifie que c'est bien une chiane
                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['accept'] = false;

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1[operand1] = [];
                    state1[operand1].push('q' + stateCounter); // a: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;

                    var state2 = {};
                    state2['label'] = 'q' + stateCounter; //q2
                    stateCounter++;
                    state2['EPSILON'] = [];
                    state2['accept'] = true;

                    hashTable[state2.label] = state2;

                    var state3 = {};
                    state3['label'] = 'q' + stateCounter; //q3
                    stateCounter++;
                    state3['EPSILON'] = [];
                    state3[operand2] = [];
                    state3[operand2].push('q' + stateCounter); // a: ['q4']
                    state3['accept'] = false;

                    hashTable[state3.label] = state3;

                    var state4 = {};
                    state4['label'] = 'q' + stateCounter; //q4
                    stateCounter++;
                    state4['EPSILON'] = [];
                    state4['accept'] = true;

                    hashTable[state4.label] = state4;

                    tempState['EPSILON'].push(state1.label);
                    tempState['EPSILON'].push(state3.label); // a: ['q1', 'q3']

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(state2.label);
                    result.acceptStates.push(state4.label);

                    finalStack.push(result);

                }
                else if(typeof(operand1) == 'object' && typeof(operand2) == 'string'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['accept'] = false;
                    tempState.EPSILON.push(operand1.initialState);

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1[operand2] = [];
                    state1[operand2].push('q' + stateCounter); // a: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;
                    tempState['EPSILON'].push(state1.label);

                    var state2 = {};
                    state2['label'] = 'q' + stateCounter; //q2
                    stateCounter++;
                    state2['EPSILON'] = [];
                    state2['accept'] = true;

                    hashTable[state2.label] = state2;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(state2.label);

                    for (let index = 0; index < operand1.acceptStates.length; index++) {
                        const element = operand1.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    finalStack.push(result);
                }
                else if(typeof(operand1) == 'string' && typeof(operand2) == 'object'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['accept'] = false;
                    tempState.EPSILON.push(operand2.initialState);

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1[operand1] = [];
                    state1[operand1].push('q' + stateCounter); // a: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;
                    tempState['EPSILON'].push(state1.label);

                    var state2 = {};
                    state2['label'] = 'q' + stateCounter; //q2
                    stateCounter++;
                    state2['EPSILON'] = [];
                    state2['accept'] = true;

                    hashTable[state2.label] = state2;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(state2.label)

                    for (let index = 0; index < operand2.acceptStates.length; index++) {
                        const element = operand2.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    finalStack.push(result);
                }
                else if(typeof(operand1) == 'object' && typeof(operand2) == 'object'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState['accept'] = false;
                    tempState.EPSILON.push(operand1.initialState);
                    tempState.EPSILON.push(operand2.initialState);

                    hashTable[tempState.label] = tempState;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];

                    for (let index = 0; index < operand1.acceptStates.length; index++) {
                        const element = operand1.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    for (let index = 0; index < operand2.acceptStates.length; index++) {
                        const element = operand2.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    finalStack.push(result);
                }

            break;
            case ".": // concatenation
                var operand1 = finalStack.pop();
                var operand2 = finalStack.pop();

                if(typeof(operand1) == 'string' && typeof(operand2) == 'string'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState[operand2] = [];
                    tempState[operand2].push('q' + stateCounter); // a: ['q1']
                    tempState['accept'] = false;

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1['EPSILON'].push('q' + stateCounter); // b: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;

                    var state2 = {};
                    state2['label'] = 'q' + stateCounter; //q2
                    stateCounter++;
                    state2['EPSILON'] = [];
                    state2['accept'] = false;
                    state2[operand1] = [];
                    state2[operand1].push('q' + stateCounter); // a: ['q1']

                    hashTable[state2.label] = state2;

                    var state3 = {};
                    state3['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state3['EPSILON'] = [];
                    state3['accept'] = true;

                    hashTable[state3.label] = state3;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];
                    result.acceptStates.push(state3.label);

                    finalStack.push(result);

                }
                else if(typeof(operand1) == 'object' && typeof(operand2) == 'string'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState[operand2] = [];
                    tempState[operand2].push('q' + stateCounter); // a: ['q1']
                    tempState['accept'] = false;

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1['EPSILON'].push(operand1.initialState); // b: ['q2']
                    state1['accept'] = false;

                    hashTable[state1.label] = state1;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = tempState.label;
                    result['acceptStates'] = [];

                    for (let index = 0; index < operand1.acceptStates.length; index++) {
                        const element = operand1.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    finalStack.push(result);

                }
                else if(typeof(operand1) == 'string' && typeof(operand2) == 'object'){

                    var tempState = {};
                    tempState['label'] = 'q' + stateCounter; //q0
                    stateCounter++;
                    tempState['EPSILON'] = [];
                    tempState[operand1] = [];
                    tempState[operand1].push('q' + stateCounter); // a: ['q1']
                    tempState['accept'] = false;

                    hashTable[tempState.label] = tempState;

                    var state1 = {};
                    state1['label'] = 'q' + stateCounter; //q1
                    stateCounter++;
                    state1['EPSILON'] = [];
                    state1['accept'] = true;

                    hashTable[state1.label] = state1;

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = operand2.initialState;
                    result['acceptStates'] = [];
                    result.acceptStates.push(state1.label);

                    for (let index = 0; index < operand2.acceptStates.length; index++) {
                        const element = operand2.acceptStates[index];
                        hashTable[element].EPSILON.push(tempState.label);
                        hashTable[element].accept = false;
                    }

                    finalStack.push(result);
                }
                else if(typeof(operand1) == 'object' && typeof(operand2) == 'object'){

                    var result = {};
                    result['label'] = 'R' + resultCounter;
                    resultCounter++;
                    result['initialState'] = operand2.initialState;
                    result['acceptStates'] = [];

                    for (let index = 0; index < operand2.acceptStates.length; index++) {
                        const element = operand2.acceptStates[index];
                        hashTable[element].EPSILON.push(operand1.initialState);
                        hashTable[element].accept = false;
                    }

                    for (let index = 0; index < operand1.acceptStates.length; index++) {
                        const element = operand1.acceptStates[index];
                        result.acceptStates.push(element);
                    }

                    finalStack.push(result);
                }

            break;
            default: // Lorsqu'il n'y a rien
                finalStack.push(element);
            break;
        }
    }
}

function Parse(infixRegex){
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
