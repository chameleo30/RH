import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProfilCard() {
  const [employe, setEmploye] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: ''
  });

  useEffect(() => {
    

  }, []);

  const chargerProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      setErreur("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    api.get(`/employes/${user.id}`)
      .then(response => {
        setEmploye(response.data);
        // Initialiser formData avec les données de l'employé
        setFormData({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur chargement profil :", error);
        setErreur("Impossible de charger le profil.");
        setLoading(false);
      });
  }

  useEffect(() => {
    // Charger les notifications au montage
    chargerProfile();

    // Polling toutes les 5 secondes
    const interval = document.hidden ? 30000 : 3000;
    const intervalId = setInterval(() => {
      chargerProfile();
    }, interval);

    // Nettoyer l'intervalle au démontage
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      setMessage('Utilisateur non connecté.');
      return;
    }
    
    // Appel API pour mettre à jour le profil
    api.put(`/employes/update/${user.id}`, formData)
      .then(response => {
        setEmploye(response.data);
        setMessage('Profil mis à jour avec succès!');
        setIsEditing(false);
        
        // Effacer le message après 3 secondes
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch(error => {
        console.error("Erreur mise à jour profil :", error);
        setErreur('Erreur lors de la mise à jour du profil.');
        setTimeout(() => {
          setErreur('');
        }, 3000);
      });
  };

  const handleCancel = () => {
    // Réinitialiser formData avec les données actuelles de l'employé
    setFormData({
      nom: employe.nom,
      prenom: employe.prenom,
      email: employe.email
    });
    setIsEditing(false);
  };

  if (loading) return <p className="loading-message">Chargement...</p>;
  if (erreur) return <p className="error-message">{erreur}</p>;
  if (!employe) return null;

  return (
    <div className="card profile-card">
      <h2>Mon Profil</h2>
      
      <div className="profile-image">
        <div className="avatar">
          <div className="avatar-body">
            <div className="avatar-hair"></div>
            <div className="avatar-head"></div>
            <div className="avatar-tie"></div>
          </div>
        </div>
      </div>

      {message && <p className="message success-message">{message}</p>}
      {erreur && <p className="message error-message">{erreur}</p>}

      {!isEditing ? (
        // Mode affichage
        <>
          <div className="profile-name">{employe.nom} {employe.prenom}</div>
          <div className="profile-email">{employe.email}</div>
          <div className="profile-department">Département: {employe.departement.nom}</div>
          {employe.role === 'EMPLOYE' ? (
          <div className="profile-solde">Solde Congé: {employe.soldeConges}</div>
          ):null}
          <button 
            className="submit-btn" 
            onClick={() => setIsEditing(true)}
          >
            ✏️ Modifier mon profil
          </button>
        </>
      ) : (
        // Mode édition
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              💾 Enregistrer
            </button>
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleCancel}
            >
              ❌ Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}