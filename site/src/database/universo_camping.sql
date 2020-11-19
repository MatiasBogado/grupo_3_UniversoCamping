CREATE DATABASE  IF NOT EXISTS `universo_camping` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `universo_camping`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: universo_camping
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT 1,
  `id_user` int(11) unsigned NOT NULL,
  `products_id` int(11) unsigned NOT NULL,
  `remito` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_users1_idx` (`id_user`),
  KEY `fk_cart_products1_idx` (`products_id`),
  CONSTRAINT `fk_cart_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (108,1,35,44,NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `imagen` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'carpa',''),(2,'pesca',''),(3,'accesorios',''),(4,'indumentaria',''),(5,'calzado',''),(6,'rifles','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` int(11) NOT NULL,
  `descuento` int(11) NOT NULL DEFAULT 0,
  `descripcion` varchar(300) NOT NULL,
  `imagenes` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_category` int(11) unsigned DEFAULT NULL,
  `destacado` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria_idx` (`id_category`),
  CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Carpa Hummer Diner Pro',2222,32,'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium','imageEdit1605770894924.jpg',12,'2020-11-17 13:07:51','2020-11-19 07:36:04',1,1),(44,'Caña Okuma Morena Power 2.10 1 Tramos 15-45 Libras',213,1,'mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper','imageEdit1605769520838.jpg',1,'2020-11-17 13:09:52','2020-11-19 07:05:20',2,1),(45,'Botas Hombre Teva Arrowood Impermeables',2222,1,'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla2','imageEdit1605768492039.jpg',2,'2020-11-17 13:10:21','2020-11-19 07:36:22',5,0),(46,'\"Cortaplumas Victorinox Fisherman Roja 17 Usos',521,21,'odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum','imageEdit1605621727741.jpg',22,'2020-11-17 13:22:11','2020-11-19 07:36:39',3,0),(47,'Carpa Hi-Tec 1 persona Milos',3523532,2,'ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla','imageAdd1605621482529.jpg',5,'2020-11-17 13:58:02','2020-11-17 13:58:02',1,NULL),(48,'Reel Frontal Spinit Triumph 50',6576,2,'nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id','imageEdit1605769538613.jpg',6,'2020-11-17 14:01:17','2020-11-19 07:05:38',2,1),(49,'Campera Columbia Bugaboo II desmontable 3 en 1',4563,2,'neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum','imageAdd1605621776807.jpg',56,'2020-11-17 14:02:56','2020-11-17 14:02:56',4,NULL),(50,'Rifle Shark Cerrojo 5 mm Gas Comprimido Garrafa  Mira 4x32 Anillas',18700,3,'in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in','imageAdd1605761272712.jpg',10,'2020-11-19 04:47:52','2020-11-19 04:47:52',6,NULL),(51,'Rifle Aire Comprimido Resortero Calibre 5 mm Economico',7503,0,'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed','imageAdd1605761391736.jpg',3,'2020-11-19 04:49:51','2020-11-19 04:49:51',6,NULL),(52,'Señuelos Ng Mojarra Trolling',1597,2,'mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper','imageAdd1605761530458.jpg',15,'2020-11-19 04:52:10','2020-11-19 04:52:10',2,NULL),(53,'Anafe Brogas',2800,0,'sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse','imageAdd1605761646942.jpg',7,'2020-11-19 04:54:06','2020-11-19 04:54:06',3,NULL),(54,'Chaleco de Pesca Waterdog',4000,13,'sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus','imageAdd1605761709102.jpg',3,'2020-11-19 04:55:09','2020-11-19 04:55:09',4,NULL),(55,'Bota Pre Ski Alpine Skate Mujer',4300,20,'ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi','imageAdd1605762300585.jpg',5,'2020-11-19 05:05:00','2020-11-19 05:05:00',5,NULL),(56,'Botas Hombre Teva Arrowood Impermeables',4567,3,'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla','imageAdd1605763871738.jpg',0,'2020-11-19 05:31:11','2020-11-19 05:31:11',5,NULL),(57,'Bolso Térmico Waterdog Sial',4523,0,'in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec','imageAdd1605768347915.jpg',7,'2020-11-19 06:45:47','2020-11-19 06:45:47',3,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (35,'ezequiel','zapata','zapata.ed1989@gmail.com','$2b$10$WCE/R46IrieEFGqa/7413erk2cXw8JrWXwn4fvslcdFxa8jpgj9h2',NULL,NULL,'default.png',NULL,NULL,NULL,'admin','2020-11-17 12:51:41','2020-11-17 12:51:41'),(36,'fede','fede','fede@fede.com','$2b$10$t1IPRpBgchQz0cheX1QQn.l10J8HCkVphLwnvsQEHGHqnGeU/ZKzu',NULL,NULL,'default.png',NULL,NULL,NULL,'user','2020-11-17 14:17:19','2020-11-17 14:17:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_users` int(11) unsigned NOT NULL,
  `id_products` int(11) unsigned NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_has_products_products1_idx` (`id_products`),
  KEY `fk_users_has_products_users1_idx` (`id_users`),
  CONSTRAINT `fk_users_has_products_products1` FOREIGN KEY (`id_products`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_users1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (29,35,49,1,'2020-11-17 14:16:41','2020-11-17 14:16:41'),(30,36,45,55,'2020-11-17 14:18:43','2020-11-17 14:18:43');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'universo_camping'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-19  4:48:13
