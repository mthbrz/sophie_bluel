// Lorsque le couple identifiant et mot de passe 
// n’est pas bon pour se connecter 
// il faut afficher le message d’erreur: 
// “Erreur dans l’identifiant ou le mot de passe”

// Lorsque le couple identifiant et mot de passe est correct,
// alors il faut rediriger vers la page du site 
// avec cette fois ci des boutons d’actions pour éditer le site.


const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Supprimer le message d'erreur précédent s’il existe
  const error = document.querySelector(".error-message");
  if (error) {
    error.remove();
  }

  // Récupération des valeurs du formulaire
  const email = document.querySelector("[name=email]").value;
  const password = document.querySelector("[name=password]").value;

  const login = {
    email: email,
    password: password
  };

  // Récupération du token
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      showError("Erreur dans l’identifiant ou le mot de passe");
    }
  } catch (error) {
    showError("Erreur lors de la connexion.");
  }
});

function showError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.classList.add("error-message");
  document.querySelector(".login-form").appendChild(errorMessage);
}









// email	sophie.bluel@test.tld
// password 	S0phie 