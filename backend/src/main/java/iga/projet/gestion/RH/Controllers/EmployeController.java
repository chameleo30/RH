package iga.projet.gestion.RH.Controllers;

import iga.projet.gestion.RH.Models.Employe;
import iga.projet.gestion.RH.Models.Notification;
import iga.projet.gestion.RH.Services.EmployeService;
import iga.projet.gestion.RH.Services.NotificationService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author AMAHANE
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employes")
public class EmployeController {
    @Autowired
    private EmployeService employeService;
    @Autowired
    NotificationService notificationService;
    
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Employe> getAllEmployes() {
        /*
        Employe e1 = new Employe("abdo","amahane");
        Employe e2 = new Employe("jamal","amahane");
        
        List<Employe> l1 = new ArrayList<Employe>();
        l1.add(e1);
        l1.add(e2);
        
        return l1;
        */
        return employeService.getAllEmployes();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Employe> getEmployeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeService.getEmployeById(id));
    }
    
    @GetMapping("/{id}/notifications")
    public ResponseEntity<List<Notification>> getNotificationsByDestinataire(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getNotificationsByDestinataire(id));
    }
    
    @PostMapping("/login")
    public ResponseEntity<Employe> login(@RequestBody Employe request) {

        Employe emp = employeService.login(
                request.getEmail(),
                request.getMotDePasse()
        );

        return ResponseEntity.ok(emp);
    }
    
    @GetMapping("/departement/{id}")
    public ResponseEntity<List<Employe>> getByDepartement(@PathVariable Long id) {

        return ResponseEntity.ok(employeService.getEmployesByDepartement(id));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Employe> updateEmploye(
            @PathVariable Long id,
            @RequestBody Employe updated) {

        Employe emp = employeService.updateEmploye(id, updated);
        return ResponseEntity.ok(emp);
    }
}