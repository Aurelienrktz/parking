import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./components/Dashboard";
import Parking from "./components/parking";
import Lavage from "./components/lavage";
import { VoituresContexte, AfficherBar } from "./MyContexte";
import "./App.css";

export function App() {
  const [voitures, setVoitures] = useState([
    {
      id: 1,
      plaque: "MAT-4527-AB",
      service: "Parking",
      dateEntree: "2025-09-10 08:15",
      dateSortie: null,
      statut: "en cours",
      numPark: 1,
      proprietaire: "Andry Rakoto",
    },
    {
      id: 2,
      plaque: "RAS-1983-CD",
      service: "Lavage",
      dateEntree: "2025-09-11 09:30",
      dateSortie: "2025-09-11 10:15",
      statut: "terminé",
      numLavage: 0,
      proprietaire: "Liva Raso",
    },
    {
      id: 3,
      plaque: "AND-7625-EF",
      service: "Parking",
      dateEntree: "2025-09-09 14:20",
      dateSortie: "2025-09-10 07:50",
      statut: "terminé",
      numPark: 0,
      proprietaire: "Hery Andrianina",
    },
    {
      id: 4,
      plaque: "RAH-5490-GH",
      service: "Parking",
      dateEntree: "2025-09-11 07:45",
      dateSortie: null,
      statut: "en cours",
      numPark: 5,
      proprietaire: "Mamy Raharison",
    },
    {
      id: 5,
      plaque: "RAN-8312-IJ",
      service: "Lavage",
      dateEntree: "2025-09-11 11:00",
      dateSortie: null,
      statut: "en cours",
      numLavage: 3,
      proprietaire: "Riana Rakotobe",
    },
    {
      id: 6,
      plaque: "TSI-2648-KL",
      service: "Parking",
      dateEntree: "2025-09-08 16:10",
      dateSortie: "2025-09-09 08:00",
      statut: "terminé",
      numPark: 0,
      proprietaire: "Tsiry Randrianarisoa",
    },
    {
      id: 7,
      plaque: "FAN-9051-MN",
      service: "Lavage",
      dateEntree: "2025-09-10 15:40",
      dateSortie: "2025-09-10 16:20",
      statut: "en cours",
      numLavage: 5,
      proprietaire: "Faniry Rahantanirina",
    },
    {
      id: 8,
      plaque: "NIR-3876-OP",
      service: "Parking",
      dateEntree: "2025-09-11 10:05",
      dateSortie: null,
      statut: "en cours",
      numPark: 6,
      proprietaire: "Nirina Rasoanaivo",
    },
    {
      id: 9,
      plaque: "ZRA-6710-QR",
      service: "Parking",
      dateEntree: "2025-05-01 09:00",
      dateSortie: "2025-09-08 07:30",
      statut: "terminé",
      numPark: 0,
      proprietaire: "Zo Rakotomalala",
    },
    {
      id: 10,
      plaque: "TOJ-1429-ST",
      service: "Lavage",
      dateEntree: "2025-06-11 08:50",
      dateSortie: "2025-09-11 09:25",
      statut: "terminé",
      numLavage: 0,
      proprietaire: "Tojo Andriamihaja",
    },
    {
      id: 11,
      plaque: "JOE-8734-UV",
      service: "Parking",
      dateEntree: "2025-09-11 06:45",
      dateSortie: null,
      statut: "en cours",
      numPark: 7,
      proprietaire: "Joel Rakotoniaina",
    },
    {
      id: 12,
      plaque: "AIN-4938-WX",
      service: "Parking",
      dateEntree: "2025-09-09 18:00",
      dateSortie: "2025-09-10 08:10",
      statut: "terminé",
      numPark: 0,
      proprietaire: "Aina Ravelonirina",
    },
    {
      id: 13,
      plaque: "KET-2157-YZ",
      service: "Lavage",
      dateEntree: "2025-09-11 12:10",
      dateSortie: null,
      statut: "en cours",
      numLavage: 2,
      proprietaire: "Ketaka Andriamahenina",
    },
    {
      id: 14,
      plaque: "SIT-6082-BA",
      service: "Parking",
      dateEntree: "2025-09-10 20:00",
      dateSortie: "2025-09-11 07:00",
      statut: "terminé",
      numPark: 0,
      proprietaire: "Sitraka Raharimalala",
    },
    {
      id: 15,
      plaque: "TAH-7519-DC",
      service: "Parking",
      dateEntree: "2025-09-11 09:20",
      dateSortie: null,
      statut: "en cours",
      numPark: 10,
      proprietaire: "Tahina Andriantsoa",
    },
  ]);

  function AjouterVoiture(id, plaque, serv, dateE, numPark, proprietaire) {
    setVoitures([
      ...voitures, // on garde toutes les voitures actuelles
      {
        id: voitures.length + 1,
        plaque: plaque,
        service: serv,
        dateEntree: dateE,
        dateSortie: null,
        statut: "en cours",
        numPark: numPark,
        proprietaire: proprietaire,
      },
    ]);
  }
  const [afficher, setAfficher] = useState(false);
  function cacher() {
    setAfficher(!afficher);
  }

  return (
    <VoituresContexte.Provider value={voitures}>
      <Router>
        <div className="container">
          <div className="burger" onClick={cacher}>
            <div className={afficher ? "active1" : ""}></div>
            <div className={afficher ? "active2" : ""}></div>
            <div className={afficher ? "active3" : ""}></div>
          </div>

          {/* Navbar */}
          <Header afficher={afficher} cacher={cacher} />

          {/* Pages */}
          <Routes>
            <Route path="/" element={<Dashboard setVoitures={setVoitures} />} />
            <Route
              path="/parking"
              element={
                <Parking voitures={voitures} AjouterVoiture={AjouterVoiture} />
              }
            />
            <Route
              path="/lavage"
              element={
                <Lavage voitures={voitures} AjouterVoiture={AjouterVoiture} />
              }
            />
          </Routes>
        </div>
      </Router>
    </VoituresContexte.Provider>
  );
}
