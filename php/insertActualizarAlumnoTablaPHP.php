<?php
include "conexion.php";
global $conexion;

$str_obj_json = $_REQUEST['Alumno'];
$obj_php = json_decode($str_obj_json);

$id = $obj_php->id;
$nombre = $obj_php->nombre;
$ultima_tabla_multiplicar = $obj_php->ultima_tabla_multiplicar;
$tabla_multiplicar = $obj_php->tabla_multiplicar;
$aciertos = $obj_php->aciertos;
$fallos = $obj_php->fallos;
$nota = $obj_php->nota;

$OrdenSql = $conexion->prepare("INSERT INTO respuestas VALUES (null,?,?,?,?,?)");
$OrdenSql->bind_param('sssss', $id, $tabla_multiplicar, $aciertos, $fallos, $nota);
$OrdenSql->execute();
$FilasAfectadas = $OrdenSql->affected_rows;
if ($FilasAfectadas != 1) {
    $respuesta = "Insercion Fallida.";
} else {
    $OrdenSql2 = "UPDATE alumno SET ultima_tabla_multiplicar = ultima_tabla_multiplicar + 1 WHERE id='$id'";
    $FilasAfectadas2 = $conexion->query($OrdenSql2);

    if ($FilasAfectadas2 == 1) {
        $respuesta = "Datos registrados y actualizados";
    }else{
        $respuesta = "Actualizacion Erronea.";
    }
}
echo json_encode($respuesta);
