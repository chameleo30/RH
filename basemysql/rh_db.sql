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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demandes_conges`
--

LOCK TABLES `demandes_conges` WRITE;
/*!40000 ALTER TABLE `demandes_conges` DISABLE KEYS */;
INSERT INTO `demandes_conges` VALUES (28,'2026-02-14','2026-02-14 02:08:35.917094','2026-02-15','Congé annuel','ACCEPTE',2),(29,'2026-02-21','2026-02-14 02:19:49.171248','2026-02-22','Congé annuel','REFUSE',2),(30,'2026-02-23','2026-02-14 02:33:25.065328','2026-02-24','Congé personnel','REFUSE',2),(31,'2026-02-18','2026-02-14 02:51:01.529809','2026-02-19','Congé annuel','ACCEPTE',2),(32,'2026-02-27','2026-02-14 03:00:18.483896','2026-02-28','Congé annuel','REFUSE',2),(33,'2026-02-27','2026-02-14 03:06:06.275603','2026-02-28','Congé annuel','REFUSE',2),(34,'2026-02-27','2026-02-14 03:08:36.687897','2026-02-28','Congé annuel','REFUSE',2),(35,'2026-02-27','2026-02-14 03:10:16.004233','2026-02-28','Congé annuel','REFUSE',2),(36,'2026-02-28','2026-02-14 03:35:00.362389','2026-02-28','Congé annuel','REFUSE',2),(37,'2026-02-25','2026-02-14 03:40:49.290674','2026-02-25','Congé maladie','REFUSE',2),(38,'2026-02-20','2026-02-14 03:43:20.738876','2026-02-20','Congé maladie','REFUSE',2),(39,'2026-02-20','2026-02-14 03:45:40.151000','2026-02-20','Congé personnel','REFUSE',2),(40,'2026-02-27','2026-02-14 19:07:12.845874','2026-02-28','Congé annuel','REFUSE',2),(41,'2026-03-12','2026-02-14 19:52:55.242025','2026-03-13','Congé annuel','REFUSE',2),(42,'2026-03-12','2026-02-14 19:57:28.482324','2026-03-13','Congé annuel','ACCEPTE',2),(43,'2026-02-25','2026-02-16 01:25:33.694512','2026-02-26','Congé annuel','ACCEPTE',2),(44,'2026-02-22','2026-02-16 01:33:58.571116','2026-02-24','Congé annuel','ACCEPTE',2),(45,'2026-02-16','2026-02-16 01:45:09.862581','2026-02-22','Congé annuel','ACCEPTE',3),(46,'2026-03-19','2026-02-16 18:10:46.851188','2026-03-20','Congé annuel','REFUSE',3),(47,'2026-04-22','2026-02-16 22:24:51.425534','2026-04-24','Congé maladie','ACCEPTE',3);
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
INSERT INTO `employes` VALUES (1,'abdelmoula.amahane@etud.iga.ac.ma','123','Abdo','Amahane','CHEF_DEPARTEMENT',18,1),(2,'Alaoui@example.com','123','Mohamed','Alaoui','EMPLOYE',7,1),(3,'khalid@example.com','123','Khalid','Aziz','EMPLOYE',8,1),(4,'belhaj@example.com',NULL,'Belhaj','Fatima','EMPLOYE',18,1);
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
  `demande_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe88rn4n16h8ngd0gyn1w9u5gw` (`destinataire_id`),
  KEY `FKsli1h2cote1xtm9tyfxjnyvio` (`demande_id`),
  CONSTRAINT `FKe88rn4n16h8ngd0gyn1w9u5gw` FOREIGN KEY (`destinataire_id`) REFERENCES `employes` (`id`),
  CONSTRAINT `FKsli1h2cote1xtm9tyfxjnyvio` FOREIGN KEY (`demande_id`) REFERENCES `demandes_conges` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (13,'2026-02-14 02:19:14.537220',_binary '','Votre demande de congé du 2026-02-14 au 2026-02-15 a été accepte',2,28),(14,'2026-02-14 02:20:03.703636',_binary '','Votre demande de congé du 2026-02-21 au 2026-02-22 a été refuse',2,29),(15,'2026-02-14 02:39:08.898258',_binary '','Votre demande de congé du 2026-02-23 au 2026-02-24 a été refuse',2,30),(16,'2026-02-14 03:01:22.661760',_binary '','Votre demande de congé du 2026-02-27 au 2026-02-28 a été refuse',2,32),(17,'2026-02-14 03:01:27.050479',_binary '','Votre demande de congé du 2026-02-18 au 2026-02-19 a été accepte',2,31),(18,'2026-02-14 03:07:04.054509',_binary '','Votre demande de congé du 2026-02-27 au 2026-02-28 a été refuse',2,33),(19,'2026-02-14 03:09:34.737997',_binary '','Votre demande de congé du 2026-02-27 au 2026-02-28 a été refuse',2,34),(20,'2026-02-14 03:10:32.508346',_binary '','Votre demande de congé du 2026-02-27 au 2026-02-28 a été refuse',2,35),(21,'2026-02-14 03:39:32.046227',_binary '','Votre demande de congé du 2026-02-28 au 2026-02-28 a été refuse',2,36),(22,'2026-02-14 03:40:57.570636',_binary '','Votre demande de congé du 2026-02-25 au 2026-02-25 a été refuse',2,37),(23,'2026-02-14 03:43:31.799183',_binary '','Votre demande de congé du 2026-02-20 au 2026-02-20 a été refuse',2,38),(24,'2026-02-14 03:45:46.268533',_binary '','Votre demande de congé du 2026-02-20 au 2026-02-20 a été refuse',2,39),(25,'2026-02-14 19:07:32.461299',_binary '','Votre demande de congé du 2026-02-27 au 2026-02-28 a été refuse',2,40),(26,'2026-02-14 19:53:03.677581',_binary '','Votre demande de congé du 2026-03-12 au 2026-03-13 a été refuse',2,41),(27,'2026-02-14 19:57:45.737444',_binary '','Votre demande de congé du 2026-03-12 au 2026-03-13 a été accepte',2,42),(28,'2026-02-16 01:26:02.155651',_binary '','Votre demande de congé du 2026-02-25 au 2026-02-26 a été accepte',2,43),(29,'2026-02-16 01:34:11.080050',_binary '','Votre demande de congé du 2026-02-22 au 2026-02-24 a été accepte',2,44),(30,'2026-02-16 01:45:47.925115',_binary '','Votre demande de congé du 2026-02-16 au 2026-02-22 a été accepte',3,45),(31,'2026-02-16 18:10:54.686622',_binary '','Votre demande de congé du 2026-03-19 au 2026-03-20 a été refuse',3,46),(32,'2026-02-16 22:25:00.975742',_binary '','Votre demande de congé du 2026-04-22 au 2026-04-24 a été accepte',3,47);
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

-- Dump completed on 2026-06-30 10:38:30
