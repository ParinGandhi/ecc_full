CREATE DATABASE  IF NOT EXISTS `rayuidemo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rayuidemo`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rayuidemo
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `access_control_list`
--

DROP TABLE IF EXISTS `access_control_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_control_list` (
  `ACCESS_CONTROL_ENTRY_ID` int NOT NULL,
  `FK_APPLICATION_USER_ROLE_ID` int DEFAULT NULL,
  `FK_RESOURCE_OBJECT_ID` int DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `CREATE_USER_ID` int DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT NULL,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  PRIMARY KEY (`ACCESS_CONTROL_ENTRY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_control_list`
--

LOCK TABLES `access_control_list` WRITE;
/*!40000 ALTER TABLE `access_control_list` DISABLE KEYS */;
INSERT INTO `access_control_list` VALUES (1,1,1,'2020-02-07 21:58:58','2020-02-07 21:58:58',123,'2020-02-07 21:58:58',123,'2020-02-07 21:58:58',0);
/*!40000 ALTER TABLE `access_control_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_user`
--

DROP TABLE IF EXISTS `application_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_user` (
  `APPLICATION_USER_ID` int NOT NULL,
  `USER_CT` char(8) DEFAULT NULL,
  `CFK_PATRON_ID` char(36) DEFAULT NULL,
  `CFK_EMPLOYEE_ID` varchar(6) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `EMAIL_ADDRESS_TX` varchar(320) DEFAULT NULL,
  `CREATE_USER_ID` int DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LOCK_CONTROL_NO` int DEFAULT NULL,
  `FIRST_NM` varchar(60) DEFAULT NULL,
  `LAST_NM` varchar(60) DEFAULT NULL,
  `MIDDLE_NM` varchar(60) DEFAULT NULL,
  `LAST_LOGIN_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `USER_ID` varchar(20) DEFAULT NULL,
  `APPEALS_AFFILIATION_CT` varchar(20) DEFAULT 'TRIALS_ONLY',
  `FK_ACTS_EMPLOYEE_NO` varchar(6) DEFAULT NULL,
  `DISCIPLINE_CD` varchar(4) DEFAULT NULL,
  `APJ_SENIORITY_RANK_NO` int DEFAULT NULL,
  `JOB_CLASSIFICATION_CD` varchar(4) DEFAULT NULL,
  `PREFERRED_FULL_NM` varchar(200) DEFAULT NULL,
  `FAX_NO` varchar(25) DEFAULT NULL,
  `PRIMARY_TELEPHONE_NO` varchar(25) DEFAULT NULL,
  `LEAD_APJ_IN` char(1) DEFAULT NULL,
  `TRIAL_JUDGE_IN` char(1) DEFAULT NULL,
  `DIVISION_NM` varchar(25) DEFAULT NULL,
  `SECTION_NM` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`APPLICATION_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_user`
--

LOCK TABLES `application_user` WRITE;
/*!40000 ALTER TABLE `application_user` DISABLE KEYS */;
INSERT INTO `application_user` VALUES (123,NULL,NULL,'1','2020-02-07 21:58:58','2020-02-07 21:58:58',NULL,123,'2020-02-07 21:58:58',123,'2020-02-07 21:58:58',0,'Sai Kumar','Potharaju',NULL,'2020-02-07 21:58:58','spotharaju','TRIALS_ONLY',NULL,'SC10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(555,NULL,NULL,'2','2020-02-12 14:22:55',NULL,NULL,555,'2020-02-12 14:22:55',555,'2020-02-12 14:22:55',0,'Parin','Gandhi',NULL,'2020-02-12 14:22:55','pgandhi','TRIALS_ONLY',NULL,'SC10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(777,NULL,NULL,'3','2020-02-07 21:58:58',NULL,NULL,777,'2020-02-07 21:58:58',777,'2020-02-07 21:58:58',NULL,'Ravi','Ramani',NULL,'2020-02-07 21:58:58','rramani','TRIALS_ONLY',NULL,'SC10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `application_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_user_role`
--

DROP TABLE IF EXISTS `application_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_user_role` (
  `APPLICATION_USER_ROLE_ID` int NOT NULL,
  `FK_APPLICATION_USER_ID` int DEFAULT NULL,
  `FK_USER_ROLE_ID` int DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `CREATE_USER_ID` int DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT NULL,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  PRIMARY KEY (`APPLICATION_USER_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_user_role`
--

LOCK TABLES `application_user_role` WRITE;
/*!40000 ALTER TABLE `application_user_role` DISABLE KEYS */;
INSERT INTO `application_user_role` VALUES (1,123,1,'2020-02-07 21:58:58','2020-02-07 21:58:58',123,'2020-02-07 21:58:58',123,'2020-02-07 21:58:58',0),(2,555,1,'2020-02-12 14:24:55',NULL,555,'2020-02-12 14:24:55',555,'2020-02-12 14:24:55',0),(3,777,1,'2020-02-07 21:58:58',NULL,777,'2020-02-07 21:58:58',777,'2020-02-07 21:58:58',0);
/*!40000 ALTER TABLE `application_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_reference`
--

DROP TABLE IF EXISTS `code_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_reference` (
  `TYPE_CD` varchar(30) NOT NULL,
  `VALUE_TX` varchar(200) NOT NULL,
  `DESCRIPTION_TX` varchar(4000) NOT NULL,
  `LAST_MODIFIED_TS` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LAST_MODIFIED_USER_ID` varchar(20) NOT NULL,
  PRIMARY KEY (`TYPE_CD`,`VALUE_TX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_reference`
--

LOCK TABLES `code_reference` WRITE;
/*!40000 ALTER TABLE `code_reference` DISABLE KEYS */;
INSERT INTO `code_reference` VALUES ('12_CONFIG','1~0||0||','Key Like for 12 config position no 1','2020-02-09 18:37:21','mmylar'),('12_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('12_MAPPING_FOR_WIDTH','0||0','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('12_MAPPING_FOR_ZONE','0||0','Zone mapping for 12 ','2020-02-09 20:59:13','mmylar'),('12-4-4-4-12_CONFIG','1~1||0||','Key Like for 12-4-4-4-12 config position no 1','2020-02-09 18:37:21','mmylar'),('12-4-4-4-12_CONFIG','2~1||1||','Key Like for 12-4-4-4-12 config position no 2','2020-02-09 18:37:21','mmylar'),('12-4-4-4-12_CONFIG','3~1||2||','Key Like for 12-4-4-4-12 config position no 3','2020-02-09 18:37:21','mmylar'),('12-4-4-4-12_CONFIG','4~0||0||','Key Like for 12-4-4-4-12 config position no 4','2020-02-09 18:37:21','mmylar'),('12-4-4-4-12_CONFIG','5~2||0||','Key Like for 12-4-4-4-12 config position no 5','2020-02-09 18:37:21','mmylar'),('12-4-4-4-12_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('12-4-4-4-12_MAPPING_FOR_WIDTH','0||0-1||0-1||1-1||2-2||0','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('12-4-4-4-12_MAPPING_FOR_ZONE','1||0-1||1-1||2-0||0-2||0','Zone mapping for 12-4-4-4-12 ','2020-02-09 20:59:13','mmylar'),('12-4-8-12_CONFIG','1~1||1||','Key Like for 12-4-8-12 config position no 1','2020-02-09 18:37:20','mmylar'),('12-4-8-12_CONFIG','2~1||0||','Key Like for 12-4-8-12 config position no 2','2020-02-09 18:37:20','mmylar'),('12-4-8-12_CONFIG','3~0||0||','Key Like for 12-4-8-12 config position no 3','2020-02-09 18:37:20','mmylar'),('12-4-8-12_CONFIG','4~2||0||','Key Like for 12-4-8-12 config position no 4','2020-02-09 18:37:20','mmylar'),('12-4-8-12_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('12-4-8-12_MAPPING_FOR_WIDTH','0||0-1||0-1||1-2||0','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('12-4-8-12_MAPPING_FOR_ZONE','1||1-1||0-0||0-2||0','Zone mapping for 12-4-8-12','2020-02-09 20:59:13','mmylar'),('4-4_CONFIG','1~0||0||','Key Like for 4-4 config position no 1','2020-02-09 18:37:21','mmylar'),('4-4_CONFIG','2~0||1||','Key Like for 4-4 config position no 2','2020-02-09 18:37:21','mmylar'),('4-4_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('4-4_MAPPING_FOR_WIDTH','0||0-0||1','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('4-4-4_CONFIG','1~0||0||','Key Like for 4-4-4 config position no 1','2020-02-09 18:37:20','mmylar'),('4-4-4_CONFIG','2~0||1||','Key Like for 4-4-4 config position no 2','2020-02-09 18:37:22','mmylar'),('4-4-4_CONFIG','3~0||2||','Key Like for 4-4-4 config position no 3','2020-02-09 18:37:22','mmylar'),('4-4-4_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('4-4-4_MAPPING_FOR_WIDTH','0||0-0||1-0||2','Position reference for 12-4-8-12 ','2020-02-09 20:59:13','mmylar'),('4-4-4_MAPPING_FOR_ZONE','0||0-0||1-0||2','Zone mapping for 4-4-4 ','2020-02-09 20:59:13','mmylar'),('4-8_CONFIG','1~0||1||','Key Like for 4-8 config position no 1','2020-02-09 18:37:22','mmylar'),('4-8_CONFIG','2~0||0||','Key Like for 4-8 config position no 2','2020-02-09 18:37:22','mmylar'),('4-8_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('4-8_MAPPING_FOR_WIDTH','0||0-0||1','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('4-8_MAPPING_FOR_ZONE','0||1-0||0','Zone mapping for 4-8','2020-02-09 20:59:13','mmylar'),('6-6_CONFIG','1~0||0||','Key Like for 4-8 config position no 1','2020-02-09 18:37:20','mmylar'),('6-6_CONFIG','2~0||1||','Key Like for 4-8 config position no 2','2020-02-09 18:35:11','mmylar'),('6-6_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('6-6_MAPPING_FOR_WIDTH','0||0-0||1','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('6-6_MAPPING_FOR_ZONE','0||0-0||1','Zone mapping for 6-6','2020-02-09 20:59:13','mmylar'),('8-4_CONFIG','1~0||0||','Key Like for 8-4 config position no 1','2020-02-09 18:37:21','mmylar'),('8-4_CONFIG','2~0||1||','Key Like for 8-4 config position no 2','2020-02-09 18:37:21','mmylar'),('8-4_DEFAULT_ZONE','1','Default Zone where the widgets from greater zones will be added','2020-01-01 00:00:01','mmylar'),('8-4_MAPPING_FOR_WIDTH','0||0-0||1','Position reference for 12-4-8-12 ','2020-02-09 20:59:14','mmylar'),('8-4_MAPPING_FOR_ZONE','0||0-0||1','Zone mapping for 8-4 ','2020-02-09 20:59:13','mmylar'),('APJ DISCIPLINE','A','Admin','2020-02-10 23:46:14','ACTSUSER'),('APJ DISCIPLINE','B','Biotech','2020-02-10 23:46:15','ACTSAPP'),('APJ DISCIPLINE','BM','Business Methods','2020-02-10 23:46:14','ACTSAPP'),('APJ DISCIPLINE','C','Chemical','2020-02-10 23:46:15','ACTSAPP'),('APJ DISCIPLINE','CBA','Chief Board Admin','2020-02-10 23:46:14','ACTSAPP'),('APJ DISCIPLINE','CE','Communication/Electrical','2020-02-10 23:46:13','ACTSUSER'),('APJ DISCIPLINE','CM','Computer','2020-02-10 23:46:13','ACTSUSER'),('APJ DISCIPLINE','E','Electrical','2020-02-10 23:46:15','ACTSAPP'),('APJ DISCIPLINE','E1','Electrical 1','2020-02-10 23:46:13','ACTSAPP'),('APJ DISCIPLINE','E2','Electrical 2','2020-02-10 23:46:12','ACTSAPP'),('APJ DISCIPLINE','E3','Electrical 3','2020-02-10 23:46:13','ACTSAPP'),('APJ DISCIPLINE','E4','Electrical 4','2020-02-10 23:46:12','ACTSAPP'),('APJ DISCIPLINE','E5','Electrical 5','2020-02-10 23:46:12','ACTSAPP'),('APJ DISCIPLINE','M','Mechanical','2020-02-10 23:46:15','ACTSAPP'),('APJ DISCIPLINE','RE','Reexam','2020-02-10 23:46:12','ACTSAPP'),('APJ DISCIPLINE','SC10','Section 10','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','SC11','Section 11','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SC12','Section 12','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','SC13','Section 13','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SC14','Section 14','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC15','Section 15','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC16','Section 16','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC17','Section 17','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC18','Section 18','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC19','Section 19','2020-02-10 23:46:09','ACTSUSER'),('APJ DISCIPLINE','SC20','Section 20','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','SEC1','Section 1','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SEC2','Section 2','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SEC3','Section 3','2020-02-10 23:46:12','ACTSUSER'),('APJ DISCIPLINE','SEC4','Section 4','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SEC5','Section 5','2020-02-10 23:46:12','ACTSUSER'),('APJ DISCIPLINE','SEC6','Section 6','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','SEC7','Section 7','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','SEC8','Section 8','2020-02-10 23:46:11','ACTSUSER'),('APJ DISCIPLINE','SEC9','Section 9','2020-02-10 23:46:10','ACTSUSER'),('APJ DISCIPLINE','TM','Contested Case','2020-02-10 23:46:14','ACTSAPP'),('APJ DISCIPLINE','TP','Interference','2020-02-10 23:46:13','ACTSAPP'),('CREATE_WIDGET_DEFAULT','HEIGHT','2','2020-01-01 00:00:01','mmylar'),('HEIGHT_STR_INT_MAP','1','widgetHeightSmall','2020-01-01 00:00:01','mmylar'),('HEIGHT_STR_INT_MAP','2','widgetHeightMedium','2020-01-01 00:00:01','mmylar'),('HEIGHT_STR_INT_MAP','3','widgetHeightXlarge','2020-01-01 00:00:01','mmylar'),('HEIGHT_STR_INT_MAP','4','widgetHeightLarge','2020-01-01 00:00:01','mmylar');
/*!40000 ALTER TABLE `code_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stnd_resource_object`
--

DROP TABLE IF EXISTS `stnd_resource_object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stnd_resource_object` (
  `RESOURCE_OBJECT_ID` int NOT NULL,
  `RESOURCE_OBJECT_NM` varchar(200) DEFAULT NULL,
  `DESCRIPTION_TX` varchar(2000) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `DISPLAY_ORDER_SEQUENCE_NO` int DEFAULT '0',
  `CREATE_USER_ID` int DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LOCK_CONTROL_NO` int DEFAULT NULL,
  `RESOURCE_OBJECT_TYPE_NM` varchar(50) DEFAULT 'APPLICATION_DEFAULT',
  `RESOURCE_OBJECT_VALUE_TX` varchar(500) DEFAULT NULL,
  `CONFIG_DOC` longtext,
  PRIMARY KEY (`RESOURCE_OBJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stnd_resource_object`
--

LOCK TABLES `stnd_resource_object` WRITE;
/*!40000 ALTER TABLE `stnd_resource_object` DISABLE KEYS */;
INSERT INTO `stnd_resource_object` VALUES (1,'announcements','Announcements','2020-02-09 19:10:58',NULL,1,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(2,'reportCenter','Report Center','2020-02-09 19:10:58',NULL,1,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(3,'systemStatus','System Status','2020-02-09 19:10:58',NULL,1,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(4,'viewCaseDockets','View Case Dockets','2020-02-09 19:10:59',NULL,1,1,'2020-02-09 19:10:59',1,'2020-02-09 19:10:59',0,'APPLICATION_DEFAULT',NULL,NULL),(5,'Paneling','Paneling Admin','2020-02-09 19:10:58',NULL,1,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'PANEL',NULL,NULL),(6,'userCustomDates','User Custom Dates','2020-02-09 19:10:57',NULL,11,1,'2020-02-09 19:10:57',1,'2020-02-09 19:10:57',0,'APPLICATION_DEFAULT',NULL,NULL),(7,'assignments','Assignments','2020-02-09 19:10:59',NULL,1,1,'2020-02-09 19:10:59',1,'2020-02-09 19:10:59',0,'APPLICATION_DEFAULT',NULL,'{\n\n                \"paginationSize\": 10,\n\n                \"selectedColumns\": [\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"alert\"\n\n                                                ],\n\n                                                \"columnLabel\": \"Alerts\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div style=\"margin-left: 10px; margin-top: 7px;\"><i ng-if=\"row.entity.alerts[0] !== \" tabindex=\"0\" title=\"Critical indicator\" tooltip-placement=\"right\" class=\"fas fa-flag\" style=\"color: red; margin-right:4px;\"></i><i ng-if=\"row.entity.alerts[1] !== \" tabindex=\"0\" title=\"New assignment\" tooltip-placement=\"right\" class=\"fas fa-plus-circle\" style=\"color: green; margin-right:4px;\"></i><i ng-if=\"row.entity.alerts[2] !== \" tabindex=\"0\" title=\"Assignment is due today ({{row.entity.ASSIGNMENT_DUE_DT | date:\'MM/dd/yyyy\'}})\" tooltip-placement=\"right\" class=\"far fa-clock\" style=\"color:#F2A900; margin-right:4px;\"></i><i ng-if=\"row.entity.alerts[3] !== \" tabindex=\"0\" title=\"Assignment is past due ({{row.entity.ASSIGNMENT_DUE_DT | date:\'MM/dd/yyyy\'}})\" tooltip-placement=\"right\" class=\"fas fa-exclamation\" style=\"color: red; margin-right:4px;\"></i><i ng-if=\"row.entity.alerts[4] !== \" tabindex=\"0\" title=\"User is inactive\" tooltip-placement=\"right\" class=\"fas fa-user-times\"></i></div>\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 95,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"ASSIGNMENT_DUE_DT\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assignment due date\",\n\n                                                \"columnType\": \"date\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy\'\",\n\n                                                \"cellTemplate\": \"<div ng-class=\"{\'grid-highlight-active\': row.entity.dueDateStatus === \'NEW\', \'grid-highlight-warning\': row.entity.dueDateStatus === \'TODAY\', \'grid-highlight-danger\':row.entity.dueDateStatus === \'PASTDUE\'}\"><div class=\"ui-grid-cell-contents\">{{COL_FIELD | date:\'MM/dd/yyyy\'}}</div></div>\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": true,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"TASK_TITLE_TX\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assignment title\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div style=\"cursor: pointer; margin-left: 8px; padding-top:5px; text-decoration: underline;\" class=\"truncateTitle\"><a role=\"button\" href title=\"{{COL_FIELD}}\" ng-click=\"grid.appScope.openupdateAssignmentModal(row)\" target=\"_blank\" id=\"{{COL_FIELD}}\"><u>{{COL_FIELD}}</u></a></div>;\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": true,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_AD_FK_APPEAL_NO\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Case #\",\n\n                                                \"columnType\": \"number\",\n\n                                                \"cellTemplate\": \"<div style=\"cursor: pointer; margin-left: 8px; padding-top:5px; text-decoration: underline;\" class=\"truncateTitle\"><a href ng-click=\"grid.appScope.openCaseViewer(row)\" title=\" open case viewer for  {{COL_FIELD}}\" target=\"_blank\" id=\"{{COL_FIELD}}\">{{COL_FIELD}}</a><span ng-if=\"row.entity.COMBINEDCASE === \'M\'\" > <a title=\"Merged case\"><img style=\"width:17px;height:17px;\" type=\"image\" src=\"assets/images/icons/blueMerge.png\" alt=\"Merged case\" /></a> </span></div>\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": true,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_AD_FK_AA_SERIAL_NO\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Application/Reexam #\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div style=\"cursor: pointer; margin-left: 8px; padding-top:5px; text-decoration: underline;\" class=\"truncateTitle\"><a href ng-click=\"grid.appScope.openCaseViewer(row)\" title=\" open case viewer for  {{COL_FIELD}}\" target=\"_blank\"  id=\"{{COL_FIELD}}\">{{COL_FIELD}}</a>\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"ASSIGNED_DT\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assigned date\",\n\n                                                \"columnType\": \"date\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy hh:mm:ss a\'\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_ASSIGNOR_BE_NO\",\n\n                                                                \"assignorName\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assignor\",\n\n                                                \"columnType\": \"String\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"COMMENT_TX\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Note\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"TASK_DESC_TX\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Description\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": true,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_ASSIGNMENT_TYPE_ID\",\n\n                                                                \"assignmentTypeDescription\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assignment type\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"COMPLETION_DT\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Completion date\",\n\n                                                \"columnType\": \"date\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy hh:mm:ss a\'\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"LAST_MODIFIED_TS\"\n\n                                                ],\n\n                                                \"aliasName\": \"assignmentLastModifiedTs\",\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Last modified timestamp\",\n\n                                                \"columnType\": \"date\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy hh:mm:ss a\'\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"LAST_MODIFIED_USER_ID\",\n\n                                                                \"lastModifiedUserName\"\n\n                                                ],\n\n                                                \"aliasName\": \"assignmentLastModifiedUids\",\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Last modified user\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_ASSIGNEE_BE_NO\",\n\n                                                                \"assigneeName\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assigned to\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div style=\"cursor: pointer; margin-left: 8px; padding-top:5px\" class=\"truncateTitle\"><i class=\"fas fa-user-times pull-left\" role=\"button\" href id=\"{{COL_FIELD}}\" title=\"InActive indicator\" ng-if=\"row.entity.assigneeStatus===\'InActive\'\" style=\"margin-top: 2.5px; margin-right: -16px; margin-left: 2px; color:red;\" id=\"{{COL_FIELD}}\" title=\"InActive indicator\"></i><span style=\"margin-left: 22px;\" ng-class=\"{\'mrgnTwoPx\':row.entity.assigneeStatus===\'InActive\'}\" >{{COL_FIELD}}</span></div>\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"PALM_MAILED_DT\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Palm mailed date\",\n\n                                                \"columnType\": \"date\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy\'\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_ASSIGNMENT_STATUS_CD\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Assignment status\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"cellTemplate\": \"<div><div style=\"margin-left: 8px; padding-top:5px;\" ng-if=\"row.entity.FK_ASSIGNMENT_STATUS_CD === \'A\'\">Open</div><div style=\"margin-left: 8px; padding-top:5px;\" ng-if=\"row.entity.FK_ASSIGNMENT_STATUS_CD === \'C\'\">Closed</div></div>\",\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"assigneeHistory\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Audit log\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div class=\"truncateTitle\" style=\"cursor: pointer; margin-left: 8px; padding-top:5px; text-decoration: underline;\"><a role=\"button\" href title=\"{{COL_FIELD}}\" ng-click=\"grid.appScope.openAssignmentHistory(row)\" target=\"_blank\" id=\"{{COL_FIELD}}\">Audit log <i class=\"fas fa-external-link-alt\"></i></a></div>\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"CREATOR_USER_ID\",\n\n                                                                \"creatorUserName\"\n\n                                                ],\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnLabel\": \"Created by\",\n\n                                                \"columnType\": \"String\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 140,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"tableName\": \"PTAB_ASSIGNMENT\",\n\n                                                \"columnName\": [\n\n                                                                \"ACTIVE_IN\",\n\n                                                                \"COMBINEDCASE\"\n\n                                                ],\n\n                                                \"columnLabel\": \"Combined cases\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"cellTemplate\": \"<div ng-if=\"row.entity.COMBINEDCASE === \'M\'\" title=\"Merged cases\" class=\"truncateTitle\" style=\"margin-top: 5px; margin-left: 5px;\"><p style=\"display: inline;\">{{row.entity.COMBINEDCASE}}</p><span ng-if=\"row.entity.COMBINEDCASE === \'M\'\" > <a title=\"Merged case\"><img style=\"width:17px;height:17px;\" type=\"image\" src=\"assets/images/icons/blueMerge.png\" alt=\"Merged case\" /></a> </span></div><div ng-if=\"row.entity.COMBINEDCASE !== \'M\'\" class=\"truncateTitle\" style=\"margin-top: 5px; margin-left: 5px;\"><p style=\"display: inline;\">{{row.entity.COMBINEDCASE}}</p></div>\",\n\n                                                \"defaultOrder\": \"asc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 200,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ]\n\n                                },\n\n                                {\n\n                                                \"columnName\": [\n\n                                                                \"FK_PROCEEDING_DISCIPLINE_CD\",\n\n                                                                \"panelingDiscipline\"\n\n                                                ],\n\n                                                \"tableName\": \"APPEAL\",\n\n                                                \"columnLabel\": \"PTAB paneling discipline\",\n\n                                                \"columnType\": \"string\",\n\n                                                \"defaultOrder\": \"desc\",\n\n                                                \"visible\": false,\n\n                                                \"mandatory\": false,\n\n                                                \"width\": 160,\n\n                                                \"sort\": {},\n\n                                                \"filters\": [\n\n                                                                {}\n\n                                                ],\n\n                                                \"pinned\": \"\"\n\n                                }\n\n,\n\n                                {\n\n            \"columnName\": [\n\n                \"TASK_CREATED_TS\",\n\n                                                                \"preExistentIdentifier\"\n\n            ],\n\n            \"tableName\": \"PTAB_ASSIGNMENT\",\n\n            \"columnLabel\": \"APJ submitted date\",\n\n            \"columnType\": \"date\",\n\n            \"defaultOrder\": \"desc\",\n\n            \"visible\": false,\n\n            \"mandatory\": false,\n\n            \"width\": 200,\n\n            \"sort\": {},\n\n            \"filters\": [\n\n                {}\n\n            ],\n\n            \"pinned\": \"\",\n\n                                                \"cellFilter\": \"date:\'MM/dd/yyyy\'\"\n\n        }\n\n                ]\n\n}'),(8,'Panel Administrators','Ptab Privileges','2020-02-09 19:10:59',NULL,2,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'PANEL',NULL,NULL),(9,'Normal Privileges','Admin Users','2020-02-09 19:10:59',NULL,2,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'Normal',NULL,NULL),(10,'Admin Privileges','Admin Users','2020-02-09 19:10:59',NULL,2,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'Admin',NULL,NULL),(11,'ImportManager Privileges','Admin Users','2020-02-09 19:10:59',NULL,2,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'ImportManager',NULL,NULL),(12,'All Privileges','Admin Users','2020-02-09 19:10:59',NULL,2,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'ImportManager And Admin',NULL,NULL),(13,'PostDecisionCaseManager Privileges','Admin Users','2020-02-09 19:10:57',NULL,2,5890,'2020-02-09 19:10:57',5890,'2020-02-09 19:10:57',0,'PostDecisionCaseManager',NULL,NULL),(14,'ImportManager_PostDecisionCaseManager Privileges','Admin Users','2020-02-09 19:10:57',NULL,2,5890,'2020-02-09 19:10:57',5890,'2020-02-09 19:10:57',0,'PostDecisionCaseManager and ImportManager',NULL,NULL),(15,'Admin_PostDecisionCaseManager Privileges','Admin Users','2020-02-09 19:10:57',NULL,2,5890,'2020-02-09 19:10:57',5890,'2020-02-09 19:10:57',0,'PostDecisionCaseManager and Admin',NULL,NULL),(16,'UsherUsers','Usher Users','2020-02-09 19:10:57',NULL,3,5890,'2020-02-09 19:10:57',5890,'2020-02-09 19:10:57',0,'Ushers',NULL,NULL),(21,'assignmentBasedDocket','Assignment Based Docket','2020-02-09 19:10:58',NULL,21,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(23,'myCredits','Crediting','2020-02-09 19:10:59',NULL,23,5890,'2020-02-09 19:10:59',5890,'2020-02-09 19:10:59',0,'APPLICATION_DEFAULT',NULL,NULL),(24,'masterDocket','Master Docket','2020-02-09 19:10:58',NULL,1,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(25,'workQueue','WorkQueue','2020-02-09 19:10:59',NULL,1,1,'2020-02-09 19:10:59',1,'2020-02-09 19:10:59',0,'APPLICATION_DEFAULT',NULL,NULL),(26,'panel_Update','panel_Update','2020-02-09 19:10:57',NULL,1,1,'2020-02-09 19:10:57',1,'2020-02-09 19:10:57',0,'panel_Update',NULL,NULL),(27,'dueDate_Update','dueDate_Update','2020-02-09 19:10:59',NULL,1,1,'2020-02-09 19:10:59',1,'2020-02-09 19:10:59',0,'dueDate_Update',NULL,NULL),(28,'PTAB_Login_Modal_Access','PTAB_Login_Modal_Access','2020-02-09 19:11:00',NULL,1,1,'2020-02-09 19:11:00',1,'2020-02-09 19:11:00',0,'PTAB_Login_Modal_Access',NULL,NULL),(29,'myCreditsPl','My credits for Paralegal','2020-02-09 19:10:58',NULL,24,5890,'2020-02-09 19:10:58',5890,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(30,'myCreditsPA','My credits for PA','2020-02-09 19:10:58',NULL,25,5890,'2020-02-09 19:10:58',5890,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(31,'myCreditsJudge','My credits for Judge','2020-02-09 19:10:58',NULL,26,5890,'2020-02-09 19:10:58',5890,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(32,'chat','Chat','2020-02-09 19:10:58',NULL,32,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(39,'audioChannel','Audio channel','2020-02-09 19:10:58',NULL,33,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL),(40,'video','Video','2020-02-09 19:10:58',NULL,34,1,'2020-02-09 19:10:58',1,'2020-02-09 19:10:58',0,'APPLICATION_DEFAULT',NULL,NULL);
/*!40000 ALTER TABLE `stnd_resource_object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stnd_user_role`
--

DROP TABLE IF EXISTS `stnd_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stnd_user_role` (
  `USER_ROLE_ID` int NOT NULL,
  `USER_ROLE_NM` varchar(200) DEFAULT NULL,
  `DESCRIPTION_TX` varchar(2000) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `CREATE_USER_ID` int DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT NULL,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LOCK_CONTROL_NO` int DEFAULT NULL,
  `DISPLAY_ORDER_SEQUENCE_NO` int DEFAULT '0',
  `FK_USER_ROLE_CATEGORY_ID` int DEFAULT '1',
  `DISPLAY_NM` varchar(200) DEFAULT NULL,
  `USER_ROLE_CASE_TYPE` varchar(200) DEFAULT NULL,
  `PRODN_GOAL_DCSNL_UNIT_QT` int DEFAULT NULL,
  PRIMARY KEY (`USER_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stnd_user_role`
--

LOCK TABLES `stnd_user_role` WRITE;
/*!40000 ALTER TABLE `stnd_user_role` DISABLE KEYS */;
INSERT INTO `stnd_user_role` VALUES (1,'All Paralegals/LIEs','All Paralegals/LIEs','2020-02-10 23:53:22',NULL,5772,'2020-02-10 23:53:22',5772,'2020-02-10 23:53:22',0,1,1,'Paralegal','APPEAL',30),(5,'All Supervisors','All Supervisors','2020-02-10 23:53:22',NULL,5772,'2020-02-10 23:53:22',5772,'2020-02-10 23:53:22',0,1,1,'SLIE','APPEAL',40),(6,'ATTY','All Patent Attorneys','2020-02-10 23:53:23',NULL,5772,'2020-02-10 23:53:23',5772,'2020-02-10 23:53:23',0,1,1,'Patent Attorney','APPEAL',50),(7,'All Business Administrators','All Business Administrators','2020-02-10 23:53:23',NULL,5772,'2020-02-10 23:53:23',5772,'2020-02-10 23:53:23',0,1,1,'Business Admin','APPEAL',60),(8,'PTABE2E_Judge','PTABE2E_Judge','2020-02-10 23:53:23',NULL,5772,'2020-02-10 23:53:23',5772,'2020-02-10 23:53:23',0,1,1,'Patent Judge','APPEAL',84),(10,'Importmanager_Privilege','Import manager workqueue privileges','2020-02-10 23:53:23',NULL,5772,'2020-02-10 23:53:23',5772,'2020-02-10 23:53:23',0,1,1,'Import Manager','APPEAL',10);
/*!40000 ALTER TABLE `stnd_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stnd_widget`
--

DROP TABLE IF EXISTS `stnd_widget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stnd_widget` (
  `WIDGET_ID` int NOT NULL,
  `WIDGET_NM` varchar(200) DEFAULT NULL,
  `FK_WIDGET_SUBCATEGORY_ID` int DEFAULT NULL,
  `DESCRIPTION_TX` varchar(320) DEFAULT NULL,
  `NOTE_TX` varchar(320) DEFAULT NULL,
  `RECENT_IN` char(1) DEFAULT NULL,
  `DEFAULT_IN` char(1) DEFAULT 'N',
  `DEFAULT_POSITION_NO` int DEFAULT NULL,
  `LINK_URL_TX` varchar(320) DEFAULT NULL,
  `TYPE_TX` varchar(30) DEFAULT NULL,
  `CONFIG_TX` varchar(4000) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `CREATE_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime(6) DEFAULT NULL,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  `DISPLAY_ORDER_SEQUENCE_NO` int DEFAULT '0',
  `COLUMN_LIST_DOC` longtext,
  PRIMARY KEY (`WIDGET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stnd_widget`
--

LOCK TABLES `stnd_widget` WRITE;
/*!40000 ALTER TABLE `stnd_widget` DISABLE KEYS */;
INSERT INTO `stnd_widget` VALUES (1,'announcements',99,'Read the latest news about your uspto.gov account and get updates on new features as we release them.','Announcements','N','N',NULL,NULL,'genericAnmnts','{\"path\":\"announcements.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"false\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,1,NULL),(2,'reportCenter',99,'View all reports','Report center','N','N',NULL,'/reports/employee/loginId','reportCenter','{\"path\":\"reportCenter.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,6,NULL),(3,'systemStatus',99,'View current and scheduled system outages.','System status','N','N',NULL,NULL,'genericSysstat','{\"path\":\"system-status.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,7,NULL),(4,'viewCaseDockets',99,'View Case Docket Widget','View case docket','N','N',NULL,'/mixed-case-dockets/details/widgetId','specificCaseDocket','{\"path\": \"view-case-docket.html\", \"showDeleteButton\":\"false\", \"showFullscreenButton\":\"true\", \"showCollapseButton\":\"true\", \"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,8,NULL),(5,'exportCaseDockets',99,'Export Case Dockets Widget','Export case dockets','N','N',NULL,NULL,'exportSpecificCaseDockets','{\"path\": \"export-case-dockets.html\", \"showDeleteButton\":\"false\", \"showFullscreenButton\":\"true\", \"showCollapseButton\":\"true\", \"showReloadButton\":\"true\"}','2020-01-01 00:00:01','2020-01-01 00:00:01','2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,4,NULL),(7,'assignments',99,'View Tasks Widget','Assignments','N','N',NULL,'my_assignments:/assignment-views/widgetId,team_assignments:/assignment-views/my-team/widgetId,group_assignments:/assignment-views/my-group/widgetId','viewTasksDocket','{\"path\": \"view-tasks.html\", \"showDeleteButton\":\"false\", \"showFullscreenButton\":\"true\", \"showCollapseButton\":\"true\", \"showReloadButton\":\"true\", \"viewAssignmentsPerPage\":\"10\", \"assignmentsSizeList\":\"10,50,100\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,3,NULL),(9,'myFavorites',99,'View all of my favorites','My favorites','N','N',NULL,'/user-favorites/loginId','myFavorites','{\"path\":\"my-favorites.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,4,NULL),(21,'assignmentBasedDocket',99,'Assignment Based Docket','Assignment docket','N','N',NULL,'my_assignments:/mixed-case-dockets/widgetId,team_assignments:/mixed-case-dockets/my-team/widgetId,group_assignments:/mixed-case-dockets/my-group/widgetId','assignmentBasedDocket','{\"path\":\"reportCenter.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,2,NULL),(23,'myCredits',99,'View my credits','Crediting','N','N',NULL,'/credits-views/advancedsearch?creditsWidget=widgetId&','myCredits','{\"path\":\"myCredits.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,4,NULL),(24,'masterDocket',99,'View master docket','Pending paneling (Master docket)','N','N',NULL,'/master-docket/details/widgetId','masterDocket','{\"path\":\"masterDocket.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,5,NULL),(25,'workQueue',99,'Manage work queues','Work queues','N','N',NULL,'my_assignments:/assignment-views/work-queue/widgetId','workQueue','{\"path\": \"view-tasks.html\", \"showDeleteButton\":\"false\", \"showFullscreenButton\":\"true\", \"showCollapseButton\":\"true\", \"showReloadButton\":\"true\", \"viewAssignmentsPerPage\":\"10\", \"assignmentsSizeList\":\"10,50,100\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,9,NULL),(32,'chat',2,'Chat','Chat','N','N',NULL,NULL,'chat','{\\\"path\\\":\\\"chat.html\\\",\\\"showDeleteButton\\\":\\\"false\\\",\\\"showFullscreenButton\\\":\\\"true\\\",\\\"showCollapseButton\\\":\\\"true\\\",\\\"showReloadButton\\\":\\\"true\\\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,10,NULL),(33,'cnn',3,'CNN','CNN','N','N',NULL,NULL,'cnn','{\\\"path\\\":\\\"my-favorites.html\\\",\\\"showDeleteButton\\\":\\\"false\\\",\\\"showFullscreenButton\\\":\\\"true\\\",\\\"showCollapseButton\\\":\\\"true\\\",\\\"showReloadButton\\\":\\\"true\\\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,11,NULL),(34,'dataAnalytics',99,'Data Analytics','Data Analytics','N','N',NULL,NULL,'dataAnalytics','{\"path\":\"my-favorites.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,12,NULL),(35,'search',99,'Search','Search','N','N',NULL,NULL,'search','{\"path\":\"search.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"false\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,13,NULL),(36,'web',4,'VEAS','VEAS','N','N',NULL,'https://www.bbc.com/','web','{\"path\":\"web.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,14,NULL),(37,'map',5,'Map','Map','N','N',NULL,NULL,'map','{\"path\":\"map.html\",\"showDeleteButton\":\"false\",\"showFullscreenButton\":\"true\",\"showCollapseButton\":\"true\",\"showReloadButton\":\"true\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,15,NULL),(38,'bbc',3,'BBC','BBC','N','N',NULL,NULL,'bbc','{\\\"path\\\":\\\"my-favorites.html\\\",\\\"showDeleteButton\\\":\\\"false\\\",\\\"showFullscreenButton\\\":\\\"true\\\",\\\"showCollapseButton\\\":\\\"true\\\",\\\"showReloadButton\\\":\\\"true\\\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,11,NULL),(39,'audioChannel',6,'Audio channel','Audio Channel','N','N',NULL,NULL,'audioChannel','{\\\"path\\\":\\\"audio.html\\\",\\\"showDeleteButton\\\":\\\"false\\\",\\\"showFullscreenButton\\\":\\\"true\\\",\\\"showCollapseButton\\\":\\\"true\\\",\\\"showReloadButton\\\":\\\"true\\\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,11,NULL),(40,'video',3,'Video','Video','N','N',NULL,NULL,'video','{\\\"path\\\":\\\"video.html\\\",\\\"showDeleteButton\\\":\\\"false\\\",\\\"showFullscreenButton\\\":\\\"true\\\",\\\"showCollapseButton\\\":\\\"true\\\",\\\"showReloadButton\\\":\\\"true\\\"}','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',12345,'2020-01-01 00:00:01.000000',12345,0,17,NULL);
/*!40000 ALTER TABLE `stnd_widget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stnd_widget_category`
--

DROP TABLE IF EXISTS `stnd_widget_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stnd_widget_category` (
  `WIDGET_CATEGORY_CD` varchar(30) NOT NULL,
  `DESCRIPTION_TX` varchar(320) DEFAULT NULL,
  `DISPLAY_NM` varchar(200) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` datetime DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT NULL,
  `CREATE_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  PRIMARY KEY (`WIDGET_CATEGORY_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stnd_widget_category`
--

LOCK TABLES `stnd_widget_category` WRITE;
/*!40000 ALTER TABLE `stnd_widget_category` DISABLE KEYS */;
INSERT INTO `stnd_widget_category` VALUES ('PTABE2E','PTAB Widgets',NULL,'2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0);
/*!40000 ALTER TABLE `stnd_widget_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stnd_widget_subcategory`
--

DROP TABLE IF EXISTS `stnd_widget_subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stnd_widget_subcategory` (
  `WIDGET_SUBCATEGORY_ID` int NOT NULL,
  `WIDGET_SUBCATEGORY_NM` varchar(50) DEFAULT NULL,
  `FK_WIDGET_CATEGORY_CD` varchar(30) DEFAULT 'UIDemo',
  `DESCRIPTION_TX` varchar(2000) DEFAULT NULL,
  `DISPLAY_ORDER_SEQUENCE_NO` int DEFAULT '0',
  `DISPLAY_NM` varchar(200) DEFAULT NULL,
  `BEGIN_EFFECTIVE_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `END_EFFECTIVE_DT` date DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `CREATE_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  PRIMARY KEY (`WIDGET_SUBCATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stnd_widget_subcategory`
--

LOCK TABLES `stnd_widget_subcategory` WRITE;
/*!40000 ALTER TABLE `stnd_widget_subcategory` DISABLE KEYS */;
INSERT INTO `stnd_widget_subcategory` VALUES (1,'General','PTABE2E','General',1,'General','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0),(2,'Chat','PTABE2E','Chat',1,'Chat','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0),(3,'Video','PTABE2E','Video',1,'Video','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0),(4,'Voice','PTABE2E','Voice',1,'Voice','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0),(5,'Map','PTABE2E','Map',1,'Map','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0),(6,'Audio channel','PTABE2E','Audio channel',1,'Map','2020-01-01 00:00:01',NULL,'2020-01-01 00:00:01',90,'2020-01-01 00:00:01',90,0);
/*!40000 ALTER TABLE `stnd_widget_subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_workspace`
--

DROP TABLE IF EXISTS `user_workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_workspace` (
  `USER_WORKSPACE_ID` int NOT NULL AUTO_INCREMENT,
  `FK_APPLICATION_USER_ID` int DEFAULT NULL,
  `USER_WORKSPACE_NM` varchar(50) DEFAULT NULL,
  `VIEW_LAYOUT_NM` varchar(50) DEFAULT 'THREECOLUMN',
  `DEFAULT_IN` char(1) DEFAULT 'N',
  `ORDER_SEQUENCE_NO` int DEFAULT '1',
  `DESCRIPTION_TX` varchar(320) DEFAULT NULL,
  `CONFIG_TX` varchar(4000) DEFAULT NULL,
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `CREATE_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  PRIMARY KEY (`USER_WORKSPACE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_workspace`
--

LOCK TABLES `user_workspace` WRITE;
/*!40000 ALTER TABLE `user_workspace` DISABLE KEYS */;
INSERT INTO `user_workspace` VALUES (2,123,'Main','4-4-4','Y',0,NULL,NULL,'2020-02-11 08:06:17',123,'2020-02-13 19:05:37',123,22),(3,123,'Full view','12','N',1,NULL,NULL,'2020-02-11 10:57:54',123,'2020-02-12 10:35:15',123,21),(7,555,'Main','4-4-4','Y',0,NULL,NULL,'2020-02-13 18:13:53',555,'2020-02-13 18:13:53',555,1),(8,555,'Full view','12','N',1,NULL,NULL,'2020-02-13 18:55:00',555,'2020-02-13 18:55:00',555,1),(9,777,'Main','4-4-4','Y',0,NULL,NULL,'2020-02-13 19:03:13',777,'2020-02-13 19:03:13',777,1),(10,777,'Full view','12','N',1,NULL,NULL,'2020-02-13 19:04:07',777,'2020-02-13 19:04:07',777,1);
/*!40000 ALTER TABLE `user_workspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_workspace_widget`
--

DROP TABLE IF EXISTS `user_workspace_widget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_workspace_widget` (
  `USER_WORKSPACE_WIDGET_ID` int NOT NULL,
  `FK_USER_WORKSPACE_ID` int DEFAULT NULL,
  `FK_WIDGET_ID` int DEFAULT NULL,
  `WIDGET_CUSTOM_NM` varchar(200) DEFAULT NULL,
  `WIDGET_POSITION_TX` varchar(50) DEFAULT NULL,
  `WIDGET_HEIGHT_PIXEL_QT` int DEFAULT NULL,
  `CONFIG_TX` varchar(4000) DEFAULT NULL,
  `WIDGET_COLOR_NM` varchar(50) DEFAULT '#FFFFFF',
  `CREATE_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `CREATE_USER_ID` int DEFAULT NULL,
  `LAST_MOD_TS` datetime DEFAULT CURRENT_TIMESTAMP,
  `LAST_MOD_USER_ID` int DEFAULT NULL,
  `LOCK_CONTROL_NO` int DEFAULT '0',
  `QUERY_TX` varchar(2000) DEFAULT NULL,
  `SELECTED_COLUMN_LIST_DOC` longtext,
  PRIMARY KEY (`USER_WORKSPACE_WIDGET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_workspace_widget`
--

LOCK TABLES `user_workspace_widget` WRITE;
/*!40000 ALTER TABLE `user_workspace_widget` DISABLE KEYS */;
INSERT INTO `user_workspace_widget` VALUES (11,8,36,'VEAS','0||0||0',4,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 18:55:11',555,'2020-02-13 18:57:18',555,2,'https://www.bbc.com/',NULL),(12,9,32,'Chat','0||0||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:03:30',777,'2020-02-13 19:03:30',777,1,NULL,NULL),(13,9,33,'Video','0||1||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:03:30',777,'2020-02-13 19:03:43',777,2,NULL,NULL),(14,9,36,'VEAS','0||2||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:03:30',777,'2020-02-13 19:03:47',777,3,'https://www.bbc.com/',NULL),(15,10,36,'VEAS','0||0||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:04:20',777,'2020-02-13 19:04:20',777,1,'https://www.bbc.com/',NULL),(16,2,32,'Chat','0||0||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:05:55',123,'2020-02-13 19:05:55',123,1,NULL,NULL),(17,2,33,'Video','0||1||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:05:55',123,'2020-02-13 19:06:10',123,2,NULL,NULL),(18,2,36,'VEAS','0||2||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:05:55',123,'2020-02-13 19:06:04',123,2,'https://www.bbc.com/',NULL),(19,3,36,'VEAS','0||0||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-13 19:06:53',123,'2020-02-13 19:06:53',123,1,'https://www.bbc.com/',NULL),(24,2,39,'audio channel','0||0||1',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-26 02:12:46',123,'2020-02-26 02:12:46',123,1,NULL,NULL),(25,2,39,'audio channel - 1','0||0||2',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-26 15:27:59',123,'2020-02-26 15:27:59',123,1,NULL,NULL),(26,7,39,'Audio Channel','0||0||0',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-27 10:13:17',555,'2020-02-27 10:13:17',555,1,NULL,NULL),(27,7,40,'Video','0||0||1',2,'{\"collapsedIndicator\":false}',NULL,'2020-02-27 10:13:17',555,'2020-02-27 10:13:17',555,1,NULL,NULL);
/*!40000 ALTER TABLE `user_workspace_widget` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-27 10:18:29
