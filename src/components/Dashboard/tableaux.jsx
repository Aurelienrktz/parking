import React, { useContext, useEffect, useState } from "react";
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
      // si moins de 4 caractères → on remet toutes les voitures
      setResultats(voitures);
    }
  }, [inp, voitures]);

  function chercher2(e) {
    e.preventDefault();
    setResultats(
      voitures.filter((value) => value.plaque.includes(inp.toUpperCase()))
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
      {resultats.length == 0 ? (
        <h1>Aucun resultat</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Immatricuation</th>
              <th>Nom</th>
              <th>Service</th>
              <th>Numero</th>
              <th>Date d'entrée</th>
            </tr>
          </thead>
          <tbody>
            {resultats.map((value, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      value.statut === "en cours" ? "#6fe979b0" : "",
                  }}
                >
                  <td>{value.id}</td>
                  <td>{value.plaque}</td>
                  <td>{value.proprietaire}</td>
                  <td>{value.service}</td>
                  <td>{value.numPark}</td>
                  <td>{value.dateEntree}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tableaux;
