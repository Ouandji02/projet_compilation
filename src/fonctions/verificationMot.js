const verificationMot = function(mot,langage){
    for(var i=0; i<mot.length;i++){
        if(langage.indexOf(mot[i]) == -1){
            return false
        }
        if(['*','|','.','(',')'].indexOf(mot[i])!=1){
            return false
        }
    }
    return true

}