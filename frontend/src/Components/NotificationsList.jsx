import { useEffect, useState } from "react";
import api from "../api/api";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date inconnue';
    
    let date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      const isoDate = dateString.replace(' ', 'T');
      date = new Date(isoDate);
      
      if (isNaN(date.getTime())) {
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
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Fonction pour charger les notifications
  const chargerNotifications = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      setErreur("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    api.get(`/employes/${user.id}/notifications`)
      .then(response => {
        const nouvellesNotifications = response.data;
        
        // Détecter les nouvelles notifications non lues
        if (notifications && notifications.length > 0) {
          const nouvellesNonLues = nouvellesNotifications
            .filter(n => !n.lu)
            .filter(n => !notifications.find(old => old.id === n.id))
            .length;
          
          if (nouvellesNonLues > 0) {
            setNewNotificationCount(nouvellesNonLues);
            playNotificationSound();
            setTimeout(() => setNewNotificationCount(0), 3000);
          }
        }
        
        setNotifications(nouvellesNotifications);
        setLoading(false);
        setErreur(null);
      })
      .catch(error => {
        console.error("Erreur chargement notifications :", error);
        if (loading) {
          setErreur("Impossible de charger les notifications.");
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
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio non supporté');
    }
  };
  
  useEffect(() => {
    // Charger les notifications au montage
    chargerNotifications();

    // Polling toutes les 5 secondes
    const interval = document.hidden ? 30000 : 3000;
    const intervalId = setInterval(() => {
      chargerNotifications();
    }, interval);

    
    // Nettoyer l'intervalle au démontage
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Fonction pour marquer une notification comme lue
  const marquerCommeLue = (notificationId) => {
    api.put(`/notifications/${notificationId}/lu`)
      .then(() => {
        // Mettre à jour l'état local
        setNotifications(prevNotifications =>
          prevNotifications.map(notif =>
            notif.id === notificationId ? { ...notif, lu: true } : notif
          )
        );
      })
      .catch(error => {
        console.error("Erreur lors du marquage de la notification :", error);
      });
  };

  if (loading) return <p className="loading-message">Chargement...</p>;
  if (erreur) return <p className="error-message">{erreur}</p>;
  if (!notifications) return null;

  return (
    <>
      <div className="card">
        <h2>
          Notifications récentes
          {newNotificationCount > 0 && (
            <span className="new-notification-badge">{newNotificationCount}</span>
          )}
        </h2>
        <div className="notifications-list">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification.id || index}
                className={`notification-item notification-${notification.type || 'message'} ${!notification.lu ? 'notification-unread' : ''}`}
                onClick={() => !notification.lu && marquerCommeLue(notification.id)}
                style={{ cursor: !notification.lu ? 'pointer' : 'default' }}
              >
                <div className="notification-header">
                  <span className="notification-status">
                    {!notification.lu && <span className="unread-badge">●</span>}
                  </span>
                  <span className="notification-time">
                    {formatDateTime(notification.dateEnvoi)}
                  </span>
                </div>
                <div className="notification-content">
                  {notification.message}
                </div>
              </div>
            ))
          ) : (
            <div className="notification-item">
              Aucune notification pour le moment
            </div>
          )}
        </div>
      </div>
    </>
  );
}