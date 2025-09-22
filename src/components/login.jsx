import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import s from "../components/styles/login.module.css";

const Connexion = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

async function handleLogin(e) {
  e.preventDefault();
  setError(null);

  try {
    const response = await axios.post(
      "https://itakalo-back-fp5nc.sevalla.app/api/v1/auth/login/",
      {
        email: email,
        password: mdp,
      }
    );

    console.log("✅ Connexion réussie :", response.data);

    // Si le backend renvoie un token, on le sauvegarde
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      // Mettre à jour l'état d'authentification
      setIsAuthenticated(true);

      // Redirection vers le dashboard
      navigate("/", { replace: true });
    } else {
      setError("Connexion échouée : token non reçu");
    }
  } catch (err) {
    // Gestion sécurisée des erreurs
    console.error("❌ Erreur connexion :", err.response?.data || err.message);
    setError(
      err.response?.data?.message ||
        err.message ||
        "Email ou mot de passe incorrect"
    );
  }
}


  return (
    <div className={s.container}>
      <form onSubmit={handleLogin}>
        <img
          src="image/Coronavirus Border Closure-pana.png"
          alt="illustration parking"
        />
        <h1>Administrateur Connexion</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="mdp">
          <input
            type="password"
            placeholder="Mot de passe"
            id="mdp"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </label>

        <button type="submit">Connexion</button>
      </form>

      <p>
        Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
      </p>
    </div>
  );
};

export default Connexion;
