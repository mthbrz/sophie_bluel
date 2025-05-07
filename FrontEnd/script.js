
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
// second fetch



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

const hiddenModal1 = document.querySelector(".modal1");
hiddenModal1.style.display = "none"; // Cacher la modale par défaut

const hiddenModal2 = document.querySelector(".modal2");
hiddenModal2.style.display = "none";

if (token) {

  filterDiv.style.display = "none"; // Supprimer les filtres quand l'utilisateur est connecté
  modifierLink.style.display = "flex"; // Afficher le bouton "modifier" quand l'utilisateur est connecté
  banner.style.display = "flex"; // Afficher la bannière quand l'utilisateur est connecté
  loginLink.style.display = "none"; // Cacher le lien de connexion quand l'utilisateur est connecté
  logoutLink.style.display = "block"; // Afficher le lien de déconnexion quand l'utilisateur est connecté
  
  if (logoutLink) {
    logoutLink.addEventListener("click", function(event) {
      event.preventDefault(); 
      localStorage.removeItem("token"); // Supprimer le token du localStorage
      window.location.href = "index.html"; 
    });
  }
  console.log("Utilisateur connecté");
} else {
  console.log("Utilisateur non connecté");
}

// modale

// Bouton pour ouvrir la modale 1 Galerie Photo
const openModalBtn = document.querySelector(".open-modal");

if (token && openModalBtn) {
  openModalBtn.addEventListener("click", function () {
    hiddenModal1.style.display = "flex"; // Affiche la modale
    fetchWorksModal(); // Charge et affiche les projets dans la modale
  });
}

// Fonction dédiée à la version modale de fetch
function fetchWorksModal() {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      displayGalleryModal(data);
    });
}

// Affichage des projets dans la galerie modale
function displayGalleryModal(works) {
  const galleryModal = document.querySelector(".gallery-modal");
  galleryModal.innerHTML = "";

  works.forEach(work => {
    const figureModal = document.createElement("figure");
    figureModal.classList.add("modal-figure");

    const imageModal = document.createElement("img");
    imageModal.src = work.imageUrl;  

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; 
    deleteBtn.classList.add("delete");

    figureModal.appendChild(imageModal);
    galleryModal.appendChild(figureModal);
    figureModal.appendChild(deleteBtn); 

    deleteBtn.addEventListener("click", function () {
      deleteWork(work.id);// Appel de la fonction de suppression
    });

  });

}



// Fermeture de la modale au clic sur la croix
// fonctionne pour les deux modales
const closeModalBtn = document.querySelector(".close-modal");
closeModalBtn.addEventListener("click", function () {
  hiddenModal1.style.display = "none";
});

// Fermeture des modales si on clique en dehors
hiddenModal1.addEventListener("click", function (event) {
  if (event.target === hiddenModal1) {
    hiddenModal1.style.display = "none";
  }
});
hiddenModal2.addEventListener("click", function (event) {
  if (event.target === hiddenModal2) {
    hiddenModal2.style.display = "none";
  }
});

// Ouverture de la modale 2 pour ajouter une photo
const addPhotoBtn = document.querySelector(".add");

addPhotoBtn.addEventListener("click", function () {
  hiddenModal2.style.display = "flex"; // Affiche la modale 2
  hiddenModal1.style.display = "none"; // Cache la modale 1

  // Réinitialiser le formulaire à chaque ouverture de la modale 2
  form.reset();

  // Réinitialiser l'aperçu d'image
  clickableArea.innerHTML = `<i class="fa-regular fa-image"></i>
  <button type="button" class="add-image">+ Ajouter photo</button>
  <h4>jpg, png : 4mo max</h4>`;

  // Réinitialiser l'état du bouton "Valider"
  submitBtn.classList.remove("active");
  submitBtn.classList.add("inactive");

  // Réinitialiser la valeur du select
  categoryInput.value = ""; 

});



// retour modale 1 depuis modale 2
const backToModal1Btn = document.querySelector(".back");
backToModal1Btn.addEventListener("click", function () {
  hiddenModal2.style.display = "none"; // Cache la modale 2
  hiddenModal1.style.display = "flex"; // Affiche la modale 1
});

// Suppression des travaux existants

function deleteWork(workId) {
  // Vérifier si le token est présent
  const token = localStorage.getItem("token");


  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {

      works = works.filter(work => work.id !== workId);
      // Mise à jour du tableau avec filter pour ne garder
      // que les travaux avec un id différent de celui supprimé 

      displayGallery(works); // Mise à jour de la galerie principale       
      displayGalleryModal(works); // Mise à jour de la galerie modale
     
    } else {
      console.error("Erreur lors de la suppression du projet");
    }
  })
  .catch(error => {
    console.error("Erreur réseau :", error);
  });
}


// Ajout d'un nouveau projet
// Récupération des catégories pour le formulaire d'ajout de projet

 function fetchCategoriesForm() {
   fetch("http://localhost:5678/api/categories")
     .then(response => response.json())
     .then(categories => {
       const select = document.getElementById("category");

       const emptyOption = document.createElement("option");
      emptyOption.value = ""; // Valeur vide pour l'option par défaut
      emptyOption.disabled = true;
      emptyOption.selected = true;
      select.appendChild(emptyOption);

       categories.forEach(category => {
        
         const option = document.createElement("option");
         option.value = category.id;  
         option.textContent = category.name;   
         select.appendChild(option);
       });
     })
    
 }

 fetchCategoriesForm();

// Récupération du formulaire d'ajout de projet
// et ajout d'un événement pour la soumission

const form = document.getElementById("add-project-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const formData = new FormData(form);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    return response.json();
  })
  .then(newWork => {
    console.log("Projet ajouté avec succès :", newWork);

    works.push(newWork); 

    displayGallery(works);  
    displayGalleryModal(works);   

    form.reset(); 

    // Remettre l'affichage par défaut de la zone cliquable
clickableArea.innerHTML = `<i class="fa-regular fa-image"></i>
<button type="button" class="add-image">+ Ajouter photo</button>
<h4>jpg, png : 4mo max</h4>
`;

  // Remettre l'affichage par défaut du bouton valider
submitBtn.classList.remove("active");
submitBtn.classList.add("inactive");

// Remettre l'affichage par défaut de la zone catégorie
categoryInput.value = ""; 

  })
  .catch(error => {
    console.error("Erreur :", error);
  });
});

// Affichage de l'image sélectionnée dans la zone cliquable

const input = document.getElementById("image");
const clickableArea = document.getElementById("clickable-area");

clickableArea.addEventListener("click", () => {
  input.click(); 
});

input.addEventListener("change", () => {
  const file = input.files[0];

  if (file) {
    const reader = new FileReader(); 
// outil js qui permet de lire un fichier local (côté client)
// sans l’envoyer sur le serveur

    reader.onload = function (e) {
      // Créer un élément image
      const imagePreview = document.createElement("img");
      imagePreview.src = e.target.result;
      imagePreview.alt = "Aperçu";
      imagePreview.classList.add("image-preview");

      // Vider la zone clickable et y insérer l'image
      clickableArea.innerHTML = ""; 
      clickableArea.appendChild(imagePreview);
    };

    reader.readAsDataURL(file); // Lire l'image pour la prévisualiser
   // demande à FileReader de lire le fichier comme une URL
   // ce qui déclenche l'événement reader.onload

  }
});

// Supprime l’image prévisualisée
const previewImg = clickableArea.querySelector("img");
if (previewImg) {
  previewImg.remove();
}


// Modification du bouton valider

const imageInput = document.getElementById("image");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const submitBtn = document.getElementById("submit-btn");

function checkFormValidity() {
  const imageSelected = imageInput.files.length > 0;
  const titleSelected = titleInput.value.trim() !== "";
  const categorySelected = categoryInput.value !== "";

  if (imageSelected && titleSelected && categorySelected) {
    submitBtn.classList.remove("inactive");
    submitBtn.classList.add("active");
  } }
  // On surveille tous les champs
imageInput.addEventListener("change", checkFormValidity);
titleInput.addEventListener("input", checkFormValidity);
categoryInput.addEventListener("change", checkFormValidity);
