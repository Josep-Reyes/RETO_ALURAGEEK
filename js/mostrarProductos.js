import { conectaAPI } from "./conectaAPI.js";

const lista = document.querySelector("[data-lista]");
const formulario = document.querySelector('[data-formulario]');
const btnLimpiar = document.querySelector('input[type="button"][value="Limpiar"]');

btnLimpiar.addEventListener('click', function() {
    formulario.reset();
});

//validaciones


export default function construyeCard(id, precio, nombre, imagen) {
    const producto = document.createElement("li");
    producto.className = "videos__item";

    producto.innerHTML = `<card class="card-estilo">
    <img class="card-imagen" src="${imagen}" alt="Sin Imagen :c">
        <div class="descripcion-video">
            <h3>${nombre}</h3>
            <p>${precio}</p>
            <img src="../img/delete.png" alt="Imagen Delete" data-id="${id}" class="btn-eliminar">
        </div>
        </card>`
    return producto;
}


async function listaProductos() {
    try{
        const listaAPI = await conectaAPI.listaProductos();
        listaAPI.forEach(element => lista.appendChild(construyeCard(element.id,element.precio, element.nombre, element.imagen)));
        agregarListenersEliminar();
    }catch{
        lista.innerHTML=`<h2 class="mensaje__titulo">No fue posible cargar la lista de productos</h2>`;
    }
}

listaProductos();

function agregarListenersEliminar() {
    const btnEliminar = document.querySelectorAll('.btn-eliminar');
btnEliminar.forEach(function(btn) {
btn.addEventListener('click', async function(e) {

    console.log(e)
    const btnEliminar = e.target; 
    const id = btnEliminar.getAttribute('data-id')
    try{
        await conectaAPI.eliminarProducto(id)
        window.location.href="../index.html"
    }catch(e){
        alert(e);
    }
});
});
};


async function crearVideo(evento){
    evento.preventDefault();
    const imagen= document.querySelector("[data-imagen]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    try{
        await conectaAPI.crearProducto(nombre,precio,imagen)
    
        window.location.href="../index.html"
    }catch(e){
        alert(e);
    }
}

formulario.addEventListener("submit",evento=>crearVideo(evento));