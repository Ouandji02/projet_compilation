const verificationLangage = (alphabet,langage) => {
    
    for(j=0; j<langage.length;j++){
        if(alphabet.indexOf(langage[j]) == -1){
            alert('faux')
            return false
        }
    }
    var correct = 0;
    for(var i=0; i<=langage.length; i++){
        if(i==0 && (['*','+','|','.'].indexOf(langage[i]) != -1)){
            alert('1')
            return false
        }
        if(langage[i] == '('){
            alert('2')
            correct++;
        }
        if(langage[i+1] == ')'){
            alert('3')
            correct --;
        }
        if(langage[i] == '*' && langage[i+1]=="*"){
            alert('4')
            return false
        }
        if(langage[i] == "|" && langage[i+1] == "|"){
            alert('5')
            return false
        }
        if(langage[i] == "." && langage[i+1] == "."){
            alert('6')
            return false
        }
        if(langage[i] == "." && langage[i+1] == "*"){
           alert('7')
            return false
        }
    }
    if(correct != 0){
        return true
    }else{
        alert('8')
        return false
    }
}