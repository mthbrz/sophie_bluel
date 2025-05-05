let monTableau = ["valeur1", "valeur2", "valeur3"];

// On peut utiliser le constructeur Set pour transformer
// un Array en Set
let monSet = new Set(monTableau);

monSet.has("valeur1"); // renvoie true

// Et utiliser l'opérateur de décomposition pour
// transformer un Set en Array.
console.log([...monSet]); // affichera la même chose que monTableau





// login.js

function fetchLogin () {
    fetch("http://localhost:5678/api/users/login")
    .then(response => response.json())
    .then(login => {
      console.log(login);
      })
    }

fetchLogin ();


// login js 2





// Lorsque le couple identifiant et mot de passe 
// n’est pas bon pour se connecter 
// il faut afficher le message d’erreur: 
// “Erreur dans l’identifiant ou le mot de passe”

// Lorsque le couple identifiant et mot de passe est correct,
// alors il faut rediriger vers la page du site 
// avec cette fois ci des boutons d’actions pour éditer le site.


//export ?
function listenerLogin() {
  const loginForm = document.querySelector(".login-form");
  loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Création de l’objet du nouvel avis.
  const authentication = {
      email: event.target.querySelector("[name=email]"),
      password: event.target.querySelector("[name=password]"),     
  };

  // Création de la charge utile au format JSON
  const chargeUtile = JSON.stringify(authentication);
  // Appel de la fonction fetch avec toutes les informations nécessaires
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
  });
  });
  
}
listenerLogin();



const email = document.querySelector("#email");
const password = document.querySelector("#password");

function redirection(email) {
  if (email === "sophie.bluel@test.tld" ) {
      window.location.href = "index.html"; // Redirige vers la page d'accueil
  }
  else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
      errorMessage.style.color = "red";
      document.querySelector(".login-form").appendChild(errorMessage);
  }
}

redirection(email);



// email	sophie.bluel@test.tld
// password 	S0phie


const email = "sophie.bluel@test.tld";
const password = "S0phie";

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

const error = document.querySelector(".error-message");
if (error) {
  error.remove(); }

  if (email === document.querySelector("[name=email]").value 
  && password === document.querySelector("[name=password]").value) {
      window.location.href = "index.html"; }
      else {
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
          errorMessage.style.color = "red";
          errorMessage.classList.add("error-message");
          document.querySelector(".login-form").appendChild(errorMessage);
      }

      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        });
    
        const data = await response.json();
    
        if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          showError("Identifiants incorrects.");
        }
      } catch (error) {
        showError("Erreur lors de la connexion.");
      }
    });

// modale infernale

    const openModal = function (e) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      target.style.display = null;
    }
    
    document.querySelectorAll(".modal").forEach(a => {
      a.addEventListener("click", openModal);
      popupModal.style.display = null
    
    }
    )
    const modal = document.querySelector(".modal");
    
    
    
    
    const popupModal = document.querySelector("#modal1");
    popupModal.addEventListener("click", 
    
    popupModal.style.display = null)



    function fetchWorks () {
      fetch("http://localhost:5678/api/works")
      .then(response => response.json())
      .then(data => {
        displayGalleryModal(data); 
        works = data; // pour stocker les données dans la variable works
        })
         
     }
    
    fetchWorks();
    
    
    function displayGalleryModal(works) {
      const galleryModal = document.querySelector(".gallery-modal");
      galleryModal.innerHTML = ""; // je vide la galerie avant de la remplir avec les data de l'api
        
      works.forEach(work => {
        const figureModal = document.createElement("figure");
        
        const imageModal = document.createElement("img");
        imageModal.src = work.imageUrl;
        
        // création de chaque balise supprimée auparavant
        // modification de la provenance en utilisant le chemin relié à l'api
        
          figureModal.appendChild(imageModal);  
          galleryModal.appendChild(figureModal);
    
        // puis on les rattache à l'élément parent
        });
      }
    
    displayGalleryModal(works); // Appel de la fonction pour afficher la galerie dans la modale

    


    window.addEventListener('click', function () {
      hiddenModal.style.display = "none"; // Cacher la modale
      }
    );