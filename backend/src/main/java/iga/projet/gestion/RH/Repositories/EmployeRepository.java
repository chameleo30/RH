/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package iga.projet.gestion.RH.Repositories;

import iga.projet.gestion.RH.Models.Employe;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author AMAHANE
 */
public interface EmployeRepository extends CrudRepository<Employe, Long> {
    Optional<Employe> findByEmail(String email);
    Iterable<Employe> findByDepartementId(Long departementId);
}
