import React, { useEffect, useState } from "react";
import s from "./tableaux.module.css";

const Tableaux = ({ voitures, setVoitures }) => {
  const [inp, setInp] = useState("");
  const [resultats, setResultats] = useState(voitures);

  // Pour le modal de modification
  const [modalVisible, setModalVisible] = useState(false);
  const [voitureAModifier, setVoitureAModifier] = useState(null);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouvellePlaque, setNouvellePlaque] = useState("");

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

  function ouvrirModal(voiture) {
    setVoitureAModifier(voiture);
    setNouveauNom(voiture.proprietaire);
    setNouvellePlaque(voiture.plaque);
    setModalVisible(true);
  }

  function validerModification() {
    setVoitures(
      voitures.map((v) =>
        v.id === voitureAModifier.id
          ? { ...v, proprietaire: nouveauNom, plaque: nouvellePlaque }
          : v
      )
    );
    setModalVisible(false);
    setVoitureAModifier(null);
  }

  function fermerModal() {
    setModalVisible(false);
    setVoitureAModifier(null);
  }

  return (
    <div className={s.container}>
      <form>
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
                  <img
                    className="img"
                    src="/image/pen.png"
                    alt="Modifier"
                    onClick={() => ouvrirModal(value)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <img
                    className="img"
                    src="/image/bin.png"
                    alt="Supprimer"
                    onClick={() => supprimerVoiture(value.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal pour modifier */}
      {modalVisible && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Modifier la voiture</h2>
            <label>Nom du propriétaire :</label>
            <input
              type="text"
              value={nouveauNom}
              onChange={(e) => setNouveauNom(e.target.value)}
            />
            <label>Immatriculation :</label>
            <input
              type="text"
              value={nouvellePlaque}
              onChange={(e) => setNouvellePlaque(e.target.value)}
            />
            <div className={s.modalButtons}>
              <button onClick={validerModification}>Valider</button>
              <button onClick={fermerModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tableaux;
