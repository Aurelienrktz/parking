import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./components/Dashboard";
import Parking from "./components/parking";
import Lavage from "./components/lavage";
import Connexion from "./components/login";
import Inscription from "./components/inscription";
import { VoituresContexte } from "./MyContexte";
import "./App.css";

export function App() {
  // LISTE VOITURE GENERALE
  const [voitures, setVoitures] = useState([]);

  // LISTE VOITURE EN PARKING
  const [voitureParking, setVoitureParking] = useState([]);

  // LISTE VOITURE EN LAVAGE
  const [voitureLavage, setVoitureLavage] = useState([]);

  // LISTE PARKING
  const [parking, setParking] = useState(
    [...Array(10)].map((_, i) => ({
      num: i + 1,
      voiture: "",
      proprietaire: "",
    }))
  );

  // LISTE LAVAGE
  const [lavage, setLavage] = useState(
    [...Array(6)].map((_, i) => ({ num: i + 1, voiture: "", proprietaire: "" }))
  );

  // AJOUT PARKING
  function AjouterVoiture(plaque, serv, dateE, numPark, proprietaire) {
    const nouvelleVoiture = {
      id: voitures.length + 1,
      plaque,
      service: serv,
      dateEntree: dateE,
      dateSortie: null,
      statut: "en cours",
      numPark,
      proprietaire,
    };
    setVoitures([...voitures, nouvelleVoiture]);
    setVoitureParking([...voitureParking, nouvelleVoiture]);
    setParking(
      parking.map((p) =>
        p.num === numPark ? { ...p, voiture: plaque, proprietaire } : p
      )
    );
  }

  // AJOUT LAVAGE
  function AjouterVoiture2(plaque, serv, dateE, numLavage, proprietaire) {
    const nouvelleVoiture = {
      id: voitures.length + 1,
      plaque,
      service: serv,
      dateEntree: dateE,
      dateSortie: null,
      statut: "en cours",
      numLavage,
      proprietaire,
    };
    setVoitures([...voitures, nouvelleVoiture]);
    setVoitureLavage([...voitureLavage, nouvelleVoiture]);
    setLavage(
      lavage.map((p) =>
        p.num === numLavage ? { ...p, voiture: plaque, proprietaire } : p
      )
    );
  }

  const [afficher, setAfficher] = useState(false);

  function cacher() {
    setAfficher(!afficher);
  }

  // dans le JSX

  // CONNEXION
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/connexion" replace />;

  return (
    <VoituresContexte.Provider value={voitures}>
      <Router>
        <div className="container">
          <div className="burger" onClick={cacher}>
            <div className={afficher ? "active1" : ""}></div>
            <div className={afficher ? "active2" : ""}></div>
            <div className={afficher ? "active3" : ""}></div>
          </div>
          <Header afficher={afficher} cacher={cacher} />
          <Routes>
            <Route
              path="/connexion"
              element={<Connexion setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/inscription" element={<Inscription />} />

            <Route
              path="/"
              element={
                // <PrivateRoute>
                <Dashboard voitures={voitures} setVoitures={setVoitures} />
                // </PrivateRoute>
              }
            />
            <Route
              path="/parking"
              element={
                // <PrivateRoute>
                <Parking
                  voitures={voitures}
                  AjouterVoiture={AjouterVoiture}
                  parking={parking}
                  setParking={setParking}
                  voitureParking={voitureParking}
                  setVoitureParking={setVoitureParking}
                  setVoitures={setVoitures}
                />
                // </PrivateRoute>
              }
            />
            <Route
              path="/lavage"
              element={
                // <PrivateRoute>
                <Lavage
                  AjouterVoiture2={AjouterVoiture2}
                  voitures={voitures}
                  setVoitures={setVoitures}
                  lavage={lavage}
                  setLavage={setLavage}
                  voitureLavage={voitureLavage}
                  setVoitureLavage={setVoitureLavage}
                />
                // </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </VoituresContexte.Provider>
  );
}
