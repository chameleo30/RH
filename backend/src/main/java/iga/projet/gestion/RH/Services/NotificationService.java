
package iga.projet.gestion.RH.Services;

import iga.projet.gestion.RH.Models.Employe;
import iga.projet.gestion.RH.Models.Notification;
import iga.projet.gestion.RH.Models.DemandeConge;
import iga.projet.gestion.RH.Repositories.EmployeRepository;
import iga.projet.gestion.RH.Repositories.NotificationRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class NotificationService {
    
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    private EmployeRepository employeRepository;
    
    public List<Notification> getNotificationsByDestinataire(Long id){
        Employe emp = employeRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Employé introuvable"
                        ));
        
        return (List<Notification>) notificationRepository.findByDestinataireOrderByIdDesc(emp);
    }
    
    public void notifier(Employe employe, String message, DemandeConge demande) {
        Notification n = new Notification();
        n.setDestinataire(employe);
        n.setMessage(message);
        n.setDemande(demande);
        notificationRepository.save(n);
    }
    
    public void marquerCommeLu(Long id) {
        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Notification introuvable"
                ));

        notif.setLu(true);
        notificationRepository.save(notif);
    }

}
