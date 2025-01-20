import { conectaAPI } from "./conectaAPI.js";
import construyeCard from "./mostrarProductos.js";

//validaciones

async function buscarProducto(evento){
    evento.preventDefault();
    const datosDeBusqueda=document.querySelector("[data-busqueda]").value;
    const busqueda= await conectaAPI.buscarProducto(datosDeBusqueda);

    const listaDeBusqueda=document.querySelector("[data-lista]");
    listaDeBusqueda.replaceChildren();

    busqueda.forEach(elemento => listaDeBusqueda.
        appendChild(construyeCard(elemento.precio,elemento.nombre,elemento.imagen)));

     if(busqueda.length===0){
        listaDeBusqueda.innerHTML=`<h2 class="mensaje__titulo">No encontramos productos para ese filtro</h2>`;
    } 
}

const botonBusqueda=document.querySelector("[data-boton-busqueda]");

botonBusqueda.addEventListener("click",evento=>buscarProducto(evento))