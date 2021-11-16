const getAlphabet = (alphabet) => {
    const tab = ['*','+','/','`','.','|','-']
    for(var i=0; i<alphabet.length;i++){
        if(tab.indexOf(alphabet[i]) != -1){
            return false
        }
    }
    return true;
}