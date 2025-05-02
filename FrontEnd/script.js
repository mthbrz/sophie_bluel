
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

if (token) {
  console.log("Utilisateur connecté");
} else {
  console.log("Utilisateur non connecté");
}







 
    

    