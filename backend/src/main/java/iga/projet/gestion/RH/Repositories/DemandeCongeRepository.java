/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package iga.projet.gestion.RH.Repositories;

import iga.projet.gestion.RH.Models.DemandeConge;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author AMAHANE
 */


public interface DemandeCongeRepository extends CrudRepository<DemandeConge, Long>{
    @Query("""
        SELECT COUNT(d) > 0
        FROM DemandeConge d
        WHERE d.employe.id = :empId
          AND d.statut <> StatutConge.REFUSE
          AND d.dateDebut <= :dateFin
          AND d.dateFin   >= :dateDebut
        """)
    boolean existeChevauchement(
        Long empId,
        LocalDate dateDebut,
        LocalDate dateFin
    );
    
    Iterable<DemandeConge> findByEmployeDepartementIdOrderByIdDesc(Long departementId);
}
