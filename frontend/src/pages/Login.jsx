import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../style/main.css";

export default function Connexion() {
  const [email, setEmail] = useState("abdelmoula.amahane@etud.iga.ac.ma");
  const [motDePasse, setMotDePasse] = useState("123");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // empêche le reload
    setErreur("");

    try {
      const response = await api.post("/employes/login", {
        email,
        motDePasse,
      });

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "EMPLOYE") {
        navigate("/DashBoard");
      } else if (user.role === "CHEF_DEPARTEMENT") {
        navigate("/DashBoard");
      } else {
        setErreur("Rôle inconnu");
      }

    } catch (error) {
      console.error(error);
      setErreur(error.response.data.message);
    }
  };

  return (
    <div className="connexion-page">
      <div className="connexion-container">
        <div className="connexion-header">
          <div className="logo-connexion">H</div>
          <h2>HR MANAGEMENT</h2>
          <p className="subtitle">Connectez-vous à votre espace</p>
        </div>

        {erreur && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {erreur}
          </div>
        )}

        <form className="connexion-form" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@entreprise.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-connexion">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
