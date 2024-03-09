CREATE DATABASE  IF NOT EXISTS `magnusstella` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `magnusstella`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: magnusstella
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Direccion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (7289,'Lucía Hernández','luciahrdz4567@outlook.com','Calle Hidalgo 678, 34567, Doctores'),(25498,'Sofía Rodríguez','sofirodri34@outlook.com','Avenida Insurgentes Sur 90, 23456, Polanco'),(37274,'Elena García','elenagarc@outlook.com','Calle Reforma 56, 54321, Roma'),(60764,'Andrés Martínez','andymarti@outlook.com','Boulevard Benito Juárez 78, 67890, Condesa'),(76363,'Diego Pérez','diegope324@outlook.com','Calle 20 de Septiembre 45, 87654, Del Valle'),(90234,'Ana Zúñiga Chávez','anazzzz@gmail.com,','Matancillas 78, 63249, Zibatá'),(91171,'Luz Andrea Vázquez Alderete','Lavameikup@hotmail.com','Los Candelabros, 78324, Candiles'),(92341,'Diego Isaac Fuentes Juvera','diegolin@outlook.com','Río Grande #41, 82390, San Javier'),(92971,'Lucero Vázquez Martinez','Luvama@hotmail.com','Las serpientes 74, 79721, Popocatepetl'),(93247,'Angélica Ríos Cuentas','angie83@outlook.com','Río chico #97, 82390, San Javier'),(123789,'Carlos López','carlospez@gmail.com','Boulevard Benito Juárez 79, 67890, Condesa'),(187654,'Ana García','anagara@gmail.com','Calle Reforma 56, 54321, Roma'),(321456,'Pedro Martínez','pedrote@gmail.com','Calle 20 de Noviembre 35, 87654, Del Valle'),(456123,'María Rodríguez','mariarodri@gmail.com','Avenida Insurgentes Sur 890, 23456, Polanco'),(547623,'Ricardo Ortiz Días','RicarditoOrtiz@hotmail.com','pradera verde #54, 76564, El refugio'),(562323,'Juan Pablo Chávez Leal','a01705408@tec.mx','Bugambilias #3, 76021,Centro'),(654321,'Juan Pérez','juanper@gmail.com','Avenida 5 de Mayo 24, 12345, Juárez'),(789321,'Laura Hernández','lauraherdez@gmail.com','Calle Hidalgo 678, 3467, Doctores'),(974858,'Diego Ricardo Alfaro Pinto','diegorap2003@outlook.com','Lirios #3, 63819, La Cañada'),(987412,'Pablo Hazael Hurtado Mireles','pablinqueclavounclavin@outlook.com','Bosques del lago #86, 97345, Juriquilla'),(987654,'Miguel Sánchez','miguelsnchez@outlook.com','Avenida 5 de Mayo 24, 12345, Juárez');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuesta` (
  `idMarca` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `idPregunta` int NOT NULL,
  KEY `idMarca_idx` (`idMarca`),
  KEY `Fk_Pregunta_Encuesta_idx` (`idPregunta`),
  CONSTRAINT `Fk_Marca_Encuesta` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`),
  CONSTRAINT `Fk_Pregunta_Encuesta` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`idPregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` VALUES ('LU1',1),('AR1',2),('NO1',3),('LU1',4),('MA1',5),('LU1',6),('Lu1',7),('NO1',8),('MA1',9),('AR1',10);
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `idMarca` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Nombre` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Logo` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Paleta` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES ('AR1','ARTI','https://logopond.com/logos/1dc04df6dc37355f5ce2d39bc984aa73.png','{(255,255,255),(000,000,000),(124,214,163)}'),('LU1','LUUNAA','https://zeb-main-bucket.b-cdn.net/catalog-website/luuna.mx/group-186ad7c.svg?width=1600','{(123,43,234),(123,42,56),(233,254,233)}'),('MA1','MAPPA','https://zeb-main-bucket.b-cdn.net/catalog-website/mappa.mx/mappa-logotipo_mesa-de-trabajo-1-4-.png?width=1600','{(123,43,234),(171,548,54),(002,212,243)}'),('NO1','NOOZ','https://zeb-main-bucket.b-cdn.net/catalog-website/nooz.mx/nooz-header-logo.png?width=1600','{(120,73,24),(13,142,216),(23,54,23)}');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idPregunta` int NOT NULL,
  `Descripcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Tipo` int NOT NULL,
  `Opcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idPregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'¿Con cuántas personas duermes?',1,'{1, 2, 3, ninguno}'),(2,'En general, ¿Cuál es el peor aspecto del producto?',2,''),(3,'Seleccione todos los que apliquen: ',3,'{Duermo con mi mascota, Consumo alimentos en mi cama, Suelo trabajar en mi cama, Mi cama es mi \"templo\"}'),(4,'¿Cuál es su grado de satisfacción con el producto?',4,'{1,2,3,4,5}'),(5,'Reseña',2,''),(6,'¿Qué edad tienes?',1,'{15 - 24, 25 - 34, 35 - 44, 45 - 55+}'),(7,'¿En promedio, cuántas horas duermes cada noche?',1,'{Menos de 4, Entre 4 y 6 horas, Entre 6 y 7 horas, Entre 7 y 8 horas, Más de 8 horas}'),(8,'¿Cómo se compara su nuevo colchón al anterior?',1,'{Es peor, Son iguales, Es mejor, Es mucho mejor}'),(9,'¿Por qué elegiste Mappa vs otras marcas?',3,'{Precio, Garantía y calidad del producto, Cualidades(tecnología, diseño, colores), Recomendaciones, Otro}'),(10,'¿Qué mejoras le haría al producto?',2,'');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `FK_idMarca_Producto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Imagen` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Descripcion` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `idMarca_idx` (`FK_idMarca_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES ('AN1133V','NO1','2 Pack Almohada Essential Regular','','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensación de las plumas naturales. ¡Créenos, sostendrán tu cabeza como a su majestad!'),('AN1133VCH','NO1','2 Pack Almohada Essential Regular','','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensación de las plumas naturales. ¡Créenos, sostendrán tu cabeza como a su majestad!'),('AR9043','AR1','20L Pintura Roja','','La mejor pintura para el mejor pintor'),('AR9044','AR1','20L Pintura Azul','','La mejor pintura para el mejor pintor'),('LB2231','LU1','Cama Anzures Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-anzures-indi/base-anzures8b4bc3.jpg','Cama individual de madera sustentable de abedul y nogal negro, con cabecera capitonada gris grafito. Un complemento de lujo y comodidad para tu descanso. ¡Tenemos 4 tamaños disponibles!'),('LB3231','LU1','Cama Condesa Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-condesa-indi/cama-condesa.jpg','Resistencia, elegancia y sustentabilidad fueron las tres ideas que teníamos en la cabeza al crear esta cama individual de madera certificada con cabecera capitonada gris claro.'),('LU1001B2','LU1','Colchón Luuna Basics 2 Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃ³n-basic-2-indi/basics-2.png','Luuna Basics 2 Individual es ideal para tener un descanso profundo. Sus dos capas de espumas certificadas garantizan una combinación de soporte y frescura que perduran con el paso de los años. ¡Compruébalo tú mismo!'),('LU1002B2','LU1','Colchón Luuna Basics 2 Matrimonial','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃ³n-basic-2-matri/basics-2.png','Luuna Basics 2 Matrimonial es ideal para tener un descanso profundo. Sus dos capas de espumas certificadas garantizan una combinación de soporte y frescura que perduran con el paso de los años. ¡Compruébalo tú mismo!'),('MA1201','MA1','Transportadora Para Mascotas Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/pet-carrier-mappa-char/pet-carrier.webp','La transportadora Mappa es ideal para viajar con tu mejor amigo. Su diseño está creado para brindar comodidad tanto a tu mascota como a ti'),('MA1301','MA1','Portalaptop Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/porta-laptop-mappa-char/portalaptop.webp','El portalaptop Mappa es perfecto para transportar tu computadora o tableta.'),('MA1401','MA1','Organizadores Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/organizadores-mappa-char/organizador.webp','Los organizadores Mappa son el accesorio ideal para empacar tus pertenencias de la manera más eficiente. Comprime y organiza tu ropa para que puedas guardar mucho más en tu maleta.'),('MA4003','MA1','Maleta Mappa Grande Color Arena','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/master-maleta-mappa-hard-shell-lote-san-gra/sand-s-01.jpeg','El tamaño que necesitas para lanzarte a la aventura más duradera. Su gran capacidad hará que puedas viajar con todo lo necesario.'),('MA4012','MA1','Set Maleta Cabina + Grande Arena','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-grande-san-lote/1.-sets-monocromaticos20.png','Este set de dos piezas es ideal para que encuentres el equilibrio entre lo que necesitas tener a la mano y la capacidad óptima para lo que documentarás.'),('MX-MAP-MAL-KIT2-SAN','MA1','SET MALETA CABINA + GRANDE ARENA','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-grande-san/1.-sets-monocromaticos20.png','Este set de dos piezas es ideal para que encuentres el equilibrio entre lo que necesitas tener a la mano y la capacidad óptima para lo que documentarás.'),('NB7224','NO1','Cama Natural Tejida King','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-natural-tejida-king/tejida-fondo-blanco.jpg','Creamos esta cama para los amantes de lo natural y artesanal. Está hecha de madera certificada y tejido artesanal, lo que la hace resistente y amigable con el medio ambiente.'),('NP6321','NO1','Protector de Colchón Essential Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-indi/protector_essential.png','El Protector Essential Individual te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche.'),('NP6323','NO1','Protector de Colchón Essential Queen','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-queen/protector_essentialc05dcc.png','El Protector Essential Queen te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche'),('NP6324','NO1','Protector de Colchón Essential King','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-king/protector_essentialc05dcc.png','El Protector Essential King te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche.'),('SH7003','LU1','Juego de Sábanas Satinadas Queen Size Blanco Rayas','','No existe mejor sensación que el rose del satin en la piel. Y tampoco existe mejor calidad en telas que las que son elaboradas con textiles certificados. ¡Compruébalo con estas sábanas!'),('SI1004','LU1','Colchón Luuna Signature King','','8 opciones de confort. Un colchón. Conoce la máxima expresión de tecnologí­a y total personalización con Luuna.');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `Fk_Respuestas_Review` int NOT NULL,
  `Fk_Respuestas_Pregunta` int NOT NULL,
  `Respuestas` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  KEY `Fk_Review_Respuestas_idx` (`Fk_Respuestas_Review`),
  KEY `Fk_Pregunta_Respuestas_idx` (`Fk_Respuestas_Pregunta`),
  CONSTRAINT `Fk_Pregunta_Respuestas` FOREIGN KEY (`Fk_Respuestas_Pregunta`) REFERENCES `pregunta` (`idPregunta`),
  CONSTRAINT `Fk_Review_Respuestas` FOREIGN KEY (`Fk_Respuestas_Review`) REFERENCES `review` (`idReview`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (1,1,'1'),(2,2,'Ninguno, muy buen producto'),(3,3,'Duermo con mi mascota'),(4,4,'4'),(5,5,''),(6,6,'15-24'),(7,7,'Menos de 4'),(8,8,'Son iguales'),(9,9,'Precio, Garantía y calidad del producto'),(10,10,'Quiero sentir como si durmiera en las nubes');
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `idReview` int NOT NULL,
  `Fk_Review_Venta` int NOT NULL,
  `Descripcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Titulo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Fecha` datetime NOT NULL,
  `Puntaje` int NOT NULL,
  PRIMARY KEY (`idReview`),
  KEY `Fk_Venta_Review_idx` (`Fk_Review_Venta`),
  CONSTRAINT `Fk_Venta_Review` FOREIGN KEY (`Fk_Review_Venta`) REFERENCES `venta` (`idVenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'Excelente producto. Lo uso todos los días y no puedo estar más satisfecho con su rendimiento y durabilidad','Se me cayó del 5to piso','2024-01-11 00:00:00',5),(2,2,'¡Increíble! No puedo imaginar mi vida sin este producto. Realmente hace todo más fácil y eficiente','Muy buen producto','2024-01-21 00:00:00',4),(3,3,'fotos de perritos','ay que piké, komo me salgo de aki','2024-01-16 00:00:00',2),(4,4,'Me encanta este producto. Es versátil, fácil de usar y muy útil en mi día a día','Útil','2024-01-23 00:00:00',4),(5,5,'Lo compré hace unas semanas y ya no puedo vivir sin él. Definitivamente vale la pena cada centavo, es lo que me gustaría decir, pero no','Fraude D:<','2024-01-21 00:00:00',1),(6,6,'He probado muchos productos similares, pero este se destaca por su calidad y funcionalidad. Lo recomiendo ampliamente','Lo mejor que existe!!!','2024-01-14 00:00:00',4),(7,7,'Qué gran compra! Este producto ha mejorado significativamente mi rutina diaria. Lo recomendaría a cualquiera','Producto recibido bien','2024-02-14 00:00:00',5),(8,8,'Gran producto, alta calidad y durabilidad, materiales pesados y lujosos, definitivamente arte','Es arte','2024-02-18 00:00:00',5),(9,9,'Funciona como se describe. Es robusto y confiable. No puedo pedir más de este producto','Satisfecho','2024-02-12 00:00:00',4),(10,10,'Este producto ha hecho una gran diferencia en mi vida. Es práctico, eficiente y fácil de usar','diego','2024-02-27 00:00:00',4),(11,11,'Lo compré como regalo y resultó ser un gran acierto. La persona que lo recibió está encantada con el','Gran regalo','2024-02-29 00:00:00',5),(12,12,'\"He probado muchos productos similares, pero ninguno se compara a este. Su calidad es insuperable','Buenisismos materiales','2023-12-11 00:00:00',4),(13,13,'Es justo lo que necesitaba. Este producto ha simplificado muchas tareas para mí. ¡Totalmente recomendado! aunq ya la perdí D:','Buena compra','2023-12-23 00:00:00',4),(14,14,'Un producto imprescindible en mi hogar. Su diseño y durabilidad lo convierten en una excelente elección.','Amo aqui','2023-12-19 00:00:00',4),(15,15,'fotos perritos buscar','hay otra ves no se ke le pike','2023-12-27 00:00:00',1),(16,16,'Estoy sorprendido por lo bien que funciona este producto. Sin duda alguna, es una compra que no me arrepiento','Gran usabilidad','2023-12-31 00:00:00',4),(17,17,'Sí cumplen con lo que piden pero esperaba más','Bueno pero....','2023-11-16 00:00:00',3),(18,18,'Me impresiona la calidad y la atención al detalle de este producto. Sin duda, una excelente adquisición','MUUUY buen producto','2023-11-01 00:00:00',4),(19,19,'Es increíble cómo un producto tan simple puede hacer tanto. Definitivamente recomendaría este producto a cualquiera','Increible lo útil y bonito q es','2023-11-18 00:00:00',5),(20,20,'Este producto superó mis expectativas. Es de alta calidad y cumple con su propósito. Lo recomiendo sin dudarlo ','La mayor calidad que existe','2024-01-12 00:00:00',5);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IDRol` int NOT NULL,
  `Nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Permisos` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (0,'Ajeno','{0,0,0,0,0}'),(1,'Admin','{1,1,1,1,1}'),(2,'Analítica','{0,1,0,1,0}'),(3,'CRM','{0,1,1,1,1}'),(4,'Moderador','{0,0,1,1,0}'),(5,'Empleado','{0,1,1,1,0}'),(6,'Gerente','{0,0,1,0,1}'),(7,'Supervisor','{0,0,1,1,1}'),(8,'Editor','{0,1,0,0,0}'),(9,'Colaborador','{0,0,0,1,0}'),(10,'CEO','{1,1,1,0,1}');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IDRol` int NOT NULL,
  `Nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Constraseña` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `IDRol_idx` (`IDRol`),
  CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('U013345',5,'Alejandro López Martín','contraseña231','alelo@gmail.com'),('U093451',2,'Julia Martinez Norris','contraseñajajajaj','july@gmail.com'),('U113456',6,'Elena García Pérez','contraseña342','elegarpe@gmail.com'),('U123456',7,'Ana García López','contraseña123','anygar@hotmail.com'),('U234567',8,'Juan Pérez Martínez','contraseña456','juanpema@outlook.com'),('U264567',7,'Francisco Pérez Martínez','contraseña4568','franpe@gmail.com'),('U345678',9,'María González Fernández','contraseña789','magodelqueso@gmail.com'),('U348678',8,'Sandra González Fernández','contraseña7891','sandygo@gmail.com'),('U455789',9,'Daniel Rodríguez Díaz','contraseña0124','danro@gmail.com'),('U456789',10,'Pedro Rodríguez Díaz','contraseña012','pedrodriguez@outlook.com'),('U567890',6,'Isabel López Martín','contraseña321','isalop@gmail.com'),('U678901',7,'David García Pérez','contraseña1234','davigar@yahoo.com'),('U688901',5,'Jorge García Pérez','contraseña243','jorgar@gmail.com'),('U729012',6,'Clara Pérez Martínez','contraseña354','clap@gmail.com'),('U767890',4,'Cristina López Martín','contraseña132','crslop@gmail.com'),('U789012',8,'Laura Pérez Martínez','contraseña4567','laupe1@gmail.com'),('U880123',7,'Alberto González Fernández','contraseña465','algo@gmail.com'),('U890123',9,'Miguel González Fernández','contraseña7890','migonz@outlook.com'),('U901234',10,'Marta Rodríguez Díaz','contraseña0123','marodri@gmail.com'),('U901934',8,'Beatriz Rodríguez Díaz','contraseña576','betyro@gmail.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `idVenta` int NOT NULL,
  `Fk_Venta_Cliente` int NOT NULL,
  `Fk_Venta_Producto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `SalesOrderNum` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Fecha` datetime NOT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `Fk_Cliente_Venta_idx` (`Fk_Venta_Cliente`),
  KEY `Fk_Producto_Venta_idx` (`Fk_Venta_Producto`),
  CONSTRAINT `Fk_Cliente_Venta` FOREIGN KEY (`Fk_Venta_Cliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `Fk_Producto_Venta` FOREIGN KEY (`Fk_Venta_Producto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (1,7289,'AN1133V','1','2024-03-07 00:00:00'),(2,7289,'AN1133VCH','1','2023-01-01 00:00:00'),(3,7289,'MA4012','2','2023-02-02 00:00:00'),(4,25498,'SH7003','3','2023-03-03 00:00:00'),(5,25498,'AR9043','4','2023-04-04 00:00:00'),(6,25498,'MA1301','5','2023-05-05 00:00:00'),(7,37274,'MA1301','6','2023-06-06 00:00:00'),(8,37274,'SH7003','7','2023-07-07 00:00:00'),(9,37274,'AR9043','8','2023-08-08 00:00:00'),(10,37274,'NP6323','9','2023-09-09 00:00:00'),(11,321456,'MX-MAP-MAL-KIT2-SAN','10','2023-10-10 00:00:00'),(12,321456,'SH7003','11','2023-11-11 00:00:00'),(13,321456,'LU1002B2','12','2023-12-12 00:00:00'),(14,91171,'AR9043','13','2023-11-12 00:00:00'),(15,91171,'LU1002B2','14','2023-12-14 00:00:00'),(16,91171,'MA1301','15','2023-12-23 00:00:00'),(17,123789,'NP6323','16','2023-01-12 00:00:00'),(18,123789,'AN1133VCH','17','2023-01-15 00:00:00'),(19,123789,'LB3231','18','2023-01-16 00:00:00'),(20,123789,'MX-MAP-MAL-KIT2-SAN','19','2023-01-23 00:00:00'),(21,562323,'MA4003','20','2023-01-25 00:00:00'),(22,562323,'LB3231','22','2023-03-17 00:00:00'),(23,562323,'NP6323','21','2023-03-12 00:00:00'),(24,987412,'SH7003','23','2023-03-23 00:00:00'),(25,987412,'MX-MAP-MAL-KIT2-SAN','24','2023-03-21 00:00:00'),(26,987412,'LU1001B2','25','2023-06-30 00:00:00'),(27,974858,'MA1301','26','2023-03-19 00:00:00'),(28,974858,'MA4003','27','2023-03-17 00:00:00'),(29,974858,'AR9043','28','2023-05-24 00:00:00'),(30,974858,'MA1301','29','2023-05-27 00:00:00'),(31,60764,'LB3231','30','2023-05-02 00:00:00'),(32,60764,'MX-MAP-MAL-KIT2-SAN','31','2023-05-17 00:00:00'),(33,90234,'LB3231','32','2023-07-17 00:00:00'),(34,90234,'MA1301','33','2023-07-11 00:00:00'),(35,90234,'LU1002B2','34','2023-07-21 00:00:00'),(36,321456,'AR9043','35','2023-07-03 00:00:00'),(37,321456,'LU1002B2','36','2023-07-12 00:00:00'),(38,321456,'MA1301','37','2023-08-07 00:00:00'),(39,321456,'MX-MAP-MAL-KIT2-SAN','38','2023-08-21 00:00:00'),(40,92971,'LB3231','39','2023-08-12 00:00:00'),(41,92971,'NP6323','40','2023-09-07 00:00:00'),(42,92971,'AN1133VCH','41','2023-09-12 00:00:00'),(43,92971,'LU1002B2','42','2023-09-27 00:00:00'),(44,37274,'MA1301','43','2023-09-17 00:00:00'),(45,37274,'NP6323','44','2023-09-13 00:00:00'),(46,37274,'MA1301','45','2023-10-05 00:00:00'),(47,37274,'AN1133VCH','46','2023-10-30 00:00:00'),(48,987654,'NP6323','47','2023-10-12 00:00:00'),(49,987654,'AN1133VCH','48','2023-10-09 00:00:00'),(50,987654,'LU1002B2','49','2023-12-24 00:00:00');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-09 12:15:54
