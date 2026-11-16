//
const tagFormCrearArticulo = document.getElementById("idMainFormularioCrear");
const tagMainResultados = document.getElementById("idMainResultadosArtCreado");
const tagMainResultadosNuevo = document.getElementById("idMainResultadosArtCreado");
const tagInputCrearArticuloPrecio = document.getElementById("idCrearArticuloPrecio");
const tagInputCrearArticuloCategoria = document.getElementById("idCrearArticuloCategoria");
const tagInputCrearArticuloMarca = document.getElementById("idCrearArticuloMarca");
const tagInputCrearArticuloNombre = document.getElementById("idCrearArticuloNombre");
const tagInputCrearArticuloCodigo = document.getElementById("idCrearArticuloCodigo");
//
function guardarDatosFormulario(){
  const valores = 
  {
    codigo: document.getElementById("idCrearArticuloCodigo").value,
    nombre: document.getElementById("idCrearArticuloNombre").value,
    marca: document.getElementById("idCrearArticuloMarca").value,
    categoria: document.getElementById("idCrearArticuloCategoria").value,
    precio: parseFloat(document.getElementById("idCrearArticuloPrecio").value)
  }
  localStorage.setItem("articuloFormulario", JSON.stringify(valores));
}

function agregarCardArticuloNuevo(articulo) {
  let contenidoHtml;
  let tagDivArticulo = document.createElement('div')
  tagDivArticulo.id = "idArticuloNuevo"+articulo.id;
  tagDivArticulo.className ="articuloNuevo";
  tagMainResultados.appendChild(tagDivArticulo);

  contenidoHtml = ` 
                       <div class="contenedorCard">
                          <div class="contenedorCardDatos">
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Id:</p><p class="cardDatosFilaValor">${articulo.id}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Codigo:</p><p class="cardDatosFilaValor">${articulo.codigo.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Nombre:</p><p class="cardDatosFilaValor">${articulo.nombre.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Marca:</p><p class="cardDatosFilaValor">${articulo.marca.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Categoria:</p><p class="cardDatosFilaValor">${articulo.categoria.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">${formatearImporte(articulo.precio)}</p>  
                            </div>
                          </div>
                          <div class="contenedorCardDatosBoton">
                            <button id="idResultadosBotonAgregarArtNuevo${articulo.id}" class="buttonCard">ELIMINAR</button>
                          </div>  
                        </div>
  `;
  tagDivArticulo.innerHTML = contenidoHtml;

  const botonEliminarNuevo = document.getElementById("idResultadosBotonAgregarArtNuevo"+articulo.id);
  botonEliminarNuevo.addEventListener("click", (e) => {
    e.preventDefault();
    const tadIdArticuloNuevo = document.getElementById("idArticuloNuevo"+articulo.id);
    
    listaPrecioArticulos = listaPrecioArticulos.filter((articulon) => articulon.id != articulo.id);
    localStorage.setItem("listaPrecioArticulos", JSON.stringify(listaPrecioArticulos));
    
    articulosDisponibles = articulosDisponibles.filter((articulon) => articulon.id != articulo.id);
    localStorage.setItem("articulosDisponibles", JSON.stringify(articulosDisponibles));
    
    articulosNuevos = articulosNuevos.filter((articulon) => articulon.id != articulo.id);
    localStorage.setItem("articulosNuevos", JSON.stringify(articulosNuevos));
    
    tagMainResultadosNuevo.removeChild(tadIdArticuloNuevo);
  });
}

function cargarArticulo(e){
  e.preventDefault();
  datosStorageListaPrecios();
  datosStorageArticulosDisponibles();
  
  const cat = localStorage.getItem("idBuscarArticuloCategoria");
  const codigo = document.getElementById("idCrearArticuloCodigo").value;
  const nombre = document.getElementById("idCrearArticuloNombre").value;
  const marca = document.getElementById("idCrearArticuloMarca").value;
  const categoria = document.getElementById("idCrearArticuloCategoria").value;
  const precio = document.getElementById("idCrearArticuloPrecio").value;
  
  if (listaPrecioArticulos.some(articulo => articulo.codigo.toUpperCase() == codigo.toUpperCase() )){
     crearMensajeTransaccionToast("Ya existe un articulo con ese codigo");
  } else if (listaPrecioArticulos.some(articulo => articulo.nombre.toUpperCase() == nombre.toUpperCase() )){
     crearMensajeTransaccionToast("Ya existe un articulo con ese nombre");
  } else {
     const id = listaPrecioArticulos.length + 1;  
     const articuloNuevo = new Articulo(id, 
                                        codigo.toUpperCase(), 
                                        nombre.toUpperCase(), 
                                        marca.toUpperCase(), 
                                        categoria.toUpperCase(), 
                                        parseFloat(precio));
     const elementoNuevo = {
           id: articuloNuevo.id, 
           codigo: articuloNuevo.codigo,
           nombre: articuloNuevo.nombre,
           marca: articuloNuevo.marca,
           categoria: articuloNuevo.categoria,
           precio: articuloNuevo.precio
     };
  
     listaPrecioArticulos.push(elementoNuevo);
     localStorage.setItem("listaPrecioArticulos", JSON.stringify(listaPrecioArticulos));
     elementoNuevo.cantidad = 1;
     articulosNuevos.push(elementoNuevo);
     localStorage.setItem("articulosNuevos", JSON.stringify(articulosNuevos));

     let articuloDisponibleNuevo = {
      ...elementoNuevo,
      cantidad: 1
     };

     if (cat == elementoNuevo.categoria || (cat == null)) {
        articulosDisponibles.push(articuloDisponibleNuevo)
        localStorage.setItem("articulosDisponibles", JSON.stringify(articulosDisponibles));
     }
     
     localStorage.removeItem("articuloFormulario");
     document.getElementById("idCrearArticuloCodigo").value = "";
     document.getElementById("idCrearArticuloNombre").value = "";
     document.getElementById("idCrearArticuloMarca").value = "";
     document.getElementById("idCrearArticuloCategoria").value = "";
     document.getElementById("idCrearArticuloPrecio").value = "";

     agregarCardArticuloNuevo(elementoNuevo);
     crearMensajeTransaccionToast("El articulo se creo satisfactoriamente");
  }  
} 

const articuloFormulario = JSON.parse(localStorage.getItem("articuloFormulario")) || {};
document.getElementById("idCrearArticuloCodigo").value = articuloFormulario.codigo || "";
document.getElementById("idCrearArticuloNombre").value = articuloFormulario.nombre || "";
document.getElementById("idCrearArticuloMarca").value = articuloFormulario.marca || "";
document.getElementById("idCrearArticuloCategoria").value = articuloFormulario.categoria || "";
document.getElementById("idCrearArticuloPrecio").value = articuloFormulario.precio || "";

tagFormCrearArticulo.addEventListener("submit", cargarArticulo);
tagInputCrearArticuloCodigo.addEventListener("input", guardarDatosFormulario);
tagInputCrearArticuloNombre.addEventListener("input",guardarDatosFormulario);
tagInputCrearArticuloMarca.addEventListener("input",guardarDatosFormulario);
tagInputCrearArticuloCategoria.addEventListener("input",guardarDatosFormulario);
tagInputCrearArticuloPrecio.addEventListener("input",guardarDatosFormulario);