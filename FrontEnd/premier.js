function fetchWorks () {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      displayGallery(data); // pour afficher gallery dans console
      console.log(data);
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
  
  
  // const dotsContainer = document.querySelector(".dots"); 
  
  // function createDots() {
  // 	dotsContainer.innerHTML = ""; // Vider le conteneur avant de le remplir
  // }
  // 	for (let i = 0; i < slides.length; i++) {
  // 	  const dot = document.createElement("div");
  // 	  dot.classList.add("dot");
  // 	  if (i === currentSlide) {
  // 		dot.classList.add("dot_selected");
  // 	  }
  // 	  dotsContainer.appendChild(dot);
  // 	}
  
  
  
  
  
  
  
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
  
  const Filter = document.querySelector(".filter");
  //récupération de la div du bouton
  const btnFilter = document.createElement("button");
  //création du bouton
  Filter.appendChild(btnFilter);
  //ajout du bouton dans la div
  
  btnFilter.textContent = "work.category";
  //ajout du nom de la catégorie dans le bouton
  }
  
  const Filter = document.querySelector(".filter");
  //récupération de la div du bouton
  
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.addEventListener("click", () => displayGallery(works)); // affiche tous les projets
  Filter.appendChild(allBtn);
  // Ajout du bouton "Tous"
  
  
  // // Création d’un bouton pour chaque catégorie
  // categories.forEach(category => {
  const btn = document.createElement("button");
  btn.textContent = category.name;
  btn.addEventListener("click", () => {
  const filteredWorks = works.filter(work => work.categoryId === category.id);
  displayGallery(filteredWorks);
  });
  Filter.appendChild(btn);
  // });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    btnFilter.classList.add('input[type="submit"]');
  
    function createFilter() {
  
    }
  
    
  
    
  
  
  
  
      // ajouter les boutons dans le html
      // bouton cliqué avec ce style : input[type="submit"]{
  
  
      // async function createFilterButtons() {
      //   try {
      //     const response = await fetch("http://localhost:5678/api/categories");
      //     const categories = await response.json();
      
      //     const filterContainer = document.querySelector(".filter");
      
      //     // Créer le bouton "Tous"
      //     const allBtn = document.createElement("button");
      //     allBtn.textContent = "Tous";
      //     allBtn.classList.add("active"); // tu peux ajouter une classe active par défaut
      //     allBtn.addEventListener("click", () => {
      //       displayGallery(allWorks); // on affiche tous les travaux
      //     });
      //     filterContainer.appendChild(allBtn);
      
      //     // Créer un bouton pour chaque catégorie
      //     categories.forEach(category => {
      //       const button = document.createElement("button");
      //       button.textContent = category.name;
      //       button.addEventListener("click", () => {
      //         const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
      //         displayGallery(filteredWorks);
      //       });
      //       filterContainer.appendChild(button);
      //     });
      //   } catch (error) {
      //     console.error("Erreur lors de la création des boutons :", error);
      //   }
      // }
      
  
      

  // Création d’un bouton pour chaque catégorie
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.classList.add("button"); 

    btn.addEventListener("click", () => {
      
      const filteredWorks = works.filter(work => work.categoryId === category.id);
      btn.classList.add("active"); // Ajout de la classe active au bouton cliqué
      displayGallery(filteredWorks);
      const staticWorks = works.filter(work => work.categoryId ===! category.id);
      btn.classList.remove("active");
      displayGallery(staticWorks);

      
    });
      filterDiv.appendChild(btn);
  });


  if (filteredWorks) {
    btn.classList.add("active"); // Ajout de la classe active au bouton cliqué
  }
  else {
    btn.classList.remove("active"); // Suppression de la classe active si le bouton n'est pas cliqué
  }



  
function createFilter(categories) {
  const filterDiv = document.querySelector(".filter");

  // Ajout du bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.addEventListener("click", () => displayGallery(works)); // affiche tous les projets
  filterDiv.appendChild(allBtn);

  // Création d’un bouton pour chaque catégorie
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.classList.add("button"); 

    btn.addEventListener("click", () => {
      
      let filteredWorks = works.filter(work => work.categoryId === category.id);
      btn.classList.add("active"); // Ajout de la classe active au bouton cliqué
      displayGallery(filteredWorks);

    });
      filterDiv.appendChild(btn);
  });
}





      