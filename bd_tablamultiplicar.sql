-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.6-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bd_tablamultiplicar
DROP DATABASE IF EXISTS `bd_tablamultiplicar`;
CREATE DATABASE IF NOT EXISTS `bd_tablamultiplicar` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_tablamultiplicar`;

-- Volcando estructura para tabla bd_tablamultiplicar.alumno
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `ultima_tabla_multiplicar` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_tablamultiplicar.alumno: ~1 rows (aproximadamente)
DELETE FROM `alumno`;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` (`id`, `nombre`, `ultima_tabla_multiplicar`) VALUES
	(1, 'Gabriel', 3);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;

-- Volcando estructura para tabla bd_tablamultiplicar.respuestas
DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE IF NOT EXISTS `respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_alumno` int(11) NOT NULL DEFAULT 0,
  `tabla_multiplicar` int(11) NOT NULL,
  `aciertos` int(11) NOT NULL,
  `fallos` int(11) NOT NULL,
  `nota` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_respuestas_alumno` (`id_alumno`),
  CONSTRAINT `FK_respuestas_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_tablamultiplicar.respuestas: ~3 rows (aproximadamente)
DELETE FROM `respuestas`;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` (`id`, `id_alumno`, `tabla_multiplicar`, `aciertos`, `fallos`, `nota`) VALUES
	(96, 1, 1, 9, 1, 9),
	(97, 1, 2, 10, 0, 10),
	(98, 1, 1, 10, 0, 10);
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
