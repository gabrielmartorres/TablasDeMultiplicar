window.onload = function() {
    cargaSeccionLogin();
}

let objetoAjax;

const Alumno = {
    "id": '',
    "nombre": '',
    "apellidos": '',
    "curso": '',
    "ultima_tabla_multiplicar": '',
    "tabla_multiplicar": '',
    "aciertos": "",
    "fallos": "",
    "nota": ""
}

function AJAXCrearObjeto() {
    if (window.XMLHttpRequest) {
        // navegadores que siguen los estándares
        objetoAjax = new XMLHttpRequest();
    } else {
        // navegadores obsoletos
        objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objetoAjax;
}

function eliminarCentral() {
    let seccion = document.getElementById("central");
    while (seccion.firstChild) {
        seccion.removeChild(seccion.firstChild);
    }
}

function cerrar() {
    eliminarCentral();
    cargaSeccionLogin();

}

function eliminarTablaMultiplicar() {
    let seccion = document.getElementById("tablaMultiplicar1");
    let seccion2 = document.getElementById("tablaMultiplicar2");

    while (seccion.firstChild) {
        seccion.removeChild(seccion.firstChild);
    }
    while (seccion2.firstChild) {
        seccion2.removeChild(seccion2.firstChild);
    }
    if (document.getElementById("imgMultiplicacion")) {
        let multiplicaciones = document.getElementById("multiplicaciones");
        multiplicaciones.removeChild(imgMultiplicacion);
    }

    if (document.getElementById("tablaMultiplicarResultados")) {
        let seccion3 = document.getElementById("tablaMultiplicarResultados");
        while (seccion3.firstChild) {
            seccion3.removeChild(seccion3.firstChild);
        }
    }
}

function cargaSeccionLogin() {
    let central = document.getElementById("central");

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "tituloSeccion");
    let texto = document.createTextNode("Comprueba que eres tú");
    h2.appendChild(texto);
    central.appendChild(h2);

    let divlogin = document.createElement("div");
    divlogin.setAttribute("class", "login");
    central.appendChild(divlogin);

    let parrafoDni = document.createElement("p");
    parrafoDni.setAttribute("id", "datos");
    parrafoDni.setAttribute("class", "margenInferior");
    let textoparrafoDni = document.createTextNode("Introduce tu clave: ");
    parrafoDni.appendChild(textoparrafoDni);
    divlogin.appendChild(parrafoDni);

    let imputDni = document.createElement("input");
    imputDni.setAttribute("id", "identificacion");
    imputDni.setAttribute("maxlength", "9");
    imputDni.setAttribute("required", "required");
    imputDni.setAttribute("type", "text");
    imputDni.setAttribute("onkeypress", "pulsar(event)");
    parrafoDni.appendChild(imputDni);
    imputDni.focus();

    let botonEntrar = document.createElement("button");
    botonEntrar.setAttribute("id", "botonEntrar");
    botonEntrar.setAttribute("class", "botones");
    botonEntrar.setAttribute("onclick", "entrar()");
    let textobotonEntrar = document.createTextNode("ENTRAR");
    botonEntrar.appendChild(textobotonEntrar);
    divlogin.appendChild(botonEntrar);

}

function pulsar(e) { //Si capturo la tecla enter en el login
    if (e.keyCode === 13 && !e.shiftKey) {
        entrar();
    }
}

function entrar() {
    let identificacion = document.getElementById("identificacion").value;

    if (identificacion != "") { //Si el input de la identificación no está vacío.
        let jsonString = JSON.stringify(identificacion);
        objetoAjax = AJAXCrearObjeto();
        objetoAjax.open('GET', `php/login.php?identificacion=${jsonString}`, true);
        objetoAjax.send();
        objetoAjax.onreadystatechange = RespuestaLogin; //cuando cambie el estado de la petición 
    } else { //Si el input está vacío.
        let datos = document.getElementById("datos");
        datos.removeAttribute("class", "margenInferior");
        if (document.getElementById("error")) {
            datos.removeChild(document.getElementById("error"));
        }

        let parrafoInfo = document.createElement("p");
        parrafoInfo.setAttribute("id", "error");
        parrafoInfo.setAttribute("class", "mensajeError");
        let textoInfo = document.createTextNode("Has escrito mal tu clave");
        parrafoInfo.appendChild(textoInfo);
        datos.appendChild(parrafoInfo);
    }
}

function RespuestaLogin() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
        let datos = JSON.parse(objetoAjax.responseText);
        if (datos == null) {
            let datos = document.getElementById("datos");
            datos.removeAttribute("class", "margenInferior");
            if (document.getElementById("error")) {
                datos.removeChild(document.getElementById("error"));
            }
            let parrafoInfo = document.createElement("p");
            parrafoInfo.setAttribute("id", "error");
            parrafoInfo.setAttribute("class", "mensajeError");
            let textoInfo = document.createTextNode("Has escrito mal tu clave");
            parrafoInfo.appendChild(textoInfo);
            datos.appendChild(parrafoInfo);
        } else {
            Alumno.id = datos.id;
            Alumno.nombre = datos.nombre;
            Alumno.apellidos = datos.apellidos;
            Alumno.curso = datos.curso;
            Alumno.ultima_tabla_multiplicar = "1";
            realizarInsertAlumno();
            SeccionPrincipal();
        }

    }
}

function realizarInsertAlumno() {
    let jsonString = JSON.stringify(Alumno);
    objetoAjax = AJAXCrearObjeto();
    objetoAjax.open('GET', 'php/insertAlumnoPHP.php?Alumno=' + jsonString, true);
    objetoAjax.send();
    objetoAjax.onreadystatechange = respuestaObjetoAlumno; //cuando cambie el estado de la petición
}

function respuestaObjetoAlumno() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
        let datos = JSON.parse(objetoAjax.responseText);
        if (datos != "Alumno registrado.") {
            Alumno.ultima_tabla_multiplicar = datos.ultima_tabla_multiplicar;
        }
    }
}

function SeccionPrincipal() {
    eliminarCentral();
    let central = document.getElementById("central");

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "tituloSeccion");
    let texto = document.createTextNode("Tablas de multiplicar");
    h2.appendChild(texto);
    central.appendChild(h2);

    let X = document.createElement("span");
    X.setAttribute("id", "cerrar");
    X.setAttribute("onclick", "cerrar()");
    let textoX = document.createTextNode("X");
    X.appendChild(textoX);
    central.appendChild(X);

    let h4 = document.createElement("h4");
    h4.setAttribute("class", "datosAlumno");
    let textoh4 = document.createTextNode(`Hola ${Alumno.nombre} ${Alumno.apellidos} vamos a estudiar`);
    h4.appendChild(textoh4);
    central.appendChild(h4);

    let divMenu = document.createElement("div");
    divMenu.setAttribute("id", "menu");
    central.appendChild(divMenu);

    let botonAprender = document.createElement("button");
    botonAprender.setAttribute("class", "botones");
    botonAprender.setAttribute("id", "Aprender");
    botonAprender.setAttribute("onclick", "aprender()");
    let textoBotonAprender = document.createTextNode("APRENDER");
    botonAprender.appendChild(textoBotonAprender);
    divMenu.appendChild(botonAprender);

    let botonRepasar = document.createElement("button");
    botonRepasar.setAttribute("class", "botones");
    botonRepasar.setAttribute("id", "repasar");
    botonRepasar.setAttribute("onclick", "repasar()");
    let textoBotonRepasar = document.createTextNode("REPASAR");
    botonRepasar.appendChild(textoBotonRepasar);
    divMenu.appendChild(botonRepasar);

    let botonResultados = document.createElement("button");
    botonResultados.setAttribute("class", "botones");
    botonResultados.setAttribute("id", "botonResultados");
    botonResultados.setAttribute("onclick", "listarResultados()");
    let textoBotonResultados = document.createTextNode("RESULTADOS");
    botonResultados.appendChild(textoBotonResultados);
    divMenu.appendChild(botonResultados);

}

function aprender() {
    eliminarCentral();
    let central = document.getElementById("central");

    let botonAprender = document.createElement("button");
    botonAprender.setAttribute("class", "BotonVolver");
    botonAprender.setAttribute("id", "Aprender");
    botonAprender.setAttribute("onclick", "SeccionPrincipal()");
    let textoBotonAprender = document.createTextNode("VOLVER");
    botonAprender.appendChild(textoBotonAprender);
    central.appendChild(botonAprender);

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "tituloSeccion");
    let texto = document.createTextNode("Elige la tabla de multiplicar que quieres aprender");
    h2.appendChild(texto);
    central.appendChild(h2);

    let divAprender = document.createElement("div");
    divAprender.setAttribute("id", "seccionAprender");
    central.appendChild(divAprender);


    let divBotones = document.createElement("div");
    divBotones.setAttribute("id", "botonTablaMultiplicar");
    divAprender.appendChild(divBotones);

    for (let i = 1; i <= 10; i++) {
        let botonRepasar = document.createElement("button");
        botonRepasar.setAttribute("class", "botonTabla" + i);
        botonRepasar.setAttribute("id", "botonTabla" + i);
        if (i > Alumno.ultima_tabla_multiplicar) {
            botonRepasar.setAttribute("disabled", "true");
            botonRepasar.setAttribute("style", "background-color:#737373; color: #000000");
        }

        let textoBotonRepasar = document.createTextNode(i);
        botonRepasar.appendChild(textoBotonRepasar);
        divBotones.appendChild(botonRepasar);
        document.getElementById(`botonTabla${i}`).addEventListener("click", function() { cargaTablaMultiplicar(i) });
    }

    let divMultiplicaciones = document.createElement("div");
    divMultiplicaciones.setAttribute("id", "multiplicaciones");
    divAprender.appendChild(divMultiplicaciones);

    let imgMultiplicacion = document.createElement("img");
    imgMultiplicacion.setAttribute("id", "imgMultiplicacion");
    imgMultiplicacion.setAttribute("src", "img/multi2.png");
    multiplicaciones.appendChild(imgMultiplicacion);


    let tablaMultiplicar = document.createElement("div");
    tablaMultiplicar.setAttribute("id", "tablaMultiplicar");

    divMultiplicaciones.appendChild(tablaMultiplicar);

    let tablaMultiplicar1 = document.createElement("div");
    tablaMultiplicar1.setAttribute("id", "tablaMultiplicar1");
    tablaMultiplicar.appendChild(tablaMultiplicar1);

    let imgAnimal = document.createElement("img");
    imgAnimal.setAttribute("id", "imgAnimal");

    tablaMultiplicar.appendChild(imgAnimal);

    let tablaMultiplicar2 = document.createElement("div");
    tablaMultiplicar2.setAttribute("id", "tablaMultiplicar2");
    tablaMultiplicar.appendChild(tablaMultiplicar2);

}

function cargaTablaMultiplicar(num) {
    let tablaMultiplicar = document.getElementById("tablaMultiplicar");
    tablaMultiplicar.setAttribute("class", "tablaMultiplicar");

    let tablaMultiplicar1 = document.getElementById("tablaMultiplicar1");
    eliminarTablaMultiplicar();

    for (let i = 1; i <= 5; i++) {
        let parrafoTabla = document.createElement("p");
        parrafoTabla.setAttribute("class", "multiplicacion");
        let textoTabla = document.createTextNode(`${num} X ${i} = ${i*num}`);
        parrafoTabla.appendChild(textoTabla);
        tablaMultiplicar1.appendChild(parrafoTabla);
    }

    let imgAnimal = document.getElementById("imgAnimal");
    imgAnimal.setAttribute("src", `img/level${num}g.png`);

    let tablaMultiplicar2 = document.getElementById("tablaMultiplicar2");

    for (let i = 6; i <= 10; i++) {
        let parrafoTabla2 = document.createElement("p");
        parrafoTabla2.setAttribute("class", "multiplicacion");
        let textoTabla2 = document.createTextNode(`${num} X ${i} = ${i*num}`);
        parrafoTabla2.appendChild(textoTabla2);
        tablaMultiplicar2.appendChild(parrafoTabla2);
    }
}


function repasar() {
    eliminarCentral();
    let central = document.getElementById("central");

    let botonAprender = document.createElement("button");
    botonAprender.setAttribute("class", "BotonVolver");
    botonAprender.setAttribute("id", "Aprender");
    botonAprender.setAttribute("onclick", "SeccionPrincipal()");
    let textoBotonAprender = document.createTextNode("VOLVER");
    botonAprender.appendChild(textoBotonAprender);
    central.appendChild(botonAprender);

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "tituloSeccion");
    let texto = document.createTextNode("Elige la tabla de multiplicar que quieres repasar");
    h2.appendChild(texto);
    central.appendChild(h2);

    let divAprender = document.createElement("div");
    divAprender.setAttribute("id", "seccionAprender");
    central.appendChild(divAprender);


    let divBotones = document.createElement("div");
    divBotones.setAttribute("id", "botonTablaMultiplicar");
    divAprender.appendChild(divBotones);

    for (let i = 1; i <= 10; i++) {
        let botonRepasar = document.createElement("button");
        botonRepasar.setAttribute("class", "botonTabla" + i);
        botonRepasar.setAttribute("id", "botonTabla" + i);

        if (i > Alumno.ultima_tabla_multiplicar) {
            botonRepasar.setAttribute("disabled", "true");
            botonRepasar.setAttribute("style", "background-color:#737373; color: #000000");
        }

        let textoBotonRepasar = document.createTextNode(i);
        botonRepasar.appendChild(textoBotonRepasar);
        divBotones.appendChild(botonRepasar);
        document.getElementById(`botonTabla${i}`).addEventListener("click", function() { cargaRepasarTablaMultiplicar(i) });
    }

    let divMultiplicaciones = document.createElement("div");
    divMultiplicaciones.setAttribute("id", "multiplicaciones");
    divAprender.appendChild(divMultiplicaciones);

    let imgMultiplicacion = document.createElement("img");
    imgMultiplicacion.setAttribute("id", "imgMultiplicacion");
    imgMultiplicacion.setAttribute("src", "img/multi2.png");
    multiplicaciones.appendChild(imgMultiplicacion);

    let tablaMultiplicar = document.createElement("div");
    tablaMultiplicar.setAttribute("id", "tablaMultiplicar");

    divMultiplicaciones.appendChild(tablaMultiplicar);

    let tablaMultiplicar1 = document.createElement("div");
    tablaMultiplicar1.setAttribute("id", "tablaMultiplicar1");
    tablaMultiplicar.appendChild(tablaMultiplicar1);

    let tablaMultiplicar2 = document.createElement("div");
    tablaMultiplicar2.setAttribute("id", "tablaMultiplicar2");
    tablaMultiplicar.appendChild(tablaMultiplicar2);

    let tablaMultiplicarResultados = document.createElement("div");
    tablaMultiplicarResultados.setAttribute("id", "tablaMultiplicarResultados");
    tablaMultiplicar.appendChild(tablaMultiplicarResultados);

}

function cargaRepasarTablaMultiplicar(num) {
    let tablaMultiplicar = document.getElementById("tablaMultiplicar");
    tablaMultiplicar.setAttribute("class", "tablaMultiplicarRepaso");

    let tablaMultiplicar1 = document.getElementById("tablaMultiplicar1");
    eliminarTablaMultiplicar();

    for (let i = 1; i <= 5; i++) {
        let parrafoTabla1 = document.createElement("p");
        parrafoTabla1.setAttribute("class", "multiplicacion");
        let textoTabla = document.createTextNode(`${num} X ${i} =`);
        parrafoTabla1.appendChild(textoTabla);
        tablaMultiplicar1.appendChild(parrafoTabla1);

        let inputResultado1 = document.createElement("input");
        inputResultado1.setAttribute("class", "resultadoMultiplicacion");
        inputResultado1.setAttribute("id", `resultadoMultiplicacion${i}`);
        inputResultado1.setAttribute("maxlength", "2");
        inputResultado1.setAttribute("required", "required");
        inputResultado1.setAttribute("type", "text");
        parrafoTabla1.appendChild(inputResultado1);
        document.getElementById(`resultadoMultiplicacion${i}`).addEventListener("keyup", function() { calcular(num, i, event) });
    }
    document.getElementById("resultadoMultiplicacion1").focus();
    let tablaMultiplicar2 = document.getElementById("tablaMultiplicar2");

    for (let i = 6; i <= 10; i++) {
        let parrafoTabla2 = document.createElement("p");
        parrafoTabla2.setAttribute("class", "multiplicacion");
        let textoTabla2 = document.createTextNode(`${num} X ${i} =`);
        parrafoTabla2.appendChild(textoTabla2);
        tablaMultiplicar2.appendChild(parrafoTabla2);

        let inputResultado2 = document.createElement("input");
        inputResultado2.setAttribute("class", "resultadoMultiplicacion");
        inputResultado2.setAttribute("id", `resultadoMultiplicacion${i}`);
        if (i != 10) {
            inputResultado2.setAttribute("maxlength", "2");
        } else {
            inputResultado2.setAttribute("maxlength", "3");
            inputResultado2.setAttribute("style", "width: 14% !important");
        }
        inputResultado2.setAttribute("required", "required");
        inputResultado2.setAttribute("type", "text");
        parrafoTabla2.appendChild(inputResultado2);
        document.getElementById(`resultadoMultiplicacion${i}`).addEventListener("keyup", function() { calcular(num, i, event) });
    }

    let tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");

    let parrafoAciertos = document.createElement("p");
    parrafoAciertos.setAttribute("class", "multiplicacion");
    parrafoAciertos.setAttribute("id", "aciertos");
    let textoParrafoAciertos = document.createTextNode("ACIERTOS");
    parrafoAciertos.appendChild(textoParrafoAciertos);
    tablaMultiplicarResultados.appendChild(parrafoAciertos);
    let br = document.createElement("br");
    parrafoAciertos.appendChild(br);
    let parrafoNumeroAciertos = document.createElement("span");
    parrafoNumeroAciertos.setAttribute("id", "NumeroAciertos");
    parrafoAciertos.appendChild(parrafoNumeroAciertos);
    let textoNumeroAciertos = document.createTextNode("0");
    parrafoNumeroAciertos.appendChild(textoNumeroAciertos);

    let parrafoFallos = document.createElement("p");
    parrafoFallos.setAttribute("class", "multiplicacion");
    parrafoFallos.setAttribute("id", "fallos");
    let textoParrafoFallos = document.createTextNode("FALLOS");
    parrafoFallos.appendChild(textoParrafoFallos);
    tablaMultiplicarResultados.appendChild(parrafoFallos);
    let br2 = document.createElement("br");
    parrafoFallos.appendChild(br2);
    let parrafoNumeroFallos = document.createElement("span");
    parrafoNumeroFallos.setAttribute("id", "NumeroFallos");
    parrafoFallos.appendChild(parrafoNumeroFallos);
    let textoNumeroFallos = document.createTextNode("0");
    parrafoNumeroFallos.appendChild(textoNumeroFallos);

    let parrafoMensaje = document.createElement("p");
    parrafoMensaje.setAttribute("id", "mensaje");
    let textoParrafoMensaje = document.createTextNode("");
    parrafoMensaje.appendChild(textoParrafoMensaje);
    tablaMultiplicarResultados.appendChild(parrafoMensaje);

    let imgListado = document.createElement("img");
    imgListado.setAttribute("id", "imgAnimal");
    imgListado.setAttribute("src", `img/level${num}g.png`);
    tablaMultiplicarResultados.appendChild(imgListado);
}

function calcular(num, valor, event) {
    let totalUsuario = document.getElementById(`resultadoMultiplicacion${valor}`).value;
    let resultadoMultiplicacion = document.getElementById(`resultadoMultiplicacion${valor}`);
    // Para aciertos.
    let NumeroAciertos = document.getElementById("NumeroAciertos");
    let HijoNumeroAciertos = document.getElementById("NumeroAciertos").firstChild;
    let totalAciertos = parseInt(NumeroAciertos.innerHTML);
    let sumaAciertos = totalAciertos;
    // Para fallos.
    let NumeroFallos = document.getElementById("NumeroFallos");
    let HijoNumeroFallos = document.getElementById("NumeroFallos").firstChild;
    let totalFallos = parseInt(NumeroFallos.innerHTML);
    let sumaFallos = totalFallos;

    let operacion = num * valor;

    if (operacion.toString().length == totalUsuario.length) {
        if (operacion == totalUsuario) {
            //Para evitar que el usuario haga trampas.
            if (resultadoMultiplicacion.getAttribute("style") != "color:blue") {
                resultadoMultiplicacion.setAttribute("readonly", "readonly");
                resultadoMultiplicacion.setAttribute("style", "color:blue");
                sumaAciertos++;

                let textoAciertos = document.createTextNode(sumaAciertos);
                NumeroAciertos.replaceChild(textoAciertos, HijoNumeroAciertos);

                if (valor != 10) {
                    let siguienteInput = document.getElementById(`resultadoMultiplicacion${valor+1}`);
                    siguienteInput.focus();
                }
            }

        } else {
            //Para evitar que el usuario haga trampas.
            if (resultadoMultiplicacion.getAttribute("style") != "color:red") {
                resultadoMultiplicacion.setAttribute("readonly", "readonly");
                resultadoMultiplicacion.setAttribute("style", "color:red");

                sumaFallos++;
                let textoFallos = document.createTextNode(sumaFallos);
                NumeroFallos.replaceChild(textoFallos, HijoNumeroFallos);
            }

        }
    }

    let NumeroAciertos1 = document.getElementById("NumeroAciertos");
    let HijoNumeroAciertos1 = document.getElementById("NumeroAciertos").firstChild;
    let totalAciertos1 = parseInt(NumeroAciertos1.innerHTML);

    let NumeroFallos1 = document.getElementById("NumeroFallos");
    let HijoNumeroFallos1 = document.getElementById("NumeroFallos").firstChild;
    let totalFallos1 = parseInt(NumeroFallos1.innerHTML);

    let suma = totalAciertos1 + totalFallos1;
    if (totalAciertos1 >= totalFallos1 && suma == 10) {
        let tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");
        let imgAnimal = document.getElementById("imgAnimal");
        tablaMultiplicarResultados.removeChild(imgAnimal);

        let mensaje = document.getElementById("mensaje");
        let hijoMensaje = document.getElementById("mensaje").firstChild;
        let mensajeNuevo = document.createTextNode("HAS APROBADO");
        mensaje.replaceChild(mensajeNuevo, hijoMensaje);

        if (num != 10) {
            let botonSiguiente = document.createElement("button");
            botonSiguiente.setAttribute("id", "botonSiguiente");
            botonSiguiente.setAttribute("class", "botonSiguiente");
            botonSiguiente.setAttribute("onclick", `cargaRepasarTablaMultiplicar(${num+1})`);
            let textobotonSiguiente = document.createTextNode("SIGUIENTE");
            botonSiguiente.appendChild(textobotonSiguiente);
            tablaMultiplicarResultados.appendChild(botonSiguiente);
        }

        if (valor == 10) {
            let siguienteBoton = document.getElementById("botonSiguiente");
            siguienteBoton.focus();
        }
        //Agregamos 1 tabla al usuario.
        if (Alumno.ultima_tabla_multiplicar == num && num != 10) {
            let siguienteTabla = parseInt(Alumno.ultima_tabla_multiplicar) + 1;

            let boton = document.getElementById(`botonTabla${siguienteTabla}`);
            boton.removeAttribute("style");
            boton.removeAttribute("disabled");

            //Guardamos en la base de datos.
            Alumno.aciertos = totalAciertos1;
            Alumno.fallos = totalFallos1;
            Alumno.nota = totalAciertos1;
            Alumno.tabla_multiplicar = num;
            realizarInsertActualizarAlumnoTabla();
            Alumno.ultima_tabla_multiplicar = siguienteTabla;

        } else {
            //Guardamos en la base de datos.
            Alumno.aciertos = totalAciertos1;
            Alumno.fallos = totalFallos1;
            Alumno.nota = totalAciertos1;
            Alumno.tabla_multiplicar = num;
            realizarInsertAlumnoTabla();
        }
    }

    if (totalAciertos1 < totalFallos1 && suma == 10) {
        let mensaje = document.getElementById("mensaje");
        mensaje.setAttribute("style", "color:red");
        let hijoMensaje = document.getElementById("mensaje").firstChild;
        let mensajeNuevo = document.createTextNode("HAS SUSPENDIDO");
        mensaje.replaceChild(mensajeNuevo, hijoMensaje);

        let tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");
        let imgAnimal = document.getElementById("imgAnimal");
        tablaMultiplicarResultados.removeChild(imgAnimal);

        let botonSiguiente = document.createElement("button");
        botonSiguiente.setAttribute("id", "botonSiguiente");
        botonSiguiente.setAttribute("class", "botonSiguiente");
        botonSiguiente.setAttribute("onclick", `cargaRepasarTablaMultiplicar(${num})`);
        let textobotonSiguiente = document.createTextNode("INTÉNTALO");
        botonSiguiente.appendChild(textobotonSiguiente);
        tablaMultiplicarResultados.appendChild(botonSiguiente);

        if (valor == 10) {
            let siguienteBoton = document.getElementById("botonSiguiente");
            siguienteBoton.focus();
        }

        //Guardamos en la base de datos.
        Alumno.aciertos = totalAciertos1;
        Alumno.fallos = totalFallos1;
        Alumno.nota = totalAciertos1;
        Alumno.tabla_multiplicar = num;
        realizarInsertAlumnoTabla();
    }

}

function realizarInsertActualizarAlumnoTabla() {
    let jsonString = JSON.stringify(Alumno);
    objetoAjax = AJAXCrearObjeto();
    objetoAjax.open('GET', 'php/insertActualizarAlumnoTablaPHP.php?Alumno=' + jsonString, true);
    objetoAjax.send();
    objetoAjax.onreadystatechange = RespuestaInsertActualizarAlumnoTabla;
}

function RespuestaInsertActualizarAlumnoTabla() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {}
}

function realizarInsertAlumnoTabla() {
    let jsonString = JSON.stringify(Alumno);
    objetoAjax = AJAXCrearObjeto();
    objetoAjax.open('GET', 'php/insertAlumnoTablaPHP.php?Alumno=' + jsonString, true);
    objetoAjax.send();
    objetoAjax.onreadystatechange = RespuestaInsertAlumnoTabla;
}

function RespuestaInsertAlumnoTabla() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {}
}

function listarResultados() {
    eliminarCentral();
    let central = document.getElementById("central");

    let botonAprender = document.createElement("button");
    botonAprender.setAttribute("class", "BotonVolver");
    botonAprender.setAttribute("id", "Aprender");
    botonAprender.setAttribute("onclick", "SeccionPrincipal()");
    let textoBotonAprender = document.createTextNode("VOLVER");
    botonAprender.appendChild(textoBotonAprender);
    central.appendChild(botonAprender);

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "tituloSeccion");
    let texto = document.createTextNode("Listado de resultados por alumno");
    h2.appendChild(texto);
    central.appendChild(h2);

    let divAprender = document.createElement("div");
    divAprender.setAttribute("id", "seccionListado");
    central.appendChild(divAprender);

    comprobarResultados();
}


function comprobarResultados() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto XMLHttpRequest dependiendo del navegador
    objetoAjax.open('GET', 'php/consultaResultados.php', true);
    objetoAjax.send();
    objetoAjax.onreadystatechange = recibirRespuestaArray; //cuando cambie el estado de la petición
}

function recibirRespuestaArray() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
        var array = JSON.parse(objetoAjax.responseText);
        let central = document.getElementById('seccionListado');

        let tabla = document.createElement("table");
        central.appendChild(tabla);

        let thead = document.createElement("thead");
        tabla.appendChild(thead);

        let fila1 = document.createElement("tr");
        thead.appendChild(fila1);

        let th = document.createElement("th");
        let thTexto = document.createTextNode("ID ALUMNO");
        th.appendChild(thTexto);
        fila1.appendChild(th);

        let th2 = document.createElement("th");
        let th2Texto = document.createTextNode("NOMBRE");
        th2.appendChild(th2Texto);
        fila1.appendChild(th2);

        let th3 = document.createElement("th");
        let th3Texto = document.createTextNode("TABLA DE  MULTIPLICAR");
        th3.appendChild(th3Texto);
        fila1.appendChild(th3);

        let th4 = document.createElement("th");
        let th4Texto = document.createTextNode("NOTA MÁXIMA");
        th4.appendChild(th4Texto);
        fila1.appendChild(th4);

        let tbody = document.createElement("tbody");
        tabla.appendChild(tbody);

        for (let i = 0; i < array.length; i++) {
            let fila2 = document.createElement("tr");
            tbody.appendChild(fila2);
            let td2 = document.createElement("td");
            let td2Texto = document.createTextNode(array[i].id_alumno);
            td2.appendChild(td2Texto);
            fila2.appendChild(td2);

            let td2_1 = document.createElement("td");
            let td2_1Texto = document.createTextNode(array[i].nombre);
            td2_1.appendChild(td2_1Texto);
            fila2.appendChild(td2_1);

            let td2_2 = document.createElement("td");
            let td2_2Texto = document.createTextNode(array[i].tabla_multiplicar);
            td2_2.appendChild(td2_2Texto);
            fila2.appendChild(td2_2);

            let td2_3 = document.createElement("td");
            let td2_3Texto = document.createTextNode(array[i].nota);
            td2_3.appendChild(td2_3Texto);
            fila2.appendChild(td2_3);
        }

        let imgListado = document.createElement("img");
        imgListado.setAttribute("id", "imgListado");
        imgListado.setAttribute("src", "img/tablas-multi.jpg");
        central.appendChild(imgListado);

    }
}