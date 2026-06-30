/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package iga.projet.gestion.RH.Repositories;

import iga.projet.gestion.RH.Models.Employe;
import iga.projet.gestion.RH.Models.Notification;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author AMAHANE
 */
public interface NotificationRepository extends CrudRepository<Notification, Long> {
    Iterable<Notification> findByDestinataireOrderByIdDesc(Employe destinataire);
}
