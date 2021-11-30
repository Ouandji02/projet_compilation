const formatage = function(mot){
    var motFormat=""
    for(var i=0; i<mot.length; i++){
        if(i == mot.length-1){
            motFormat=motFormat+mot[i]
            break
        }
        if(['|','.','+'].indexOf(mot[i])== -1 && ['*','|','.','+'].indexOf(mot[i+1])== -1){
            motFormat=motFormat+mot[i]
            motFormat=motFormat+'.'
        }else{
            motFormat=motFormat+mot[i]
        }
    }
    return motFormat
}