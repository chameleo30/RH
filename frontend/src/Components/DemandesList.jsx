import { useEffect, useState } from "react";
import api from "../api/api";

export default function DemandesList() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreurServeur, setErreurServeur] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [message, setMessage] = useState('');
  const [newDemandeCount, setNewDemandeCount] = useState(0);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date inconnue';
    
    let date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      const isoDate = dateString.replace(' ', 'T');
      date = new Date(isoDate);
      
      if (isNaN(date.getTime())) {
        console.warn('Format de date non reconnu:', dateString);
        return 'Date invalide';
      }
    }
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins <= 1 ? 'À l\'instant' : `Il y a ${diffMins} min`;
    }
    else if (diffHours < 24) {
      return `Il y a ${diffHours}h`;
    }
    else if (diffDays < 7) {
      return `Il y a ${diffDays}j`;
    }
    else {
      try {
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return date.toLocaleDateString('fr-FR');
      }
    }
  };

  const formatDateRange = (dateDebut, dateFin) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    
    return `${debut.toLocaleDateString('fr-FR')} → ${fin.toLocaleDateString('fr-FR')}`;
  };

  // Fonction pour charger les demandes
  const chargerDemandes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      setErreurServeur("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    api.get(`/conges/departement/${user.departement.id}`)
      .then(response => {
        const nouvellesDemandes = response.data;
        
        // Détecter les nouvelles demandes EN_ATTENTE
        if (demandes.length > 0) {
          const nouvellesEnAttente = nouvellesDemandes
            .filter(d => d.statut === 'EN_ATTENTE')
            .filter(n => !demandes.find(old => old.id === n.id))
            .length;
          
          if (nouvellesEnAttente > 0) {
            setNewDemandeCount(nouvellesEnAttente);
            playNotificationSound();
            setTimeout(() => setNewDemandeCount(0), 3000);
          }
        }
        
        setDemandes(nouvellesDemandes);
        setLoading(false);
        setErreurServeur(null);
      })
      .catch(error => {
        console.error("Erreur chargement demandes :", error);
        if (loading) {
          setErreurServeur("Impossible de charger les demandes.");
          setLoading(false);
        }
      });
  };

  // Son de notification
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio non supporté');
    }
  };
  
  useEffect(() => {
    // Charger les demandes au montage
    chargerDemandes();

    // Polling toutes les 5 secondes
    const interval = document.hidden ? 30000 : 3000;
    const intervalId = setInterval(() => {
      chargerDemandes();
    }, interval);

    // Nettoyer l'intervalle
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Fonction pour accepter une demande
  const accepterDemande = (demandeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) return;

    api.put(`/conges/${demandeId}/${user.id}/accepter`)
      .then(response => {
        // Mettre à jour l'état local
        setDemandes(prevDemandes =>
          prevDemandes.map(demande =>
            demande.id === demandeId 
              ? { ...demande, statut: 'ACCEPTE' } 
              : demande
          )
        );
        
        setMessage('Demande acceptée avec succès!');
        setTimeout(() => {
          setMessage('');
          chargerDemandes(); // Recharger pour sync
        }, 2000);
      })
      .catch(error => {
        console.error("Erreur lors de l'acceptation :", error);
        setMessage(error.response?.data?.message || 'Erreur lors de l\'acceptation');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  // Fonction pour refuser une demande
  const refuserDemande = (demandeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) return;

    api.put(`/conges/${demandeId}/${user.id}/refuser`)
      .then(response => {
        setDemandes(prevDemandes =>
          prevDemandes.map(demande =>
            demande.id === demandeId 
              ? { ...demande, statut: 'REFUSE' } 
              : demande
          )
        );
        
        setErreur('Demande refusée.');
        setTimeout(() => {
          setErreur('');
          chargerDemandes(); // Recharger pour sync
        }, 2000);
      })
      .catch(error => {
        console.error("Erreur lors du refus :", error);
        setMessage(error.response?.data?.message || 'Erreur lors du refus');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  if (loading) return <p className="loading-message">Chargement...</p>;
  if (erreurServeur) return <p className="error-message">{erreurServeur}</p>;

  return (
    <>
      <div className="card">
        <h2>
          Demandes de Congé
          {newDemandeCount > 0 && (
            <span className="new-notification-badge">{newDemandeCount}</span>
          )}
        </h2>

        {message && <p className="message success-message">{message}</p>}
        {erreur && <p className="message error-message">{erreur}</p>}

        <div className="demandes-list">
          {demandes && demandes.length > 0 ? (
            demandes.map((demande, index) => (
              <div
                key={demande.id || index}
                className={`demande-item ${demande.statut === 'EN_ATTENTE' ? 'demande-en-attente' : 'demande-traitee'}`}
              >
                <div className="demande-header">
                  <div className="demande-employee">
                    <span className="employee-name">
                      {demande.employe?.nom} {demande.employe?.prenom}
                    </span>
                  </div>
                  <span className="demande-time">
                    {formatDateTime(demande.dateDemande)}
                  </span>
                </div>

                <div className="demande-content">
                  <div className="demande-dates">
                    📅 {formatDateRange(demande.dateDebut, demande.dateFin)}
                  </div>
                  {demande.motif && (
                    <div className="demande-motif">
                      💬 {demande.motif}
                    </div>
                  )}
                </div>

                <div className="demande-actions">
                  {demande.statut === 'EN_ATTENTE' ? (
                    <>
                      <button 
                        className="btn-accepter"
                        onClick={() => accepterDemande(demande.id)}
                      >
                        ✓ Accepter
                      </button>
                      <button 
                        className="btn-refuser"
                        onClick={() => refuserDemande(demande.id)}
                      >
                        ✗ Refuser
                      </button>
                    </>
                  ) : (
                    <div className="demande-statut">
                      {demande.statut === 'ACCEPTE' ? (
                        <span className="statut-acceptee">✓ Acceptée</span>
                      ) : demande.statut === 'REFUSE' ? (
                        <span className="statut-refusee">✗ Refusée</span>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="demande-item empty-demandes">
              Aucune demande de congé pour le moment
            </div>
          )}
        </div>
      </div>
    </>
  );
}