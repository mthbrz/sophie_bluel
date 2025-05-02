
// Récupération de la galerie d'images depuis l'API
// et affichage dans la page
// premier fetch

function fetchWorks () {
  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    displayGallery(data); 
    works = data; // pour stocker les données dans la variable works
    console.log(data); // pour afficher gallery dans console
    })
     
 }

fetchWorks();

let works = [];


function displayGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // je vide la galerie avant de la remplir avec les data de l'api
      
    works.forEach(work => {
      const figure = document.createElement("figure");
      
      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;
      
      const caption = document.createElement("figcaption");
      caption.textContent = work.title;

      // création de chaque balise supprimée auparavant
      // modification de la provenance en utilisant le chemin relié à l'api
      
        figure.appendChild(image);  
        figure.appendChild(caption);
        gallery.appendChild(figure);

      // puis on les rattache à l'élément parent
      });
    }


// Fonction pour récupérer les catégories de l'api
// et créer les boutons de filtre
// seconde fetch



function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      createFilter(categories);
      console.log(categories); // pour afficher les catégories dans la console
    })
}

fetchCategories();


function createFilter(categories) {
  const filterDiv = document.querySelector(".filter");

  // Ajout du bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("button");

  allBtn.addEventListener("click", () => {
    // Retirer "active" de tous les boutons
    const allButtons = document.querySelectorAll(".filter button");
    allButtons.forEach(button => button.classList.remove("active"));

    // Activer uniquement ce bouton
    allBtn.classList.add("active");

    // Afficher tous les projets
    displayGallery(works);
  });
  
  filterDiv.appendChild(allBtn);


  // Création d’un bouton pour chaque catégorie
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.classList.add("button");

    btn.addEventListener("click", () => {
      // Retirer "active" de tous les boutons
      const allButtons = document.querySelectorAll(".filter button");
      allButtons.forEach(button => button.classList.remove("active"));

      // Activer uniquement ce bouton
      btn.classList.add("active");

      // Filtrer les projets et les afficher
      const filteredWorks = works.filter(work => work.categoryId === category.id);
      displayGallery(filteredWorks);
    });

    filterDiv.appendChild(btn);
  });
}

const token = localStorage.getItem("token");

const filterDiv = document.querySelector(".filter");
const modifierLink = document.querySelector(".btn-modifier a");
modifierLink.style.display = "none"; // Cacher le bouton "modifier" par défaut
const banner = document.querySelector(".banner");
banner.style.display = "none"; // Cacher la bannière par défaut
const logoutLink = document.querySelector(".logout-link");
logoutLink.style.display = "none"; // Cacher le lien de déconnexion par défaut
const loginLink = document.querySelector(".login-link");


if (token) {

  filterDiv.style.display = "none"; // Supprimer les filtres quand l'utilisateur est connecté
  modifierLink.style.display = "flex"; // Afficher le bouton "modifier" quand l'utilisateur est connecté
  banner.style.display = "flex"; // Afficher la bannière quand l'utilisateur est connecté
  loginLink.style.display = "none"; // Cacher le lien de connexion quand l'utilisateur est connecté
  logoutLink.style.display = "block"; // Afficher le lien de déconnexion quand l'utilisateur est connecté
  
  console.log("Utilisateur connecté");
} else {
  console.log("Utilisateur non connecté");
}







 
    

    