<?php
include "conexion.php";
global $conexion;

$str_obj_json = $_REQUEST['Alumno'];
$obj_php = json_decode($str_obj_json);

$id = $obj_php->id;
$nombre = $obj_php->nombre;
$ultima_tabla = $obj_php->ultima_tabla_multiplicar;

//Comprobamos si existe el alumno
$ordenSQL = "SELECT * FROM alumno WHERE id =$id";
$resultado = $conexion->query($ordenSQL);

if ($resultado->num_rows > 0) {
    //Si lo encuentra
    $Obj = $resultado->fetch_object();
    echo json_encode($Obj); 
    //return;
} else {
    //Si no encuentra el usuario o hay algún error devovlerá null
    $OrdenSql = $conexion->prepare("INSERT INTO alumno VALUES (?,?,?)");
    $OrdenSql->bind_param('sss', $id, $nombre, $ultima_tabla);
    $OrdenSql->execute();
    $FilasAfectadas = $OrdenSql->affected_rows;
    if ($FilasAfectadas != 1) {
        $respuesta = "Insercion Fallida.";
    } else {
        $respuesta = "Alumno registrado.";
    }
    echo json_encode($respuesta);
}
