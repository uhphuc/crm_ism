CREATE DATABASE  IF NOT EXISTS `crm_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `crm_dev`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crm_dev
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('call','meeting','email','task','other') DEFAULT 'other',
  `description` text,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `status` enum('planned','in_progress','completed','cancelled') DEFAULT 'planned',
  `outcome` text,
  `userId` int NOT NULL,
  `customerId` int DEFAULT NULL,
  `dealId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `customerId` (`customerId`),
  KEY `dealId` (`dealId`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `activities_ibfk_3` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Contract Finallization Meeting','meeting','Final review of contract terms with client’s legal team. Confirm SLA adjustments and payment schedule. Bring redlined version for side-by-side comparison.','2025-05-18 06:00:00','2025-05-11 07:30:00','planned',NULL,5,1,1,'2025-05-11 07:55:47','2025-05-11 07:55:47'),(2,'Follow-Up Email','email','Send summarized changes post-meeting, highlighting concessions (e.g., extended support hours). Attach final contract for e-signature.','2025-05-18 08:00:00','2025-05-25 08:00:00','planned',NULL,5,1,1,'2025-05-11 08:01:11','2025-05-11 08:01:11'),(3,'CFO Pricing Call','call','Address CFO’s questions on cost breakdown. Reinforce ROI with case studies. If pushback, offer add-on training at no cost','2025-05-23 08:02:00','2025-05-24 08:02:00','planned',NULL,5,2,2,'2025-05-11 08:02:40','2025-05-11 08:02:40'),(4,'Proposal Revision Task','task','Incorporate requested edits (discount terms, timeline) and resend PDF with tracked changes','2025-05-17 08:03:00','2025-05-18 08:03:00','planned',NULL,5,2,2,'2025-05-11 08:03:29','2025-05-11 08:03:29'),(5,'Technical Demo Meeting','meeting','Live API integration demo with client’s dev team. Show CRM sync, error logging, and sandbox access. Q&A afterward','2025-05-11 08:04:00','2025-05-25 08:04:00','planned',NULL,5,5,3,'2025-05-11 08:04:26','2025-05-11 08:04:26'),(6,'Proposal Review Meeting','meeting','Walk through pricing, integration timeline, and ROI metrics. Address concerns about data security','2025-05-11 08:09:00','2025-06-01 08:09:00','planned',NULL,6,6,4,'2025-05-11 08:10:01','2025-05-11 08:10:01'),(7,'Follow-Up Email with Case Study','email','Share a case study of a similar e-commerce client + finalized proposal PDF. Offer a 5% discount for signing before July 15','2025-05-11 08:10:00','2025-07-15 08:10:00','planned',NULL,6,6,4,'2025-05-11 08:10:40','2025-05-11 08:10:40'),(8,'Contract Revision Call','call','Present revised payment plan (40% upfront, 30% at mid-project, 30% post-audit). Confirm start date if terms are accepted.','2025-05-11 08:12:00','2025-08-28 08:12:00','planned',NULL,6,9,5,'2025-05-11 08:12:35','2025-05-11 08:12:35'),(9,'Custom Demo Meeting','meeting','Live demo using client’s 2023 solar output data. Focus on anomaly detection and ROI projections.','2025-05-11 08:14:00','2025-06-08 08:14:00','planned',NULL,6,11,6,'2025-05-11 08:14:22','2025-05-11 08:14:22'),(10,'Final Terms Meeting','meeting','CEO, CFO, and IT Director attending. Present compromise: include premium support for first year at current price','2025-05-11 08:18:00','2025-05-25 08:18:00','planned',NULL,7,3,7,'2025-05-11 08:18:57','2025-05-11 08:18:57'),(11,'ROI Presentation','meeting','Customized cost savings analysis showing 18-month payback period','2025-05-11 08:21:00','2025-09-28 08:21:00','planned',NULL,7,7,8,'2025-05-11 08:22:18','2025-05-11 08:22:18'),(12,'Technical Deep Dive','meeting','Q&A session with their IT team about data security and HL7 compatibility.','2025-05-04 08:24:00','2025-05-08 08:24:00','completed',NULL,7,13,9,'2025-05-11 08:24:59','2025-05-11 08:25:06'),(13,'Regulation Research','task','Prepare compliance checklist for their operating regions (US, EU, Singapore)','2025-05-04 08:26:00','2025-05-18 08:26:00','in_progress',NULL,7,28,10,'2025-05-11 08:27:03','2025-05-11 08:27:07'),(14,'Reference Call Coordination','task','Connect them with similar-sized law firm client who completed migration last quarter','2025-05-04 08:31:00','2025-06-08 08:31:00','in_progress',NULL,8,4,11,'2025-05-11 08:31:58','2025-05-11 08:32:01'),(15,'Technical Integration Call','call','SAP integration specialist to address IT team\'s questions','2025-05-10 08:34:00','2025-05-10 08:34:00','cancelled',NULL,8,4,12,'2025-05-11 08:34:51','2025-05-11 08:34:53'),(16,'Executive Business Review','meeting','Present to C-suite with property-specific revenue projections and competitor gap analysis','2025-05-11 08:37:00','2025-06-06 08:37:00','planned',NULL,9,12,13,'2025-05-11 08:37:18','2025-05-11 08:37:18'),(17,'Regulatory Compliance Session','meeting','Live demo of audit trail functionality with QA/RA team','2025-05-11 08:38:00','2025-05-25 08:39:00','planned',NULL,9,29,14,'2025-05-11 08:39:21','2025-05-11 08:39:21');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `status` enum('lead','prospect','customer','inactive') DEFAULT 'lead',
  `assignedTo` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignedTo` (`assignedTo`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`assignedTo`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Acme Corporation','John','Smith','john.smith@acme.com','555-0101','123 Main St','New York','NY','10001','USA','www.acme.com','Trade Show','customer',5,'2024-12-15 09:23:45','2025-05-11 07:31:43'),(2,'TechSolutions Inc','Sarah','Johnson','s.johnson@techsol.com','555-0202','456 Tech Ave','San Francisco','CA','94105','USA','www.techsol.com','Website','customer',5,'2024-12-18 11:12:33','2025-05-11 07:32:20'),(3,'Global Widgets','Michael','Brown','michael.b@globalw.com','555-0303','789 Commerce Rd','Chicago','IL','60601','USA','www.globalw.com','Referral','prospect',7,'2025-01-05 14:45:12','2025-05-11 07:34:05'),(4,'Bright Ideas LLC','Emily','Davis','emily.d@brightideas.com','555-0404','321 Innovation Blvd','Boston','MA','02108','USA','www.brightideas.com','Cold Call','lead',8,'2025-01-12 10:30:15','2025-05-11 07:34:30'),(5,'Summit Enterprises','David','Wilson','d.wilson@summitent.com','555-0505','654 Peak St','Denver','CO','80202','USA','www.summitent.com','Email Campaign','customer',5,'2025-01-20 13:22:44','2025-05-11 07:32:16'),(6,'Oceanic Imports','Lisa','Martinez','l.martinez@oceanic.com','555-0606','987 Harbor Dr','Miami','FL','33101','USA','www.oceanic.com','Trade Show','customer',6,'2025-01-25 16:45:30','2025-05-11 07:32:24'),(7,'Pioneer Systems','Robert','Anderson','r.anderson@pioneer.com','555-0707','246 Frontier Ln','Austin','TX','78701','USA','www.pioneer.com','Website','prospect',7,'2025-02-03 08:15:22','2025-05-11 07:34:22'),(8,'Green Earth Co','Jennifer','Lee','j.lee@greenearth.com','555-0808','369 Eco Park','Portland','OR','97201','USA','www.greenearth.com','Social Media','lead',8,'2025-02-10 09:40:11','2025-05-11 07:34:36'),(9,'Metro Services','Thomas','Garcia','t.garcia@metroserv.com','555-0909','159 Urban Ave','Los Angeles','CA','90012','USA','www.metroserv.com','Referral','customer',6,'2025-02-15 11:55:33','2025-05-11 07:32:28'),(10,'Alpha Omega Ltd','Patricia','Rodriguez','p.rodriguez@alphaomega.com','555-1010','753 Greek St','Philadelphia','PA','19102','USA','www.alphaomega.com','Cold Call','inactive',8,'2025-02-22 14:30:05','2025-05-11 07:34:40'),(11,'Peak Performance','James','Taylor','j.taylor@peakperf.com','555-1111','852 Summit Way','Seattle','WA','98101','USA','www.peakperf.com','Email Campaign','customer',6,'2025-03-01 10:20:45','2025-05-11 07:32:33'),(12,'Blue Sky Ventures','Mary','Hernandez','m.hernandez@bluesky.com','555-1212','963 Cloud Ct','Atlanta','GA','30301','USA','www.bluesky.com','Trade Show','prospect',9,'2025-03-08 13:15:30','2025-05-11 07:34:46'),(13,'Golden Gate Industries','Charles','Moore','c.moore@goldengate.com','555-1313','147 Bridge St','San Francisco','CA','94104','USA','www.goldengate.com','Website','customer',7,'2025-03-15 15:45:22','2025-05-11 07:32:38'),(14,'Sunrise Technologies','Karen','Jackson','k.jackson@sunrise.com','555-1414','258 Dawn Ave','Phoenix','AZ','85001','USA','www.sunrise.com','Referral','lead',9,'2025-03-22 08:30:10','2025-05-11 07:34:50'),(15,'Horizon Systems','Daniel','White','d.white@horizon.com','555-1515','369 Skyline Dr','Dallas','TX','75201','USA','www.horizon.com','Cold Call','customer',9,'2025-04-01 11:40:25','2025-05-11 07:35:10'),(16,'Evergreen Solutions','Nancy','Lopez','n.lopez@evergreen.com','555-1616','456 Pine Blvd','Minneapolis','MN','55401','USA','www.evergreen.com','Email Campaign','prospect',10,'2025-04-10 14:55:15','2025-05-11 07:35:15'),(17,'Titan Manufacturing','Paul','Clark','p.clark@titan.com','555-1717','789 Steel Rd','Detroit','MI','48201','USA','www.titan.com','Trade Show','customer',10,'2025-04-15 09:25:40','2025-05-11 07:35:17'),(18,'Apex Services','Amanda','Lewis','a.lewis@apex.com','555-1818','159 Top St','Houston','TX','77001','USA','www.apex.com','Website','inactive',11,'2025-04-20 12:35:50','2025-05-11 07:35:24'),(19,'Summit Partners','Mark','Walker','m.walker@summit.com','555-1919','753 Peak Ave','Denver','CO','80201','USA','www.summit.com','Social Media','customer',11,'2025-04-25 16:45:10','2025-05-11 07:35:30'),(20,'Pacific Rim Trading','Laura','Hall','l.hall@pacific.com','555-2020','852 Ocean Dr','San Diego','CA','92101','USA','www.pacific.com','Referral','prospect',11,'2025-05-05 10:15:30','2025-05-11 07:35:33'),(21,'Vertex Innovations','Brian','Scott','b.scott@vertex.com','555-2121','123 Tech Circle','San Jose','CA','95101','USA','www.vertex.com','Website','customer',10,'2024-12-20 10:45:22','2025-05-11 07:35:36'),(22,'Northern Lights Ltd','Jessica','Adams','j.adams@northernl.com','555-2222','456 Aurora Blvd','Anchorage','AK','99501','USA','www.northernl.com','Trade Show','prospect',10,'2024-12-22 14:30:10','2025-05-11 07:35:39'),(23,'Precision Tools Co','Kevin','Nelson','k.nelson@precision.com','555-2323','789 Gauge St','Pittsburgh','PA','15201','USA','www.precision.com','Referral','customer',12,'2025-01-08 09:15:45','2025-05-11 07:35:42'),(24,'Silverline Services','Melissa','Carter','m.carter@silverline.com','555-2424','321 Sterling Ave','Las Vegas','NV','89101','USA','www.silverline.com','Cold Call','lead',12,'2025-01-15 13:40:30','2025-05-11 07:35:45'),(25,'Granite Holdings','Richard','Parker','r.parker@granite.com','555-2525','654 Rock Rd','Salt Lake City','UT','84101','USA','www.granite.com','Email Campaign','customer',12,'2025-01-22 16:25:50','2025-05-11 07:35:48'),(26,'Coastal Trading','Stephanie','Evans','s.evans@coastal.com','555-2626','987 Shoreline Dr','Charleston','SC','29401','USA','www.coastal.com','Trade Show','inactive',12,'2025-01-28 11:50:15','2025-05-11 07:35:51'),(27,'Quantum Systems','Jason','Roberts','j.roberts@quantum.com','555-2727','246 Atom Ln','Albuquerque','NM','87101','USA','www.quantum.com','Website','prospect',5,'2025-02-05 08:35:20','2025-05-11 07:35:54'),(28,'Everlast Solutions','Nicole','Turner','n.turner@everlast.com','555-2828','369 Durable St','Memphis','TN','38101','USA','www.everlast.com','Social Media','lead',7,'2025-02-12 10:20:40','2025-05-11 07:35:57'),(29,'Urban Edge Group','Eric','Phillips','e.phillips@urbanedge.com','555-2929','159 Metro Way','Baltimore','MD','21201','USA','www.urbanedge.com','Referral','customer',9,'2025-02-18 15:10:25','2025-05-11 07:36:00'),(30,'Pinnacle Partners','Rebecca','Campbell','r.campbell@pinnacle.com','555-3030','753 Summit Pl','Charlotte','NC','28201','USA','www.pinnacle.com','Cold Call','customer',9,'2025-02-25 09:45:10','2025-05-11 07:36:07'),(31,'Blue Ocean Ventures','Steven','Stewart','s.stewart@blueocean.com','555-3131','852 Deepsea Ave','New Orleans','LA','70112','USA','www.blueocean.com','Email Campaign','prospect',NULL,'2025-03-03 12:30:45','2025-05-01 14:20:15'),(32,'Golden Arrow Inc','Michelle','Sanchez','m.sanchez@goldenarrow.com','555-3232','963 Target St','Indianapolis','IN','46201','USA','www.goldenarrow.com','Trade Show','customer',NULL,'2025-03-10 14:45:30','2025-04-15 10:35:20'),(33,'Summit View LLC','Timothy','Morris','t.morris@summitview.com','555-3333','147 Overlook Dr','Kansas City','MO','64101','USA','www.summitview.com','Website','inactive',NULL,'2025-03-17 16:20:15','2025-04-12 13:10:45'),(34,'Horizon Marketing','Angela','Cook','a.cook@horizonmkt.com','555-3434','258 Vista Blvd','Milwaukee','WI','53201','USA','www.horizonmkt.com','Referral','lead',NULL,'2025-03-24 08:15:40','2025-04-18 09:25:30'),(35,'Titan Tech','Jeremy','Murphy','j.murphy@titantech.com','555-3535','369 Colossus Way','Columbus','OH','43201','USA','www.titantech.com','Cold Call','customer',NULL,'2025-04-02 11:40:25','2025-05-09 15:45:10'),(36,'Evergreen Marketing','Christina','Rivera','c.rivera@evergreenmkt.com','555-3636','456 Pinecone Ln','Portland','ME','04101','USA','www.evergreenmkt.com','Email Campaign','prospect',NULL,'2025-04-08 13:55:10','2025-05-06 16:30:45'),(37,'Apex Analytics','Ryan','Cooper','r.cooper@apexanalytics.com','555-3737','789 Peakview Ct','Raleigh','NC','27601','USA','www.apexanalytics.com','Trade Show','customer',NULL,'2025-04-14 09:25:35','2025-05-03 11:15:20'),(38,'Pacific Crest Group','Heather','Reed','h.reed@pacificcrest.com','555-3838','159 Mountain Way','Boise','ID','83701','USA','www.pacificcrest.com','Website','inactive',NULL,'2025-04-20 12:35:50','2025-05-11 10:25:15'),(39,'Summit Financial','Nicholas','Bailey','n.bailey@summitfin.com','555-3939','753 Capital Ave','Omaha','NE','68101','USA','www.summitfin.com','Social Media','customer',NULL,'2025-04-26 15:45:20','2025-05-10 14:35:40'),(40,'Oceanview Enterprises','Rachel','Bennett','r.bennett@oceanview.com','555-4040','852 Seafoam Dr','Honolulu','HI','96801','USA','www.oceanview.com','Referral','prospect',NULL,'2025-05-03 10:15:30','2025-05-10 09:55:25');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `value` decimal(10,2) NOT NULL,
  `currency` varchar(255) DEFAULT 'USD',
  `stage` enum('lead','qualified','proposal','negotiation','closed_won','closed_lost') DEFAULT 'lead',
  `probability` int DEFAULT '0',
  `expectedCloseDate` datetime DEFAULT NULL,
  `actualCloseDate` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `customerId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `deals_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `deals_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,'Enterprise Software Deal',NULL,120000.00,'USD','closed_lost',80,'2025-06-06 00:00:00',NULL,5,1,'2025-04-11 07:42:42','2025-05-11 08:46:10'),(2,'Cloud Migration Project',NULL,75000.00,'USD','proposal',60,'2025-05-31 00:00:00',NULL,5,2,'2025-04-11 07:43:29','2025-05-11 07:43:29'),(3,'Marketing Automation SaaS',NULL,45000.00,'USD','qualified',40,'2025-05-25 00:00:00',NULL,5,5,'2025-03-11 07:44:36','2025-05-11 07:44:36'),(4,'AI Customer Support Platform',NULL,90000.00,'USD','proposal',65,'2025-05-25 00:00:00',NULL,6,6,'2025-02-11 08:08:50','2025-05-11 08:08:50'),(5,' Cybersecurity Audit for Healthcare Provider',NULL,150000.00,'USD','negotiation',75,'2025-11-01 00:00:00',NULL,6,9,'2025-03-11 08:11:26','2025-05-11 08:11:26'),(6,'Renewable Energy SaaS (Solar Analytics)',NULL,60000.00,'USD','qualified',50,'2025-08-18 00:00:00',NULL,6,11,'2025-02-11 08:13:21','2025-05-11 08:13:21'),(7,'Enterprise CRM Implementation',NULL,250000.00,'USD','closed_won',85,'2026-01-01 00:00:00',NULL,7,3,'2025-01-11 08:17:57','2025-05-11 08:44:03'),(8,'Manufacturing IoT Solution',NULL,180000.00,'USD','proposal',60,'2025-05-04 00:00:00',NULL,7,7,'2025-01-11 08:20:41','2025-05-11 08:20:41'),(9,'Healthcare Data Analytics',NULL,95000.00,'USD','qualified',45,'2025-05-25 00:00:00',NULL,7,13,'2025-01-11 08:23:45','2025-05-11 08:23:45'),(10,'Financial Compliance Software',NULL,320000.00,'USD','lead',20,'2025-08-17 00:00:00',NULL,7,28,'2025-05-11 08:25:48','2025-05-11 08:25:48'),(11,'Cloud Migration for Law Firm',NULL,145000.00,'USD','negotiation',80,'2025-10-26 00:00:00',NULL,8,4,'2025-05-11 08:30:25','2025-05-11 08:30:25'),(12,'Retail Analytics Platform',NULL,68000.00,'USD','proposal',55,'2025-09-28 00:00:00',NULL,8,4,'2025-05-11 08:33:23','2025-05-11 08:33:23'),(13,'Hotel Chain Digital Transformation',NULL,175000.00,'USD','closed_won',70,'2025-05-25 00:00:00',NULL,9,12,'2025-02-11 08:36:08','2025-05-11 08:46:13'),(14,'Pharmaceutical Clinical Trial Platform',NULL,320000.00,'USD','negotiation',65,'2026-02-28 00:00:00',NULL,9,29,'2025-05-11 08:38:07','2025-05-11 08:38:07');
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoiceNumber` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) DEFAULT '0.00',
  `totalAmount` decimal(10,2) NOT NULL,
  `currency` varchar(255) DEFAULT 'USD',
  `issueDate` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `status` enum('draft','sent','paid','overdue','cancelled') DEFAULT 'draft',
  `paymentDate` datetime DEFAULT NULL,
  `notes` text,
  `customerId` int NOT NULL,
  `dealId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoiceNumber` (`invoiceNumber`),
  KEY `customerId` (`customerId`),
  KEY `dealId` (`dealId`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'INV-7-897',250000.00,0.10,275000.00,'USD','2025-05-11 08:42:51','2026-01-01 00:00:00','paid','2025-05-11 08:44:03',NULL,3,7,'2025-05-11 08:42:51','2025-05-11 08:44:03'),(2,'INV-1-830',120000.00,0.10,132000.00,'USD','2025-05-11 08:43:32','2025-06-06 00:00:00','cancelled','2025-05-11 08:46:10',NULL,1,1,'2025-05-11 08:43:32','2025-05-11 08:46:10'),(3,'INV-11-486',145000.00,0.10,159500.00,'USD','2025-05-11 08:45:54','2025-10-26 00:00:00','overdue','2025-05-11 08:46:07',NULL,4,11,'2025-05-11 08:45:54','2025-05-11 08:46:07'),(4,'INV-5-169',150000.00,0.10,165000.00,'USD','2025-05-11 08:45:56','2025-11-01 00:00:00','sent',NULL,NULL,9,5,'2025-05-11 08:45:56','2025-05-11 08:45:56'),(5,'INV-13-697',175000.00,0.10,192500.00,'USD','2025-05-11 08:45:59','2025-05-25 00:00:00','paid','2025-05-11 08:46:12',NULL,12,13,'2025-05-11 08:45:59','2025-05-11 08:46:12');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `userId` int NOT NULL,
  `customerId` int DEFAULT NULL,
  `dealId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `customerId` (`customerId`),
  KEY `dealId` (`dealId`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notes_ibfk_3` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,'The client (a mid-sized financial firm) has reviewed the proposal and agreed on core features. They’re now negotiating payment terms and SLAs. Legal is reviewing the contract, and we expect signatures by mid-July. Competitor is pushing for a last-minute discount, but our product’s compliance features give us an edge',5,1,1,'2025-05-11 07:46:10','2025-05-11 07:46:10'),(2,'The IT team at a retail chain approved our solution for their hybrid cloud setup. We’ve submitted a detailed proposal with a 10% discount for annual prepayment. Their CFO will review next week—follow-up scheduled for June 20. Risk: Their current vendor is undercutting pricing.',5,2,2,'2025-05-11 07:46:32','2025-05-11 07:46:32'),(3,'The CMO loves our platform’s analytics but needs approval from the tech team to ensure API compatibility with their CRM. A demo with their engineers is set for next week. If integration checks pass, we’ll move to proposal. Budget is confirmed, but timeline is Q3.',5,5,3,'2025-05-11 07:47:04','2025-05-11 07:47:04'),(4,'The client (an e-commerce company) tested our demo and was impressed with the NLP capabilities. They requested a detailed quote for the Enterprise plan, including CRM integration. Need to highlight the 30% cost reduction compared to their current Zendesk setup. Risk: Competitor (Freshdesk AI) is offering a cheaper but less customizable solution.',6,6,4,'2025-05-11 08:09:15','2025-05-11 08:09:15'),(5,'A regional hospital chain needs compliance auditing (HIPAA/GDPR). We’ve agreed on scope but are negotiating payment terms—they want quarterly installments vs. our standard 50% upfront. Key stakeholder is the CISO, who prioritizes our experience in healthcare. Competitor: Palo Alto is pushing a bundled product',6,9,5,'2025-05-11 08:11:46','2025-05-11 08:11:46'),(6,'A solar farm operator wants real-time energy forecasting tools. Budget is approved, but they’re evaluating two other vendors. Our differentiator: predictive maintenance alerts. Next step: Custom demo showing their historical data imported into our platform.',6,11,6,'2025-05-11 08:13:44','2025-05-11 08:13:44'),(7,'Global retail chain is migrating from Salesforce to our platform. Finalizing contract terms - they want extended training and 24/7 support included at current price. Legal is reviewing termination clauses. Decision expected by month-end',7,3,7,'2025-05-11 08:18:17','2025-05-11 08:18:17'),(8,'Automotive parts manufacturer needs predictive maintenance system. Proposal delivered last week - they\'re comparing with Siemens. Our edge: faster deployment and lower hardware costs. Plant manager is champion but needs CFO approval',7,7,8,'2025-05-11 08:21:04','2025-05-11 08:21:04'),(9,'Regional hospital group evaluating our analytics platform for patient flow optimization. Key concern: integration with Epic EHR. Technical team is reviewing our API documentation. Budget approved but timeline uncertain',7,13,9,'2025-05-11 08:24:00','2025-05-11 08:24:00'),(10,'Multinational bank exploring AML solution. Initial discovery call revealed pain points with current manual processes. Need to demonstrate automation capabilities and audit trail features. Long sales cycle expected (6-9 months).',7,28,10,'2025-05-11 08:26:10','2025-05-11 08:26:10'),(11,'Mid-sized law firm (200 attorneys) transitioning from on-premise servers. Agreement reached on scope and pricing, but partners are concerned about data sovereignty. Need to confirm our EU and US data center locations meet their compliance requirements. Final signatures pending legal review.',8,4,11,'2025-05-11 08:30:54','2025-05-11 08:30:54'),(12,'National fashion retailer testing our AI-powered inventory optimization. Store managers love the predictive capabilities, but corporate is weighing cost vs. current manual processes. Requires integration with their SAP system. Competing against homegrown solution.',8,4,12,'2025-05-11 08:33:51','2025-05-11 08:33:51'),(13,'Luxury hotel group with 12 properties seeking unified guest experience platform. Our solution combines mobile check-in, IoT room controls, and CRM integration. Director of Operations is championing our solution, but procurement requires three competitive bids. Key differentiator: our AI-powered upsell recommendations drove 22% ancillary revenue in pilot tests.',9,12,13,'2025-05-11 08:36:22','2025-05-11 08:36:22'),(14,'Top 10 pharma company evaluating our eClinical solution for Phase III trials. Compliance team requires 21 CFR Part 11 validation documentation. Legal is hung up on liability clauses around data integrity. Our advantage: the only vendor with blockchain-based audit trails approved by EU EMA.',9,29,14,'2025-05-11 08:38:26','2025-05-11 08:38:26');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','manager','sales','customer') DEFAULT 'customer',
  `isActive` tinyint(1) DEFAULT '1',
  `lastLogin` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','User','admin@example.com','$2b$10$GYwws.MQQ6H84hRQnX8IFeJOfxTaV5qKIQNFp.Vn90hIA5YZyu2IK','admin',1,'2025-05-11 06:46:32','2025-05-11 06:38:45','2025-05-11 06:46:32'),(2,'John','Smith','manager1@gmail.com','$2b$10$7qSr7/nwfxUg960r6nNbUuZbvTl8fEgroo/n5e0C5LdBwavpJfruO','admin',1,'2025-05-11 07:58:29','2025-05-11 07:15:45','2025-05-11 07:58:29'),(3,'Emily','Johnson','manager2@gmail.com','$2b$10$GsvoG5c8QQvo6cOg0xrT7.VFDusEWOGdtoPo/TlcDtuHuBPVDPB2W','manager',1,NULL,'2025-05-11 07:16:24','2025-05-11 07:16:24'),(4,'Michael','Brown','manager3@gmail.com','$2b$10$w/Fz2JRwrBfHsVXHmkhAvuLUFG2H5q4w8mI8LSjvpKF98Bwz.cIau','manager',1,NULL,'2025-05-11 07:17:03','2025-05-11 07:17:03'),(5,'Sarah','Williams','sale1@gmail.com','$2b$10$3GTfpT9FBExaKb.RxjVPAOyrdFFK2RUVFaTE4nPqDXeLtDC9Vjgf.','sales',1,'2025-05-11 07:57:51','2025-05-11 07:18:19','2025-05-11 07:57:51'),(6,'David','Martinez','sale2@gmail.com','$2b$10$sdTJjcTl0RXa/JkvCYVwq.fHnGKFXt8P/UpUtoAZjTMdfelmFs3Qu','sales',1,'2025-05-11 08:06:31','2025-05-11 07:19:11','2025-05-11 08:06:31'),(7,'Jessica','Taylow','sale3@gmail.com','$2b$10$OKyblxTH3PI9w5a1.ItFPOw0G6nvxWQP4ZELExGX1Ycenc/SJMPW.','sales',1,'2025-05-11 08:14:53','2025-05-11 07:19:49','2025-05-11 08:14:53'),(8,'Robert','Anderson','sale4@gmail.com','$2b$10$vPmocRk3zYBOkrfBCHniQODeWEHGwAgpaB2CEhhSVY.xUZmplE696','sales',1,'2025-05-11 08:27:44','2025-05-11 07:20:45','2025-05-11 08:27:44'),(9,'Lisa','Garcia','sale5@gmail.com','$2b$10$zSm3iykc62qzcdbcbaM/COiAeDatkkfsASnkoBS9yoS7DniqhYXvm','sales',1,'2025-05-11 08:35:19','2025-05-11 07:21:08','2025-05-11 08:35:19'),(10,'James','Lee','sale6@gmail.com','$2b$10$MOF9YSpiSYt8D/RDtSl8uOcytFlhaUm2ophyd0yS5eDgERLgaKT4K','sales',1,NULL,'2025-05-11 07:21:37','2025-05-11 07:21:37'),(11,'Amanda','Harris','sale7@gmail.com','$2b$10$lFg7NymxImWXK344lXSq6e1bVe8METwrAXnhLSpmeI/vcQFX8ZMMm','sales',1,NULL,'2025-05-11 07:22:01','2025-05-11 07:22:01'),(12,'Daniel','Clark','sale8@gmail.com','$2b$10$McTAZ4Wl2QDaAMECjy4lAexNb8abD/pPB.GFpoaifuHiIGU187TIq','sales',1,NULL,'2025-05-11 07:22:36','2025-05-11 07:22:36'),(13,'Olivia','Lewis','customer1@gmail.com','$2b$10$vAJAShu0XTRZiNlUI4m2q.28qWpk5WWfXtVoxUwLIE/XrRSV7v/7e','customer',1,NULL,'2025-05-11 07:23:05','2025-05-11 07:23:05'),(14,'Kelvin','Walker','customer2@gmail.com','$2b$10$ULZPX5sMG1u6LsvkQp1WVOrh7wI4tVBLHy0M4z40NBnwpR2ouP/o6','customer',1,NULL,'2025-05-11 07:23:31','2025-05-11 07:23:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-11 15:53:04
