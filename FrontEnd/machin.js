let monTableau = ["valeur1", "valeur2", "valeur3"];

// On peut utiliser le constructeur Set pour transformer
// un Array en Set
let monSet = new Set(monTableau);

monSet.has("valeur1"); // renvoie true

// Et utiliser l'opérateur de décomposition pour
// transformer un Set en Array.
console.log([...monSet]); // affichera la même chose que monTableau



