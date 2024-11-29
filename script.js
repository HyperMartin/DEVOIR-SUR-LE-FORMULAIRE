// Récupération des éléments du DOM
const form = document.querySelector("form");
const errorMessage = document.getElementById("error-message");
const commentList = document.getElementById("comment-list");

// Fonction pour valider les champs du formulaire
function validateForm(formData) {
  const firstName = formData.get("first-name").trim();
  const lastName = formData.get("last-name").trim();
  const message = formData.get("message").trim();

  // Vérifie si tous les champs sont remplis
  if (!firstName || !lastName || !message) {
    return false; // Retourne false si un champ est vide
  }
  return { firstName, lastName, message }; // Retourne les valeurs si tout est valide
}

// Fonction pour ajouter un commentaire à la liste
function addComment(firstName, lastName, message) {
  // Création d'un nouvel élément de commentaire
  const newComment = document.createElement("div");
  newComment.className = "flex space-x-4 text-sm text-gray-500"; // Classes Tailwind
  newComment.innerHTML = `
    <div class="flex-1 py-10 border-t border-gray-200">
      <h3 class="font-medium text-gray-900">${firstName} ${lastName}</h3>
      <div class="prose prose-sm mt-4 max-w-none text-gray-500">
        <p>${message}</p>
      </div>
    </div>
  `;

  // Ajout du commentaire à la liste des commentaires
  commentList.appendChild(newComment);
}

// Ajout d'un écouteur d'événement sur le formulaire
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupération des données du formulaire
  const formData = new FormData(form);

  // Validation des champs
  const validatedData = validateForm(formData);
  if (!validatedData) {
    errorMessage.style.display = "block"; // Affiche le message d'erreur
    return; // Arrête l'exécution si le formulaire est invalide
  }

  // Cacher le message d'erreur si les champs sont valides
  errorMessage.style.display = "none";

  // Ajouter le commentaire
  addComment(validatedData.firstName, validatedData.lastName, validatedData.message);

  // Réinitialiser le formulaire
  form.reset();
});
