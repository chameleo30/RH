/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package iga.projet.gestion.RH.Repositories;

import org.springframework.data.repository.CrudRepository;
import iga.projet.gestion.RH.Models.Departement;

/**
 *
 * @author AMAHANE
 */
public interface DepartementRepository extends CrudRepository<Departement, Long> {
    
}
