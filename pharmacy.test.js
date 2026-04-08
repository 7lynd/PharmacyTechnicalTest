import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
// Ancien test qui ne couvrait pas grand chose
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    ); 
  });

  describe("General", () => {
    it ("should degrade the benefit twice as fast after the expiration date", () => {
      expect(new Pharmacy([new Drug("test", 0, 10)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 8)]
      );     
    });

    it("should not decrease benefit below 0", () => {
      expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
        [new Drug("test", 1, 0)],
      );
    });

    // Tous les medicaments ne doivent pas depasser 50 meme si dans notre code il n'y a que Fervex et Herbal Tea qui augmentent
    // On va donc en utiliser un des deux
    it("should not increase benefit over 50", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 4, 50)]
      );
    });
  })

  // On test d'abord les cas particuliers
  describe("Herbal Tea", () => {
    it("should increase benefit by 1 each day", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 5, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 4, 31)]
      );
    })
    it("should increase benefit by 2 after the expiration date", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 0, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", -1, 32)]
      );
    })
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 each day", () => {
      expect(new Pharmacy([new Drug("Fervex", 15, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 14, 31)]
      );
    })

    it("should increase benefit by 2 if expiration is under 10 days", () => {
      expect(new Pharmacy([new Drug("Fervex", 9, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 8, 32)]
      );
    })

    it("should increase benefit by 3 if expiration is under 5 days", () => {
      expect(new Pharmacy([new Drug("Fervex", 4, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 3, 33)]
      );
    })

    it("should set benefit to 0 after expiration date", () => {
      expect(new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", -1, 0)]
      );
    })

    // Meme si deja testé en general faut tester avec Fervex que ca rentre pas dans un cas particulier
    it("should not increase benefit over 50", () => {
      expect(new Pharmacy([new Drug("Fervex", 5, 50)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 4, 50)]
      );
    });
  });

  describe("Magic Pill", () => {
    it("should never expire or decrease benefit", () => {
      expect(new Pharmacy([new Drug("Magic Pill", 10, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Magic Pill", 10, 30)]
      );
    });
  });

  // On fait deja le test du Dafalgan comme ça on pourra le tester des que c'est implémenté
  describe("Dafalgan", () => {
    it("should decrease benefit twice as normal drugs", () => {
      expect(new Pharmacy([new Drug("Dafalgan", 5, 10)]).updateBenefitValue()).toEqual(
        [new Drug("Dafalgan", 4, 8)]
      );
    })
  });

  // Enfin on test un medicament normal
  describe("Normal drug", () => {
    it("should decrease benefit and expiresIn by 1 if date not passed", () => {
      expect(new Pharmacy([new Drug("test", 5, 10)]).updateBenefitValue()).toEqual(
        [new Drug("test", 4, 9)]
      );
    });

    it("should decrease twice as fast after expiration date", () => {
      expect(new Pharmacy([new Drug("test", 0, 10)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 8)]
      );
    });
  });
});
