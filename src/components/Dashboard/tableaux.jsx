import React, { useEffect, useState } from "react";
import s from "./tableaux.module.css";

const Tableaux = ({ voitures, setVoitures }) => {
  const [inp, setInp] = useState("");
  const [resultats, setResultats] = useState(voitures);

  useEffect(() => {
    if (inp.length >= 4) {
      setResultats(
        voitures.filter(
          (value) =>
            value.plaque.includes(inp.toUpperCase()) ||
            value.proprietaire.toUpperCase().includes(inp.toUpperCase())
        )
      );
    } else {
      setResultats(voitures);
    }
  }, [inp, voitures]);

  function chercher2(e) {
    e.preventDefault();
    setResultats(
      voitures.filter((value) => value.plaque.includes(inp.toUpperCase()))
    );
  }

  function supprimerVoiture(id) {
    if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
      setVoitures(voitures.filter((v) => v.id !== id));
    }
  }

  function modifierVoiture(voiture) {
    alert(
      `Modifier la voiture ${voiture.plaque} (${voiture.proprietaire})\nÀ remplacer par un vrai formulaire de modification`
    );
  }

  return (
    <div className={s.container}>
      <form action="">
        <div>
          <label htmlFor="">
            <input
              placeholder="Rechercher..."
              type="text"
              onChange={(e) => setInp(e.target.value)}
            />
            <img
              src="/image/search.png"
              alt="icon de recherche"
              onClick={(e) => chercher2(e)}
            />
          </label>
        </div>
      </form>
      {resultats.length === 0 ? (
        <h1>Aucun résultat</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Immatriculation</th>
              <th>Nom</th>
              <th>Service</th>
              <th>Date d'entrée</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resultats.map((value) => (
              <tr
                key={value.id}
                style={{
                  backgroundColor:
                    value.statut === "en cours" ? "#6fe979b0" : "",
                }}
              >
                <td>{value.id}</td>
                <td>{value.plaque}</td>
                <td>{value.proprietaire}</td>
                <td>{value.service}</td>
                <td>{value.dateEntree}</td>
                <td>
                  {/* <button onClick={() => modifierVoiture(value)}>
                    Modifier
                  </button> */}
                  <img className="img" src="/image/pen.png" alt="" />
                  <img className="img" src="/image/bin.png" alt="" />
                  {/* <button onClick={() => supprimerVoiture(value.id)}>
                    Supprimer
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tableaux;
