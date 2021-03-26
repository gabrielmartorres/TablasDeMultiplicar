"use strict";

window.onload = function () {
  cargaSeccionLogin();
};

var objetoAjax;
var Alumno = {
  "id": '',
  "nombre": '',
  "apellidos": '',
  "curso": '',
  "ultima_tabla_multiplicar": '',
  "tabla_multiplicar": '',
  "aciertos": "",
  "fallos": "",
  "nota": ""
};

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
  var seccion = document.getElementById("central");

  while (seccion.firstChild) {
    seccion.removeChild(seccion.firstChild);
  }
}

function cerrar() {
  eliminarCentral();
  cargaSeccionLogin();
}

function eliminarTablaMultiplicar() {
  var seccion = document.getElementById("tablaMultiplicar1");
  var seccion2 = document.getElementById("tablaMultiplicar2");

  while (seccion.firstChild) {
    seccion.removeChild(seccion.firstChild);
  }

  while (seccion2.firstChild) {
    seccion2.removeChild(seccion2.firstChild);
  }

  if (document.getElementById("imgMultiplicacion")) {
    var _multiplicaciones = document.getElementById("multiplicaciones");

    _multiplicaciones.removeChild(imgMultiplicacion);
  }

  if (document.getElementById("tablaMultiplicarResultados")) {
    var seccion3 = document.getElementById("tablaMultiplicarResultados");

    while (seccion3.firstChild) {
      seccion3.removeChild(seccion3.firstChild);
    }
  }
}

function cargaSeccionLogin() {
  var central = document.getElementById("central");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("Comprueba que eres tú");
  h2.appendChild(texto);
  central.appendChild(h2);
  var divlogin = document.createElement("div");
  divlogin.setAttribute("class", "login");
  central.appendChild(divlogin);
  var parrafoDni = document.createElement("p");
  parrafoDni.setAttribute("id", "datos");
  parrafoDni.setAttribute("class", "margenInferior");
  var textoparrafoDni = document.createTextNode("Introduce tu clave: ");
  parrafoDni.appendChild(textoparrafoDni);
  divlogin.appendChild(parrafoDni);
  var imputDni = document.createElement("input");
  imputDni.setAttribute("id", "identificacion");
  imputDni.setAttribute("maxlength", "9");
  imputDni.setAttribute("required", "required");
  imputDni.setAttribute("type", "text");
  imputDni.setAttribute("onkeypress", "pulsar(event)");
  parrafoDni.appendChild(imputDni);
  imputDni.focus();
  var botonEntrar = document.createElement("button");
  botonEntrar.setAttribute("id", "botonEntrar");
  botonEntrar.setAttribute("class", "botones");
  botonEntrar.setAttribute("onclick", "entrar()");
  var textobotonEntrar = document.createTextNode("ENTRAR");
  botonEntrar.appendChild(textobotonEntrar);
  divlogin.appendChild(botonEntrar);
}

function pulsar(e) {
  //Si capturo la tecla enter en el login
  if (e.keyCode === 13 && !e.shiftKey) {
    entrar();
  }
}

function entrar() {
  var identificacion = document.getElementById("identificacion").value;

  if (identificacion != "") {
    //Si el input de la identificación no está vacío.
    var jsonString = JSON.stringify(identificacion);
    objetoAjax = AJAXCrearObjeto();
    objetoAjax.open('GET', "php/login.php?identificacion=".concat(jsonString), true);
    objetoAjax.send();
    objetoAjax.onreadystatechange = RespuestaLogin; //cuando cambie el estado de la petición 
  } else {
    //Si el input está vacío.
    var datos = document.getElementById("datos");
    datos.removeAttribute("class", "margenInferior");

    if (document.getElementById("error")) {
      datos.removeChild(document.getElementById("error"));
    }

    var parrafoInfo = document.createElement("p");
    parrafoInfo.setAttribute("id", "error");
    parrafoInfo.setAttribute("class", "mensajeError");
    var textoInfo = document.createTextNode("Has escrito mal tu clave");
    parrafoInfo.appendChild(textoInfo);
    datos.appendChild(parrafoInfo);
  }
}

function RespuestaLogin() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
    var datos = JSON.parse(objetoAjax.responseText);

    if (datos == null) {
      var _datos = document.getElementById("datos");

      _datos.removeAttribute("class", "margenInferior");

      if (document.getElementById("error")) {
        _datos.removeChild(document.getElementById("error"));
      }

      var parrafoInfo = document.createElement("p");
      parrafoInfo.setAttribute("id", "error");
      parrafoInfo.setAttribute("class", "mensajeError");
      var textoInfo = document.createTextNode("Has escrito mal tu clave");
      parrafoInfo.appendChild(textoInfo);

      _datos.appendChild(parrafoInfo);
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
  var jsonString = JSON.stringify(Alumno);
  objetoAjax = AJAXCrearObjeto();
  objetoAjax.open('GET', 'php/insertAlumnoPHP.php?Alumno=' + jsonString, true);
  objetoAjax.send();
  objetoAjax.onreadystatechange = respuestaObjetoAlumno; //cuando cambie el estado de la petición
}

function respuestaObjetoAlumno() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
    var datos = JSON.parse(objetoAjax.responseText);

    if (datos != "Alumno registrado.") {
      Alumno.ultima_tabla_multiplicar = datos.ultima_tabla_multiplicar;
    }
  }
}

function SeccionPrincipal() {
  eliminarCentral();
  var central = document.getElementById("central");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("Tablas de multiplicar");
  h2.appendChild(texto);
  central.appendChild(h2);
  var X = document.createElement("span");
  X.setAttribute("id", "cerrar");
  X.setAttribute("onclick", "cerrar()");
  var textoX = document.createTextNode("X");
  X.appendChild(textoX);
  central.appendChild(X);
  var h4 = document.createElement("h4");
  h4.setAttribute("class", "datosAlumno");
  var textoh4 = document.createTextNode("Hola ".concat(Alumno.nombre, " ").concat(Alumno.apellidos, " vamos a estudiar"));
  h4.appendChild(textoh4);
  central.appendChild(h4);
  var divMenu = document.createElement("div");
  divMenu.setAttribute("id", "menu");
  central.appendChild(divMenu);
  var botonAprender = document.createElement("button");
  botonAprender.setAttribute("class", "botones");
  botonAprender.setAttribute("id", "Aprender");
  botonAprender.setAttribute("onclick", "aprender()");
  var textoBotonAprender = document.createTextNode("APRENDER");
  botonAprender.appendChild(textoBotonAprender);
  divMenu.appendChild(botonAprender);
  var botonRepasar = document.createElement("button");
  botonRepasar.setAttribute("class", "botones");
  botonRepasar.setAttribute("id", "repasar");
  botonRepasar.setAttribute("onclick", "repasar()");
  var textoBotonRepasar = document.createTextNode("REPASAR");
  botonRepasar.appendChild(textoBotonRepasar);
  divMenu.appendChild(botonRepasar);
  var botonResultados = document.createElement("button");
  botonResultados.setAttribute("class", "botones");
  botonResultados.setAttribute("id", "botonResultados");
  botonResultados.setAttribute("onclick", "listarResultados()");
  var textoBotonResultados = document.createTextNode("RESULTADOS");
  botonResultados.appendChild(textoBotonResultados);
  divMenu.appendChild(botonResultados);
}

function aprender() {
  eliminarCentral();
  var central = document.getElementById("central");
  var botonAprender = document.createElement("button");
  botonAprender.setAttribute("class", "BotonVolver");
  botonAprender.setAttribute("id", "Aprender");
  botonAprender.setAttribute("onclick", "SeccionPrincipal()");
  var textoBotonAprender = document.createTextNode("VOLVER");
  botonAprender.appendChild(textoBotonAprender);
  central.appendChild(botonAprender);
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("Elige la tabla de multiplicar que quieres aprender");
  h2.appendChild(texto);
  central.appendChild(h2);
  var divAprender = document.createElement("div");
  divAprender.setAttribute("id", "seccionAprender");
  central.appendChild(divAprender);
  var divBotones = document.createElement("div");
  divBotones.setAttribute("id", "botonTablaMultiplicar");
  divAprender.appendChild(divBotones);

  var _loop = function _loop(i) {
    var botonRepasar = document.createElement("button");
    botonRepasar.setAttribute("class", "botonTabla" + i);
    botonRepasar.setAttribute("id", "botonTabla" + i);

    if (i > Alumno.ultima_tabla_multiplicar) {
      botonRepasar.setAttribute("disabled", "true");
      botonRepasar.setAttribute("style", "background-color:#737373; color: #000000");
    }

    var textoBotonRepasar = document.createTextNode(i);
    botonRepasar.appendChild(textoBotonRepasar);
    divBotones.appendChild(botonRepasar);
    document.getElementById("botonTabla".concat(i)).addEventListener("click", function () {
      cargaTablaMultiplicar(i);
    });
  };

  for (var i = 1; i <= 10; i++) {
    _loop(i);
  }

  var divMultiplicaciones = document.createElement("div");
  divMultiplicaciones.setAttribute("id", "multiplicaciones");
  divAprender.appendChild(divMultiplicaciones);
  var imgMultiplicacion = document.createElement("img");
  imgMultiplicacion.setAttribute("id", "imgMultiplicacion");
  imgMultiplicacion.setAttribute("src", "img/multi2.png");
  multiplicaciones.appendChild(imgMultiplicacion);
  var tablaMultiplicar = document.createElement("div");
  tablaMultiplicar.setAttribute("id", "tablaMultiplicar");
  divMultiplicaciones.appendChild(tablaMultiplicar);
  var tablaMultiplicar1 = document.createElement("div");
  tablaMultiplicar1.setAttribute("id", "tablaMultiplicar1");
  tablaMultiplicar.appendChild(tablaMultiplicar1);
  var imgAnimal = document.createElement("img");
  imgAnimal.setAttribute("id", "imgAnimal");
  tablaMultiplicar.appendChild(imgAnimal);
  var tablaMultiplicar2 = document.createElement("div");
  tablaMultiplicar2.setAttribute("id", "tablaMultiplicar2");
  tablaMultiplicar.appendChild(tablaMultiplicar2);
}

function cargaTablaMultiplicar(num) {
  var tablaMultiplicar = document.getElementById("tablaMultiplicar");
  tablaMultiplicar.setAttribute("class", "tablaMultiplicar");
  var tablaMultiplicar1 = document.getElementById("tablaMultiplicar1");
  eliminarTablaMultiplicar();

  for (var i = 1; i <= 5; i++) {
    var parrafoTabla = document.createElement("p");
    parrafoTabla.setAttribute("class", "multiplicacion");
    var textoTabla = document.createTextNode("".concat(num, " X ").concat(i, " = ").concat(i * num));
    parrafoTabla.appendChild(textoTabla);
    tablaMultiplicar1.appendChild(parrafoTabla);
  }

  var imgAnimal = document.getElementById("imgAnimal");
  imgAnimal.setAttribute("src", "img/level".concat(num, "g.png"));
  var tablaMultiplicar2 = document.getElementById("tablaMultiplicar2");

  for (var _i = 6; _i <= 10; _i++) {
    var parrafoTabla2 = document.createElement("p");
    parrafoTabla2.setAttribute("class", "multiplicacion");
    var textoTabla2 = document.createTextNode("".concat(num, " X ").concat(_i, " = ").concat(_i * num));
    parrafoTabla2.appendChild(textoTabla2);
    tablaMultiplicar2.appendChild(parrafoTabla2);
  }
}

function repasar() {
  eliminarCentral();
  var central = document.getElementById("central");
  var botonAprender = document.createElement("button");
  botonAprender.setAttribute("class", "BotonVolver");
  botonAprender.setAttribute("id", "Aprender");
  botonAprender.setAttribute("onclick", "SeccionPrincipal()");
  var textoBotonAprender = document.createTextNode("VOLVER");
  botonAprender.appendChild(textoBotonAprender);
  central.appendChild(botonAprender);
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("Elige la tabla de multiplicar que quieres repasar");
  h2.appendChild(texto);
  central.appendChild(h2);
  var divAprender = document.createElement("div");
  divAprender.setAttribute("id", "seccionAprender");
  central.appendChild(divAprender);
  var divBotones = document.createElement("div");
  divBotones.setAttribute("id", "botonTablaMultiplicar");
  divAprender.appendChild(divBotones);

  var _loop2 = function _loop2(i) {
    var botonRepasar = document.createElement("button");
    botonRepasar.setAttribute("class", "botonTabla" + i);
    botonRepasar.setAttribute("id", "botonTabla" + i);

    if (i > Alumno.ultima_tabla_multiplicar) {
      botonRepasar.setAttribute("disabled", "true");
      botonRepasar.setAttribute("style", "background-color:#737373; color: #000000");
    }

    var textoBotonRepasar = document.createTextNode(i);
    botonRepasar.appendChild(textoBotonRepasar);
    divBotones.appendChild(botonRepasar);
    document.getElementById("botonTabla".concat(i)).addEventListener("click", function () {
      cargaRepasarTablaMultiplicar(i);
    });
  };

  for (var i = 1; i <= 10; i++) {
    _loop2(i);
  }

  var divMultiplicaciones = document.createElement("div");
  divMultiplicaciones.setAttribute("id", "multiplicaciones");
  divAprender.appendChild(divMultiplicaciones);
  var imgMultiplicacion = document.createElement("img");
  imgMultiplicacion.setAttribute("id", "imgMultiplicacion");
  imgMultiplicacion.setAttribute("src", "img/multi2.png");
  multiplicaciones.appendChild(imgMultiplicacion);
  var tablaMultiplicar = document.createElement("div");
  tablaMultiplicar.setAttribute("id", "tablaMultiplicar");
  divMultiplicaciones.appendChild(tablaMultiplicar);
  var tablaMultiplicar1 = document.createElement("div");
  tablaMultiplicar1.setAttribute("id", "tablaMultiplicar1");
  tablaMultiplicar.appendChild(tablaMultiplicar1);
  var tablaMultiplicar2 = document.createElement("div");
  tablaMultiplicar2.setAttribute("id", "tablaMultiplicar2");
  tablaMultiplicar.appendChild(tablaMultiplicar2);
  var tablaMultiplicarResultados = document.createElement("div");
  tablaMultiplicarResultados.setAttribute("id", "tablaMultiplicarResultados");
  tablaMultiplicar.appendChild(tablaMultiplicarResultados);
}

function cargaRepasarTablaMultiplicar(num) {
  var tablaMultiplicar = document.getElementById("tablaMultiplicar");
  tablaMultiplicar.setAttribute("class", "tablaMultiplicarRepaso");
  var tablaMultiplicar1 = document.getElementById("tablaMultiplicar1");
  eliminarTablaMultiplicar();

  var _loop3 = function _loop3(i) {
    var parrafoTabla1 = document.createElement("p");
    parrafoTabla1.setAttribute("class", "multiplicacion");
    var textoTabla = document.createTextNode("".concat(num, " X ").concat(i, " ="));
    parrafoTabla1.appendChild(textoTabla);
    tablaMultiplicar1.appendChild(parrafoTabla1);
    var inputResultado1 = document.createElement("input");
    inputResultado1.setAttribute("class", "resultadoMultiplicacion");
    inputResultado1.setAttribute("id", "resultadoMultiplicacion".concat(i));
    inputResultado1.setAttribute("maxlength", "2");
    inputResultado1.setAttribute("required", "required");
    inputResultado1.setAttribute("type", "text");
    parrafoTabla1.appendChild(inputResultado1);
    document.getElementById("resultadoMultiplicacion".concat(i)).addEventListener("keyup", function () {
      calcular(num, i, event);
    });
  };

  for (var i = 1; i <= 5; i++) {
    _loop3(i);
  }

  document.getElementById("resultadoMultiplicacion1").focus();
  var tablaMultiplicar2 = document.getElementById("tablaMultiplicar2");

  var _loop4 = function _loop4(i) {
    var parrafoTabla2 = document.createElement("p");
    parrafoTabla2.setAttribute("class", "multiplicacion");
    var textoTabla2 = document.createTextNode("".concat(num, " X ").concat(i, " ="));
    parrafoTabla2.appendChild(textoTabla2);
    tablaMultiplicar2.appendChild(parrafoTabla2);
    var inputResultado2 = document.createElement("input");
    inputResultado2.setAttribute("class", "resultadoMultiplicacion");
    inputResultado2.setAttribute("id", "resultadoMultiplicacion".concat(i));

    if (i != 10) {
      inputResultado2.setAttribute("maxlength", "2");
    } else {
      inputResultado2.setAttribute("maxlength", "3");
      inputResultado2.setAttribute("style", "width: 14% !important");
    }

    inputResultado2.setAttribute("required", "required");
    inputResultado2.setAttribute("type", "text");
    parrafoTabla2.appendChild(inputResultado2);
    document.getElementById("resultadoMultiplicacion".concat(i)).addEventListener("keyup", function () {
      calcular(num, i, event);
    });
  };

  for (var i = 6; i <= 10; i++) {
    _loop4(i);
  }

  var tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");
  var parrafoAciertos = document.createElement("p");
  parrafoAciertos.setAttribute("class", "multiplicacion");
  parrafoAciertos.setAttribute("id", "aciertos");
  var textoParrafoAciertos = document.createTextNode("ACIERTOS");
  parrafoAciertos.appendChild(textoParrafoAciertos);
  tablaMultiplicarResultados.appendChild(parrafoAciertos);
  var br = document.createElement("br");
  parrafoAciertos.appendChild(br);
  var parrafoNumeroAciertos = document.createElement("span");
  parrafoNumeroAciertos.setAttribute("id", "NumeroAciertos");
  parrafoAciertos.appendChild(parrafoNumeroAciertos);
  var textoNumeroAciertos = document.createTextNode("0");
  parrafoNumeroAciertos.appendChild(textoNumeroAciertos);
  var parrafoFallos = document.createElement("p");
  parrafoFallos.setAttribute("class", "multiplicacion");
  parrafoFallos.setAttribute("id", "fallos");
  var textoParrafoFallos = document.createTextNode("FALLOS");
  parrafoFallos.appendChild(textoParrafoFallos);
  tablaMultiplicarResultados.appendChild(parrafoFallos);
  var br2 = document.createElement("br");
  parrafoFallos.appendChild(br2);
  var parrafoNumeroFallos = document.createElement("span");
  parrafoNumeroFallos.setAttribute("id", "NumeroFallos");
  parrafoFallos.appendChild(parrafoNumeroFallos);
  var textoNumeroFallos = document.createTextNode("0");
  parrafoNumeroFallos.appendChild(textoNumeroFallos);
  var parrafoMensaje = document.createElement("p");
  parrafoMensaje.setAttribute("id", "mensaje");
  var textoParrafoMensaje = document.createTextNode("");
  parrafoMensaje.appendChild(textoParrafoMensaje);
  tablaMultiplicarResultados.appendChild(parrafoMensaje);
  var imgListado = document.createElement("img");
  imgListado.setAttribute("id", "imgAnimal");
  imgListado.setAttribute("src", "img/level".concat(num, "g.png"));
  tablaMultiplicarResultados.appendChild(imgListado);
}

function calcular(num, valor, event) {
  var totalUsuario = document.getElementById("resultadoMultiplicacion".concat(valor)).value;
  var resultadoMultiplicacion = document.getElementById("resultadoMultiplicacion".concat(valor)); // Para aciertos.

  var NumeroAciertos = document.getElementById("NumeroAciertos");
  var HijoNumeroAciertos = document.getElementById("NumeroAciertos").firstChild;
  var totalAciertos = parseInt(NumeroAciertos.innerHTML);
  var sumaAciertos = totalAciertos; // Para fallos.

  var NumeroFallos = document.getElementById("NumeroFallos");
  var HijoNumeroFallos = document.getElementById("NumeroFallos").firstChild;
  var totalFallos = parseInt(NumeroFallos.innerHTML);
  var sumaFallos = totalFallos;
  var operacion = num * valor;

  if (operacion.toString().length == totalUsuario.length) {
    if (operacion == totalUsuario) {
      //Para evitar que el usuario haga trampas.
      if (resultadoMultiplicacion.getAttribute("style") != "color:blue") {
        resultadoMultiplicacion.setAttribute("readonly", "readonly");
        resultadoMultiplicacion.setAttribute("style", "color:blue");
        sumaAciertos++;
        var textoAciertos = document.createTextNode(sumaAciertos);
        NumeroAciertos.replaceChild(textoAciertos, HijoNumeroAciertos);

        if (valor != 10) {
          var siguienteInput = document.getElementById("resultadoMultiplicacion".concat(valor + 1));
          siguienteInput.focus();
        }
      }
    } else {
      //Para evitar que el usuario haga trampas.
      if (resultadoMultiplicacion.getAttribute("style") != "color:red") {
        resultadoMultiplicacion.setAttribute("readonly", "readonly");
        resultadoMultiplicacion.setAttribute("style", "color:red");
        sumaFallos++;
        var textoFallos = document.createTextNode(sumaFallos);
        NumeroFallos.replaceChild(textoFallos, HijoNumeroFallos);
      }
    }
  }

  var NumeroAciertos1 = document.getElementById("NumeroAciertos");
  var HijoNumeroAciertos1 = document.getElementById("NumeroAciertos").firstChild;
  var totalAciertos1 = parseInt(NumeroAciertos1.innerHTML);
  var NumeroFallos1 = document.getElementById("NumeroFallos");
  var HijoNumeroFallos1 = document.getElementById("NumeroFallos").firstChild;
  var totalFallos1 = parseInt(NumeroFallos1.innerHTML);
  var suma = totalAciertos1 + totalFallos1;

  if (totalAciertos1 >= totalFallos1 && suma == 10) {
    var tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");
    var imgAnimal = document.getElementById("imgAnimal");
    tablaMultiplicarResultados.removeChild(imgAnimal);
    var mensaje = document.getElementById("mensaje");
    var hijoMensaje = document.getElementById("mensaje").firstChild;
    var mensajeNuevo = document.createTextNode("HAS APROBADO");
    mensaje.replaceChild(mensajeNuevo, hijoMensaje);

    if (num != 10) {
      var botonSiguiente = document.createElement("button");
      botonSiguiente.setAttribute("id", "botonSiguiente");
      botonSiguiente.setAttribute("class", "botonSiguiente");
      botonSiguiente.setAttribute("onclick", "cargaRepasarTablaMultiplicar(".concat(num + 1, ")"));
      var textobotonSiguiente = document.createTextNode("SIGUIENTE");
      botonSiguiente.appendChild(textobotonSiguiente);
      tablaMultiplicarResultados.appendChild(botonSiguiente);
    }

    if (valor == 10) {
      var siguienteBoton = document.getElementById("botonSiguiente");
      siguienteBoton.focus();
    } //Agregamos 1 tabla al usuario.


    if (Alumno.ultima_tabla_multiplicar == num && num != 10) {
      var siguienteTabla = parseInt(Alumno.ultima_tabla_multiplicar) + 1;
      var boton = document.getElementById("botonTabla".concat(siguienteTabla));
      boton.removeAttribute("style");
      boton.removeAttribute("disabled"); //Guardamos en la base de datos.

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
    var _mensaje = document.getElementById("mensaje");

    _mensaje.setAttribute("style", "color:red");

    var _hijoMensaje = document.getElementById("mensaje").firstChild;

    var _mensajeNuevo = document.createTextNode("HAS SUSPENDIDO");

    _mensaje.replaceChild(_mensajeNuevo, _hijoMensaje);

    var _tablaMultiplicarResultados = document.getElementById("tablaMultiplicarResultados");

    var _imgAnimal = document.getElementById("imgAnimal");

    _tablaMultiplicarResultados.removeChild(_imgAnimal);

    var _botonSiguiente = document.createElement("button");

    _botonSiguiente.setAttribute("id", "botonSiguiente");

    _botonSiguiente.setAttribute("class", "botonSiguiente");

    _botonSiguiente.setAttribute("onclick", "cargaRepasarTablaMultiplicar(".concat(num, ")"));

    var _textobotonSiguiente = document.createTextNode("INTÉNTALO");

    _botonSiguiente.appendChild(_textobotonSiguiente);

    _tablaMultiplicarResultados.appendChild(_botonSiguiente);

    if (valor == 10) {
      var _siguienteBoton = document.getElementById("botonSiguiente");

      _siguienteBoton.focus();
    } //Guardamos en la base de datos.


    Alumno.aciertos = totalAciertos1;
    Alumno.fallos = totalFallos1;
    Alumno.nota = totalAciertos1;
    Alumno.tabla_multiplicar = num;
    realizarInsertAlumnoTabla();
  }
}

function realizarInsertActualizarAlumnoTabla() {
  var jsonString = JSON.stringify(Alumno);
  objetoAjax = AJAXCrearObjeto();
  objetoAjax.open('GET', 'php/insertActualizarAlumnoTablaPHP.php?Alumno=' + jsonString, true);
  objetoAjax.send();
  objetoAjax.onreadystatechange = RespuestaInsertActualizarAlumnoTabla;
}

function RespuestaInsertActualizarAlumnoTabla() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {}
}

function realizarInsertAlumnoTabla() {
  var jsonString = JSON.stringify(Alumno);
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
  var central = document.getElementById("central");
  var botonAprender = document.createElement("button");
  botonAprender.setAttribute("class", "BotonVolver");
  botonAprender.setAttribute("id", "Aprender");
  botonAprender.setAttribute("onclick", "SeccionPrincipal()");
  var textoBotonAprender = document.createTextNode("VOLVER");
  botonAprender.appendChild(textoBotonAprender);
  central.appendChild(botonAprender);
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("Listado de resultados por alumno");
  h2.appendChild(texto);
  central.appendChild(h2);
  var divAprender = document.createElement("div");
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
    var central = document.getElementById('seccionListado');
    var tabla = document.createElement("table");
    central.appendChild(tabla);
    var thead = document.createElement("thead");
    tabla.appendChild(thead);
    var fila1 = document.createElement("tr");
    thead.appendChild(fila1);
    var th = document.createElement("th");
    var thTexto = document.createTextNode("ID ALUMNO");
    th.appendChild(thTexto);
    fila1.appendChild(th);
    var th2 = document.createElement("th");
    var th2Texto = document.createTextNode("NOMBRE");
    th2.appendChild(th2Texto);
    fila1.appendChild(th2);
    var th3 = document.createElement("th");
    var th3Texto = document.createTextNode("TABLA DE  MULTIPLICAR");
    th3.appendChild(th3Texto);
    fila1.appendChild(th3);
    var th4 = document.createElement("th");
    var th4Texto = document.createTextNode("NOTA MÁXIMA");
    th4.appendChild(th4Texto);
    fila1.appendChild(th4);
    var tbody = document.createElement("tbody");
    tabla.appendChild(tbody);

    for (var i = 0; i < array.length; i++) {
      var fila2 = document.createElement("tr");
      tbody.appendChild(fila2);
      var td2 = document.createElement("td");
      var td2Texto = document.createTextNode(array[i].id_alumno);
      td2.appendChild(td2Texto);
      fila2.appendChild(td2);
      var td2_1 = document.createElement("td");
      var td2_1Texto = document.createTextNode(array[i].nombre);
      td2_1.appendChild(td2_1Texto);
      fila2.appendChild(td2_1);
      var td2_2 = document.createElement("td");
      var td2_2Texto = document.createTextNode(array[i].tabla_multiplicar);
      td2_2.appendChild(td2_2Texto);
      fila2.appendChild(td2_2);
      var td2_3 = document.createElement("td");
      var td2_3Texto = document.createTextNode(array[i].nota);
      td2_3.appendChild(td2_3Texto);
      fila2.appendChild(td2_3);
    }

    var imgListado = document.createElement("img");
    imgListado.setAttribute("id", "imgListado");
    imgListado.setAttribute("src", "img/tablas-multi.jpg");
    central.appendChild(imgListado);
  }
}