import React, { useState } from "react";
import Formulaire from "./Parking/formulaire";
import Information from "./Parking/information";
import s from "./styles/parking.module.css";

const Parking = ({
  voitures,
  AjouterVoiture,
  parking,
  setParking,
  voitureParking,
  setVoitureParking,
  setVoitures,
}) => {
  const [selectedNum, setSelectedNum] = useState(null);
  const [activeForm, setActiveForm] = useState(null); // "info" ou "form"
  const [voitureAff, setVoitureAff] = useState({
    num: 0,
    proprietaire: "",
    voiture: "",
  });

  // Libérer une place
  function Liberer(numPark) {
    setVoitureParking(voitureParking.filter((v) => v.numPark !== numPark));

    setParking(
      parking.map((p) =>
        p.num === numPark ? { ...p, voiture: "", proprietaire: "" } : p
      )
    );

    setVoitures(
      voitures.map((v) =>
        v.numPark === numPark ? { ...v, statut: "terminé" } : v
      )
    );

    if (activeForm === "info" && selectedNum === numPark) {
      setActiveForm(null);
      setSelectedNum(null);
    }
  }

  // Afficher les informations d'une place
  function showInfo(num, voiture, proprietaire) {
    setSelectedNum(num);
    setActiveForm("info");
    setVoitureAff({ num, voiture, proprietaire });
  }

  // Afficher le formulaire pour une place libre
  function showForm(num) {
    setSelectedNum(num);
    setActiveForm("form");
  }

  return (
    <div className={s.container}>
      <h1>Gestion Parking</h1>
      <div className={s.parkinC}>
        {parking.map((value) => (
          <div
            key={value.num}
            style={{
              backgroundColor: value.voiture === "" ? "#25ff37" : "#ff2525",
            }}
          >
            <h1>N°{value.num}</h1>
            <h6>{value.voiture === "" ? "Vide" : value.voiture}</h6>

            <button
              onClick={() => showForm(value.num)}
              style={{ display: value.voiture === "" ? "block" : "none" }}
            >
              Ajouter
            </button>
            <button
              onClick={() =>
                showInfo(value.num, value.voiture, value.proprietaire)
              }
              style={{ display: value.voiture !== "" ? "block" : "none" }}
            >
              Voir
            </button>
          </div>
        ))}
      </div>

      {activeForm === "info" && selectedNum === voitureAff.num && (
        <Information voitureAff={voitureAff} Liberer={Liberer} />
      )}

      {activeForm === "form" && (
        <Formulaire
          numero={selectedNum}
          AjouterVoiture={(immatr, date, proprietaire) =>
            AjouterVoiture(immatr, "Parking", date, selectedNum, proprietaire)
          }
        />
      )}
    </div>
  );
};

export default Parking;
