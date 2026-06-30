/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package iga.projet.gestion.RH.Services;

import iga.projet.gestion.RH.Models.Employe;
import iga.projet.gestion.RH.Models.Role;
import iga.projet.gestion.RH.Repositories.DepartementRepository;
import iga.projet.gestion.RH.Repositories.EmployeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author AMAHANE
 */

@Service
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    private DepartementRepository departementRepository;
    
    public List<Employe> getAllEmployes() {
        
        return (List<Employe>) employeRepository.findAll();
        /*
        Employe e1 = new Employe("abdo","amahane");
        Employe e2 = new Employe("jamal","amahane");
        
        List<Employe> l1 = new ArrayList<Employe>();
        l1.add(e1);
        l1.add(e2);
        
        return l1;
        */
    }
    
    public Employe getEmployeById(Long id) {
        
        Employe emp = employeRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Employé introuvable"
                        ));
        return emp;
    }
    
    public Employe login(String email, String password) {
        Employe emp = employeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Email introuvable"
                        ));

        if (!emp.getMotDePasse().equals(password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Mot de passe incorrect"
            );
        }
        
        return emp;
    }
    
    public List<Employe> getEmployesByDepartement(Long departementId) {
        if (!departementRepository.existsById(departementId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Département introuvable"
            );
        }

        return (List<Employe>) employeRepository.findByDepartementId(departementId);
    }
    
    public Employe updateEmploye(Long id, Employe updated) {

        Employe emp = employeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employé introuvable"
                ));

        if (updated.getNom() != null && !updated.getNom().isBlank()) {
            emp.setNom(updated.getNom());
        }

        if (updated.getPrenom() != null && !updated.getPrenom().isBlank()) {
            emp.setPrenom(updated.getPrenom());
        }

        if (updated.getEmail() != null && !updated.getEmail().isBlank()) {
            emp.setEmail(updated.getEmail());
        }

        return employeRepository.save(emp);
    }
    
}
