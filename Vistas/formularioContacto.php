<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/style.css">
    <script src="../output/archivojs.js"></script>
    <title></title>
</head>

<body onload="cargaPrimeraSeccion();">
    <header class="cabecera">
        <h1>Parque natural Sierra de Cazorla</h1>
    </header>
    <nav>
        <blockquote>
            <button class="botones" onclick='cambiarPagina("inicio")'>Inicio</button><br>
            <button class="botones" onclick='cambiarPagina("especies")'>Especies</button><br>
            <button class="botones" onclick='cambiarPagina("reservas")'>Reservas</button><br>
            <button class="botones" onclick='cambiarPagina("galeria")'>Galería</button>
        </blockquote>
    </nav>
    <article id="Principal">
        <section id="central">
        </section>
    </article>
</body>

</html>