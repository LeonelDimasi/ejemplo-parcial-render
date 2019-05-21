document.addEventListener("DOMContentLoaded",loading);
function loading(){
  "use strict";

  //carga el home.index automaticamante al abrir la pagina
  fetch("https://localhost/mundial%202018/home.html").then(
    function(response){
      response.text().then(
        function(texto){ document.querySelector("#body").innerHTML = texto;});
      }
    );

    //asignamos a los id del nav el evento del click y su funcion
    let jsloads2 = document.querySelectorAll(".estadios");
    jsloads2.forEach(e=> e.addEventListener("click",loadEstadios));
    let jsloads3 = document.querySelectorAll(".grupos");
    jsloads3.forEach(e=> e.addEventListener("click",loadGrupos));
    let jsloads4 = document.querySelectorAll(".fixture");
    jsloads4.forEach(e=> e.addEventListener("click",loadFixture));
    let jsloads5 = document.querySelectorAll(".encuesta");
    jsloads5.forEach(e=> e.addEventListener("click",loadEncuesta));
    let jsloads = document.querySelectorAll(".home");
    jsloads.forEach(e=> e.addEventListener("click",loadHome));

    //funciones para mostrar cada parte del navbar
    function loadFixture(event)
    {let pagina="fixture"; mostrarpagina(pagina);
  }
  function loadGrupos(event)
  {let pagina="grupos"; mostrarpagina(pagina);
}
function loadEncuesta(event)
{let pagina="encuesta";mostrarpagina(pagina);
}
function loadHome(event)
{let pagina="home";mostrarpagina(pagina);
}
function loadEstadios(event)
{ let pagina="estadios";mostrarpagina(pagina);
}
// funcion mostrarpagina recibe un string con el nombre del archivo index a cargar y lo carga.
function mostrarpagina(pagina)
{
  event.preventDefault();
  let container = document.querySelector("#body");
  container.innerHTML = "<h1>Loading...</h1>";
  fetch("https://localhost/mundial%202018/"+pagina+".html?").then(
    function(response){
      if (response.ok) {
        response.text().then(processText);

      }
      else
      container.innerHTML = "<h1>Error - Failed URL!</h1>";
    })
    .catch(function(response){
      container.innerHTML = "<h1>Error - Conection Failed!</h1>";
    });
  }

  //soluciona el problema de usar el ajax rest dentro de un archivo index del parcial render
  function processText(t) {
    let container = document.querySelector("#body");
    //agrego al DOM

    container.innerHTML = t;
    load();
    //busco sobre lo que agregué y agrego evento
    container.querySelectorAll(".js-load").forEach(a=> a.addEventListener("click",load));
    container.querySelectorAll(".js-create").forEach(b=> b.addEventListener("click",create));
    container.querySelectorAll(".js-delete").forEach(c=> c.addEventListener("click",deletepartido));
    document.querySelector("#js-create").addEventListener("click",create);
    document.querySelector("#js-createx3").addEventListener("click",createx3);
  }

  //ejecuta 3 veces el boton de crear una fila
  function createx3(){
    for (let i = 0; i < 3; i++) {
      create();
    }
  }

  //mostramos la tabla automaticamente con load
  let server="http://web-unicen.herokuapp.com/api";
  let url= server+ "/groups/DimaBarra/Tespecial";
  load();

  //carga en el id resultado la tabla generada
  function load(){

    let container=document.querySelector("#resultado");

    container.innerHTML="cargando...";
    fetch(url).then(r => r.json())
    .then(json =>mostrar(container,json))
    .catch(error =>container.innerHTML = "error");


  }
  //asigna evento recorriendo el arreglo de la clase de los botones de borrar
  function asignarEventoBorrar(){
    var botones = document.querySelectorAll('.js-borrarr');
    botones.forEach(function(boton) {
      var z = boton.value;
      boton.addEventListener('click', function() {borrarfila(z); console.log("sss");});

    });
  }

  //asigna evento recorriendo el arreglo de la clase de los botones de editar
  function asignarEventoEdit(){
    var botonesEDIT = document.querySelectorAll('.js-editar');
    botonesEDIT.forEach(function(boton) {
      var z = boton.value;
      boton.addEventListener('click', function() {editarfila(z); console.log("sss");});
    });
  }

  //filtro por equipo muestra los partidos de un equipo
  function filtro() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtrito");
    filter = input.value.toUpperCase();
    table = document.getElementById("partidos");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  //genera la tabla a partir de los datos obtenidos del servidor,
  //con los correspondientes botones borrar y editar que se les pasa como valor el id de el objeto json,
  //llama a las funciones para asignar los eventos a los botones y el filtro


  function mostrar(container,json){

    let html="<table id=partidos class=table >";

    for(var i=0; i<json.Tespecial.length; i++){
      let nombre1= json.Tespecial[i].thing.nombre;
      let resul1=json.Tespecial[i].thing.goles1
      let nombre2= json.Tespecial[i].thing.nombre2;
      let resul2=json.Tespecial[i].thing.goles2;
      html+="<tr>" +"<td>"+ nombre1 +"</td>"+ "<td>"+ resul1+ "</td>" + "<td>" +  nombre2+ "</td>" + "<td>"+resul2+ "</td>";
      html+="<td>"+ "<button class=js-borrarr value='"+json.Tespecial[i]._id+"'>borrar</button>" +"</td>";
      html+="<td>"+ "<button class=js-editar value='"+json.Tespecial[i]._id+"'>editar</button>" +"</td>";
      html+="</tr>";
    }
    html+="</table>";
    container.innerHTML=html;

    asignarEventoEdit();
    asignarEventoBorrar();
    document.querySelector("#filtrito").addEventListener("click",filtro);
  }

  //captura los valores ingresados por el usuario
  // crea el objeto JSON
  //lo inserta en el servidor
  //actualiza la vista de la tabla
  function create(){

    let seleccion1=document.querySelector("#js-seleccion01").value;
    let goles1=document.querySelector("#js-goles01").value;;
    let goles2=document.querySelector("#js-goles02").value;
    let seleccion2=document.querySelector("#js-seleccion02").value;;
    let partido ={
      "nombre": seleccion1,
      "goles1":goles1,
      "goles2":goles2,
      "nombre2":seleccion2,
    }
    let objeto={
      "thing":partido
    }
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objeto)
    })
    .then(r=>{console.log(r);  load();});
  }


  //captura los valores ingresados por el usuario
  // crea el objeto JSON
  //lo edita en el servidor con el id del json pasado por parametro
  //actualiza la vista de la tabla
  function editarfila(y){
    let seleccion1=document.querySelector("#js-seleccion01").value;
    let goles1=document.querySelector("#js-goles01").value;;
    let goles2=document.querySelector("#js-goles02").value;
    let seleccion2=document.querySelector("#js-seleccion02").value;;
    let partido ={
      "nombre": seleccion1,
      "goles1":goles1,
      "goles2":goles2,
      "nombre2":seleccion2,
    }
    let objeto={
      "thing":partido
    }

    let id=y;
    let url= server+ "/groups/DimaBarra/Tespecial/" +id;
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objeto)
    })
    .then(r=>{console.log(r);load()});
  }




  //borra la fila en el servidor con el id del json pasado por parametro
  //actualiza la vista de la tabla
  function borrarfila(z){

    let id=z;
    let url= server+ "/groups/DimaBarra/Tespecial/" +id;
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(r=>{console.log(r);load()});
  }

}
