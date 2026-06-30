CREATE DATABASE  IF NOT EXISTS `rh_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rh_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rh_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `demandes_conges`
--

DROP TABLE IF EXISTS `demandes_conges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demandes_conges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_debut` date DEFAULT NULL,
  `date_demande` datetime(6) DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `motif` varchar(255) DEFAULT NULL,
  `statut` enum('ACCEPTE','EN_ATTENTE','REFUSE') DEFAULT NULL,
  `employe_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd7irk2jmrmyu3s9xd76ma8tka` (`employe_id`),
  CONSTRAINT `FKd7irk2jmrmyu3s9xd76ma8tka` FOREIGN KEY (`employe_id`) REFERENCES `employes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demandes_conges`
--

LOCK TABLES `demandes_conges` WRITE;
/*!40000 ALTER TABLE `demandes_conges` DISABLE KEYS */;
INSERT INTO `demandes_conges` VALUES (16,'2026-08-13','2026-02-10 22:15:19.028642','2026-08-20',NULL,'REFUSE',2),(17,'2026-08-10','2026-02-10 22:49:00.887550','2026-08-10',NULL,'ACCEPTE',2),(18,'2026-08-13','2026-02-10 22:49:25.319733','2026-08-20',NULL,'ACCEPTE',3),(19,'2026-08-13','2026-02-10 22:51:09.368272','2026-08-20',NULL,'ACCEPTE',2),(20,'2026-08-21','2026-02-11 00:44:54.088848','2026-08-24',NULL,'ACCEPTE',2);
/*!40000 ALTER TABLE `demandes_conges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departements`
--

DROP TABLE IF EXISTS `departements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departements` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departements`
--

LOCK TABLES `departements` WRITE;
/*!40000 ALTER TABLE `departements` DISABLE KEYS */;
INSERT INTO `departements` VALUES (1,'Informatique'),(2,'Ressources Humaines'),(3,'Mathématique');
/*!40000 ALTER TABLE `departements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employes`
--

DROP TABLE IF EXISTS `employes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` enum('CHEF_DEPARTEMENT','EMPLOYE') DEFAULT NULL,
  `solde_conges` int DEFAULT NULL,
  `departement_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg6y4s69ena7cto8y7egtpqsi` (`departement_id`),
  CONSTRAINT `FKg6y4s69ena7cto8y7egtpqsi` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employes`
--

LOCK TABLES `employes` WRITE;
/*!40000 ALTER TABLE `employes` DISABLE KEYS */;
INSERT INTO `employes` VALUES (1,'abdelmoula.amahane@etud.iga.ac.ma',NULL,'Abdo','Amahane','CHEF_DEPARTEMENT',18,1),(2,'ikrame.landarouche@etud.iga.ac.ma',NULL,'Ikrame','Landarouche','EMPLOYE',5,1),(3,'khalid@example.com','123','Khalid','Aziz','EMPLOYE',10,2),(4,'belhaj@example.com',NULL,'Belhaj','Fati','CHEF_DEPARTEMENT',18,2);
/*!40000 ALTER TABLE `employes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_envoi` datetime(6) DEFAULT NULL,
  `lu` bit(1) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `destinataire_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe88rn4n16h8ngd0gyn1w9u5gw` (`destinataire_id`),
  CONSTRAINT `FKe88rn4n16h8ngd0gyn1w9u5gw` FOREIGN KEY (`destinataire_id`) REFERENCES `employes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-02-11 00:45:35.987284',_binary '','Votre demande de congé du 2026-08-21 au 2026-08-24 a été accepte',2);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-11 17:03:11
