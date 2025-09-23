import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import s from "../components/styles/login.module.css";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [type, setType] = useState("ADMIN"); // par défaut ADMIN
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://itakalo-back-fp5nc.sevalla.app/api/v1/auth/register/",
        {
          email: email,
          password: mdp,
          first_name: nom,
          last_name: prenom,
          type: type,
        }
      );

      console.log("✅ Inscription réussie :", response.data);

      // Redirection après succès
      navigate("/connexion");
    } catch (err) {
      //console.error("❌ Erreur inscription :", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data.error.password[0] ||
        "Erreur lors de l'inscription";
      setError(msg);
    }
  }

  return (
    <div className={s.container2}>
      <form onSubmit={handleSubmit}>
        <img src="image/City driver-pana.png" alt="illustration parking" />
        <h1>Inscription</h1>

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

        <label htmlFor="nom">
          <input
            type="text"
            placeholder="Nom"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </label>

        <label htmlFor="prenom">
          <input
            type="text"
            placeholder="Prénom"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
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

        <button type="submit">Inscription</button>
      </form>

      <p>
        Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
      </p>
    </div>
  );
};

export default Inscription;
