//hago referencia a la etiqueta <a> del navbar con id =home
let home=document.getElementById("home");

//agrego el evento del click a home y llama a la funcion cargarPagHome
home.addEventListener("click",cargarPagHome);

let pag2=document.getElementById('pag2');
pag2.addEventListener("click",cargarPag2);
let pag3=document.getElementById("pag3");
pag3.addEventListener("click",cargarPag3);





//este fetch carga automaticamente cuando se abre el 
let miInit = { mode: 'no-cors'};// esto por un error del navegador 
fetch("http://localhost/ejemplo-parcial-render/pages/home.html",miInit).then(
  function(response){
    response.text().then(
  function(texto){
    document.getElementById("cuerpo").innerHTML = texto;
    
  }
);
  }
);


//invoca a la funcion mostrar pagina con el string de la pagina correspondiente
function cargarPagHome(event)
{let pagina="home"; mostrarpagina(pagina);
}
function cargarPag2(event)
{let pagina="pagina2"; mostrarpagina(pagina);
}
function cargarPag3(event)
{let pagina="pagina3"; mostrarpagina(pagina);
}

//funcion que guarda el div con id cuerpo en la variable container ,despues hace un fetch 
//concatenendo el string por parametro ,response es todo el contenido del archivo hubicado en la 
//url del fetch  
function mostrarpagina(pagina)
{
let container = document.getElementById("cuerpo");
container.innerHTML = "<h1>Loading...</h1>";
let miInit = { mode: 'no-cors'};
fetch("http://localhost/ejemplo-parcial-render/pages/"+pagina+".html",miInit).then(
function(response){
    if (response.ok) {
      response.text().then(t => container.innerHTML = t);//t es el contenido del archivo html en formato de string y inserto dentro del div del index
          }
          else
           container.innerHTML = "<h1>Error - Failed URL!</h1>";//si hay un error en el fetch
})
.catch(function(response){
  container.innerHTML = "<h1>Error - Conection Failed!</h1>";//si hay un error en el fetch
});
}



