<?php
#Establecer la conexión con el servidor.
@$conexion = new mysqli("localhost", "root", "");
    
$conexion->set_charset("utf8");
#Para evitar que se interpren mal las tildes y la ñ.
if(!$conexion->connect_errno){
    //echo "<h2>Conexión establecida con el servidor</h2>";
    #Seleccionar la bse de datos
    $conexion->select_db("bd_alumnos_colegio") or die ("Base de datos no encontrada");
    //echo "<h2>Conexión establecida con la base de datos alumnos</h2>";
}else{
    //echo "<h2>No ha sido posible crear la conexión con el servidor.</h2>";
}

?>