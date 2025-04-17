fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    displayGallery(data); // pour afficher gallery dans console
    })
  

  
function displayGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // je vide la galerie avant de la remplir avec les data de l'api
        console.log(gallery); // la galerie est bien vide
      
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