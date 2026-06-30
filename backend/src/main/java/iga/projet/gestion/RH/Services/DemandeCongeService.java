package iga.projet.gestion.RH.Services;

import iga.projet.gestion.RH.Models.DemandeConge;
import iga.projet.gestion.RH.Models.Employe;
import iga.projet.gestion.RH.Models.Role;
import iga.projet.gestion.RH.Models.StatutConge;
import iga.projet.gestion.RH.Repositories.DemandeCongeRepository;
import iga.projet.gestion.RH.Repositories.DepartementRepository;
import iga.projet.gestion.RH.Repositories.EmployeRepository;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author AMAHANE
 */

@Service
public class DemandeCongeService {
    @Autowired
    EmployeRepository employeRepository;
    @Autowired
    DemandeCongeRepository DemandeCongeRepository;
    @Autowired
    NotificationService notificationService;
    @Autowired
    private DepartementRepository departementRepository;
    
    public List<DemandeConge> getDemandesCongesByDepartementId(Long id){
        if (!departementRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Département introuvable"
            );
        }
        return (List<DemandeConge>) DemandeCongeRepository.findByEmployeDepartementIdOrderByIdDesc(id);
    }
    
    public DemandeConge demanderConge(DemandeConge request) {
        Employe emp = employeRepository.findById(request.getEmploye().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employé introuvable"));
        if (request.getDateFin().isBefore(request.getDateDebut())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La date de fin ne peut pas être antérieure à la date de début"
            );
        }
        
        if (DemandeCongeRepository.existeChevauchement(
            request.getEmploye().getId(),
            request.getDateDebut(),
            request.getDateFin()
            )) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Une demande de congé existe déjà pour cette période"
                );
            }
        
        long nbJours = ChronoUnit.DAYS.between(request.getDateDebut(), request.getDateFin()) + 1;
        
        if (emp.getSoldeConges()< nbJours) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Solde de congé insuffisant"
            );
        }
        
        DemandeConge conge = new DemandeConge();
        conge.setEmploye(emp);
        conge.setDateDebut(request.getDateDebut());
        conge.setDateFin(request.getDateFin());
        conge.setMotif(request.getMotif());
        
        return DemandeCongeRepository.save(conge);
    }
    
    public DemandeConge traiter(Long id, Long idChef, StatutConge statut) {
        DemandeConge conge = DemandeCongeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Demande introuvable"
                ));
        
        Employe emp = employeRepository.findById(conge.getEmploye().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employé introuvable"
                ));
        
        Employe chef = employeRepository.findById(idChef)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Chef introuvable"
                ));
        
        if (chef.getRole() != Role.CHEF_DEPARTEMENT || !emp.memeDepartement(chef)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Accès refusé : vous n'êtes pas le chef du département"
            );
        }
        
        if (conge.getStatut() != StatutConge.EN_ATTENTE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Demande déjà traitée"
            );
        }
        
        conge.setStatut(statut);
        if(statut == StatutConge.ACCEPTE){
            long jours = ChronoUnit.DAYS.between(conge.getDateDebut(), conge.getDateFin()) + 1;
            emp.setSoldeConges(emp.getSoldeConges() - (int) jours);
            employeRepository.save(emp);
        }
        
        String msg = "Votre demande de congé du "
            + conge.getDateDebut()
            + " au "
            + conge.getDateFin()
            + " a été "
            + statut.name().toLowerCase();
        
        notificationService.notifier(conge.getEmploye(), msg, conge);
        
        return DemandeCongeRepository.save(conge);
    }
}
