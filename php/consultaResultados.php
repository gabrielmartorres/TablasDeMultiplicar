<?php
include "conexion.php";
global $conexion;

 
$SQL = "SELECT R.id_alumno, A.nombre, R.tabla_multiplicar, MAX(R.nota) AS nota FROM RESPUESTAS R, ALUMNO A WHERE R.id_alumno=A.id GROUP BY R.id_alumno,R.tabla_multiplicar ASC";

$resultado = $conexion->query($SQL);

$ArrayObjects = array();

if ($resultado->num_rows > 0) {
        $Obj = $resultado->fetch_array(); 
        while ($Obj) {
                $ArrayObjects[] = $Obj;
                $Obj = $resultado->fetch_array();
        }
}

echo json_encode($ArrayObjects);

