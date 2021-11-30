let et = 0

class EtatTransition {
	constructor(listeTransition, isfinal = true) {
		this.etiquetteEtat = et;
		this.listeTransition = listeTransition;
		this.isfinal = isfinal;
		et++;
	}
	
    getEtiquetteEtat() {
		return this.etiquetteEtat;
	}
	setEtiquetteEtat(etiquetteEtat) {
		this.etiquetteEtat = etiquetteEtat;
	}
	getListeTransition() {
		return this.listeTransition;
	}
	setListeTransition(listeTransition) {
		this.listeTransition = listeTransition;
	}
	getIsFinal() {
		return this.isfinal;
	}
	setIsFinal(isfinal) {
		this.isfinal = isfinal;
	}
}
