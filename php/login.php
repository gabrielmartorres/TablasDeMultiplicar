<?php
include "conexionAlumnos.php";
global $conexion;

$str_json = $_REQUEST['identificacion'];
$variable_php = json_decode($str_json);

/* $OrdenSql = $conexion->prepare("SELECT * FROM alumno WHERE id = ?");
$OrdenSql->bind_param('s',$variable_php);
$OrdenSql->execute(); */

$ordenSQL = "SELECT * FROM alumno WHERE id =$variable_php";
$resultado = $conexion->query($ordenSQL);

if ($resultado->num_rows > 0) {
    $Obj = $resultado->fetch_object();
    echo json_encode($Obj);
}else{
    //Si no encuentra el usuario o hay algún error devovlerá null
    echo json_encode(null);
}


