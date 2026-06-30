/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package iga.projet.gestion.RH.Controllers;

import iga.projet.gestion.RH.Models.DemandeConge;
import iga.projet.gestion.RH.Models.StatutConge;
import iga.projet.gestion.RH.Services.DemandeCongeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author AMAHANE
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/conges")
public class DemandeCongeController {
    @Autowired
    private DemandeCongeService demandecongeService;
    
    @GetMapping("/departement/{id}")
    public ResponseEntity<List<DemandeConge>> getByDepartement(@PathVariable Long id) {
        return ResponseEntity.ok(demandecongeService.getDemandesCongesByDepartementId(id));
    }
    
    @PostMapping("/demande")
    public ResponseEntity<DemandeConge> demanderConge(@RequestBody DemandeConge request) {
        DemandeConge conge = demandecongeService.demanderConge(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(conge);
    }
    
    
    @PutMapping("{id}/{idChef}/accepter")
    public ResponseEntity<DemandeConge> accepter(@PathVariable Long id, @PathVariable Long idChef) {
        return ResponseEntity.ok(demandecongeService.traiter(id, idChef, StatutConge.ACCEPTE));
    }

    @PutMapping("{id}/{idChef}/refuser")
    public ResponseEntity<DemandeConge> refuser(@PathVariable Long id, @PathVariable Long idChef) {
        return ResponseEntity.ok(demandecongeService.traiter(id, idChef, StatutConge.REFUSE));
    }

}


