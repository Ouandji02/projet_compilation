const verificationLangage = (alphabet,langage) => {
    
    for(j=0; j<langage.length;j++){
        if(alphabet.indexOf(langage[j]) == -1){
            if(['*','+','|','.','(',')'].indexOf(langage[j]) == -1){
                alert(langage[j])
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
        if(i==langage.length-1 && ['.','|'].indexOf(langage[i])!=-1){
            return false
        }
    }
    if(correct != 0){
        return false
    }else{
        return true
    }
}