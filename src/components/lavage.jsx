import React, { useState } from "react";
import Information from "./Parking/information";
import Formulaire from "./Parking/formulaire";
import s from "./styles/parking.module.css";

const Lavage = ({
  AjouterVoiture2,
  voitures,
  lavage,
  setLavage,
  voitureLavage,
  setVoitureLavage,
  setVoitures,
}) => {
  const [selectedNum, setSelectedNum] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [voitureAff, setVoitureAff] = useState({
    num: 0,
    proprietaire: "",
    voiture: "",
  });

  function Liberer(numLavage) {
    setVoitureLavage(voitureLavage.filter((v) => v.numLavage !== numLavage));
    setLavage(
      lavage.map((p) =>
        p.num === numLavage ? { ...p, voiture: "", proprietaire: "" } : p
      )
    );
    setVoitures(
      voitures.map((v) =>
        v.numLavage === numLavage ? { ...v, statut: "terminé" } : v
      )
    );
    if (activeForm === "info" && selectedNum === numLavage) {
      setActiveForm(null);
      setSelectedNum(null);
    }
  }

  function showInfo(num, voiture, proprietaire) {
    setSelectedNum(num);
    setActiveForm("info");
    setVoitureAff({ num, voiture, proprietaire });
  }

  function showForm(num) {
    setSelectedNum(num);
    setActiveForm("form");
  }

  return (
    <div className={s.container}>
      <img src="/image/Car wash-bro.png" alt="" />
      <h1>Gestion de Lavage</h1>
      <div className={s.parkinC}>
        {lavage.map((value) => (
          <div
            key={value.num}
            style={{
              backgroundColor: value.voiture === "" ? "#25ff37" : "#ff2525",
            }}
          >
            <h1>N°{value.num}</h1>
            <h6>{value.voiture === "" ? "Vide" : value.voiture}</h6>
            <button
              onClick={() => showForm(value.num)} // ok
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
          numero={selectedNum} // numéro exact de la place
          AjouterVoiture={(plaque, date, proprietaire) =>
            AjouterVoiture2(plaque, "Lavage", date, selectedNum, proprietaire)
          }
        />
      )}
    </div>
  );
};

export default Lavage;
