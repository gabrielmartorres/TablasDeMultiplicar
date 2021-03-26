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


-- Volcando estructura de base de datos para bd_alumnos_colegio
DROP DATABASE IF EXISTS `bd_alumnos_colegio`;
CREATE DATABASE IF NOT EXISTS `bd_alumnos_colegio` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_alumnos_colegio`;

-- Volcando estructura para tabla bd_alumnos_colegio.alumno
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `curso` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_alumnos_colegio.alumno: ~8 rows (aproximadamente)
DELETE FROM `alumno`;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` (`id`, `nombre`, `apellidos`, `curso`) VALUES
	(1, 'Gabriel', 'Martínez Torres', '1º PRIMARIA'),
	(2, 'Raul', 'Zamora Motos', '1º PRIMARIA'),
	(3, 'Pepe', 'López García ', '2º PRIMARIA'),
	(4, 'María', 'Gijón Pérez', '3º PRIMARIA'),
	(5, 'José', 'Reoliz Muñoz', '1º PRIMARIA'),
	(6, 'Alba', 'Farelo García', '1º PRIMARIA'),
	(7, 'Aitana', 'Galera López', '2º PRIMARIA'),
	(8, 'Rosalia', 'Vila Tobella', '3º PRIMARIA');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
