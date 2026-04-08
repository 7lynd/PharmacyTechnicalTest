export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    // On va parcourir l'ensemble des drugs pour gerer les differents cas et decrementer le expiresIn
    this.drugs.forEach(drug => {
      // Si c'est Magic Pill on passe directement au suivant car celui-ci n'est pas affecté par quoi que ce soit. 
      if (drug.name === "Magic Pill") return;
      
      if (drug.name === "Fervex") {
        // Si c'est inferieur a 50 on va pouvoir proceder a une incrementation
        if (drug.benefit < 50) {
          if (drug.expiresIn <= 0) { 
            drug.benefit = 0;
          } else if (drug.expiresIn < 6) {
            drug.benefit += 3;
          } else if (drug.expiresIn < 11) {
            drug.benefit += 2;
          } else { 
            drug.benefit +=1;
          }
        }
      } else if (drug.name === "Herbal Tea") {
        // Si c'est inferieur a 50 on va pouvoir proceder a une incrementation
        if (drug.benefit < 50) {
          if (drug.expiresIn > 0) {
            drug.benefit += 1;
          } else {
            drug.benefit += 2;
          }
        }
      } else if (drug.name === "Dafalgan") {
        // Se degrade deux fois plus vite donc -2 et -4 apres expiration 
        if (drug.benefit > 0) {
          if (drug.expiresIn > 0) {
            drug.benefit -= 2;
          } else {
            drug.benefit -= 4;
          }
        }
      } else {
        // Pour le cas d'un medicament normal, on applique une strategie de decrementation mais que si benefit est superieur a 0
        if (drug.benefit > 0) {
          if (drug.expiresIn > 0) { 
            drug.benefit -= 1;
          } else {
            drug.benefit -= 2;
          }
        }
      }

      drug.expiresIn -= 1;
      if (drug.benefit < 0) drug.benefit = 0;
    })

    return this.drugs;
  }
}
