//  Abrir barra de comentarios con anchura 25%
function openNav() {
    document.getElementById("myComments").style.width = "25%";
}

//  Cerrar barra de comentarios con anchura 0%
function closeNav() {
    document.getElementById("myComments").style.width = "0%";
}

//  Añadir comentarios
function addComentario(event){
    event.preventDefault();
    var nombre = document.getElementById('name');
    var mail = document.getElementById('mail');
    var comentario = document.getElementById('msg');

    if(nombre.value.length == 0 || mail.value.length == 0 || comentario.value.length == 0){
        alert("Comprueba que los campos obligatorios esten rellenos");
        return false;
    }

    if(!emailValido(mail)){
        alert("El email no es válido");
        return false
    }

    //  Una vez comprobados los campos y que el email tiene el formato adecuado, insertamos el comentario
    var fecha = (new Date()).toLocaleString('es-ES', {timeZone: 'Europe/Madrid'});
    var lista = document.getElementsByClassName('lista_comentarios');

    lista[0].insertAdjacentHTML('beforeend', "\n" + 
    "<div class=\"comentario\">\n"+
    "   <h4>\n" +
    "      "+nombre.value+":\n"+
    "   </h4>\n"+
    "   <p class=\"texto_comentario\">\n" +
    "      "+comentario.value+"\n" +
    "   </p>\n" +
    "   <p class=\"fecha_comentario\">\n" +
    "      "+fecha+"\n" +
    "   </p>" +
    "</div>"
    );

    return false;
}

function vacio(campo) {
    var vacio = false;
    if(campo.value.trim() == "" || value === null || value === undefined) {
        vacio = true;
    }
    return vacio;
}

function emailValido(mail){
    var res = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(mail.value).toLowerCase());
}

palabraAux = "";
index = 0;
var palabras_censuradas = [
    "puta",
    "mierda",
    "timo",
    "estafa",
    "inutil",
    "ridiculo",
    "estafa",
    "tonto",
    "pagar"
];

function censurar(event){
    //  Comprobamos cada palabra cada vez que se pulsa el espacio
    var tecla = String.fromCharCode(event.keyCode).toLowerCase();
    var res = /[a-zA-z]/;
    var mensaje = document.getElementById("msg");

    if(res.test(tecla)){
        palabraAux += tecla;
    }
    else{
        if(tecla === " " || tecla === "."){
            compruebaCensura(palabraAux);
            palabraAux = "";
        }
        if(event.keyCode === 8){
            palabraAux = palabraAux.substring(0, palabraAux.length - 1);
        }
    }

    index = mensaje.value.length;
}

function compruebaCensura(palabra){
    for(var i = 0; i < palabras_censuradas.length; i++){
        if(palabra === palabras_censuradas[i]){
            censura(palabra);
        }
    }
}

function censura(palabra){
    var mensaje = document.getElementById("msg");
    var aux= "";

    for(var i = 0; i < palabra.length; i++){
        aux += "*";
    }

    var nuevomsj = mensaje.value.substring(0, index - palabra.length) + aux + " ";

    mensaje.value = nuevomsj;
}