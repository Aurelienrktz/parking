import React, { useState } from "react";
import s from "./information.module.css"; // tu peux garder ton CSS existant

function Formulaire({ AjouterVoiture, numero }) {
  const [voiture, setVoiture] = useState({
    nom: "",
    immatr: "",
  });
function handleSubmit(e) {
  e.preventDefault();

  // Vérifications simples
  if (voiture.nom.trim() === "") {
    alert("Veuillez entrer le nom du propriétaire");
    return;
  }
  if (voiture.immatr.trim() === "") {
    alert("Veuillez entrer l'immatriculation de la voiture");
    return;
  }

  // Création de la date au format YYYY-MM-DD HH:mm
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // Appel de la fonction du parent
  // Ici, AjouterVoiture doit être passé depuis le parent
  // avec le service correct ("Parking" ou "Lavage")
AjouterVoiture(
  voiture.immatr.toUpperCase(), // immatriculation
  date, // date d'entrée
  voiture.nom // propriétaire
);


  // Reset du formulaire
  setVoiture({ nom: "", immatr: "" });
}


  return (
    <form className={s.container2} onSubmit={handleSubmit}>
      <h1>Enregistrement Place N°{numero}</h1>

      <label>Nom du propriétaire :</label>
      <input
        type="text"
        value={voiture.nom}
        onChange={(e) => setVoiture({ ...voiture, nom: e.target.value })}
      />

      <label>Immatriculation de la voiture :</label>
      <input
        type="text"
        value={voiture.immatr}
        onChange={(e) => setVoiture({ ...voiture, immatr: e.target.value })}
      />

      <button type="submit">AJOUTER</button>
    </form>
  );
}

export default Formulaire;
