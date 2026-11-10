
function guardarDatosFormulario(){
  const valores = 
  {
    codigo: document.getElementById("idCrearArticuloCodigo").value,
    nombre: document.getElementById("idCrearArticuloNombre").value,
    marca: document.getElementById("idCrearArticuloMarca").value,
    categoria: document.getElementById("idCrearArticuloCategoria").value,
    precio: document.getElementById("idCrearArticuloPrecio").value
  }
  localStorage.setItem("articuloFormulario", JSON.stringify(valores));
}

function agregarCardArticuloNuevo(articulo) {
     // 
     const tagMainResultados = document.getElementById("idMainResultadosArtCreado");
     let   tagDivArticulo = document.createElement('div')
        tagDivArticulo.id = "idArticuloNuevo"+articulo.id;
        tagDivArticulo.className ="articuloNuevo";
        tagMainResultados.appendChild(tagDivArticulo);
        //      
        contenidoHtml = ` <div class="contenedorCard">
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
                                <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">$${parseInt(articulo.precio)}</p>  
                            </div>
                          </div>
                          <div class="contenedorCardDatosBoton">
                            <button id="idResultadosBotonAgregarArtNuevo${articulo.id}" class="buttonCard">ELIMINAR</button>
                          </div>  
                        </div>
                        `;
        //
        tagDivArticulo.innerHTML = contenidoHtml;
        const botonEliminarNuevo = document.getElementById("idResultadosBotonAgregarArtNuevo"+articulo.id);
        botonEliminarNuevo.addEventListener("click", (e) => {
            e.preventDefault();
            const tagMainResultadosNuevo = document.getElementById("idMainResultadosArtCreado");
            const tadIdArticuloNuevo = document.getElementById("idArticuloNuevo"+articulo.id);
            listaPrecioArticulos = listaPrecioArticulos.filter((articulon) => articulon.id != articulo.id);
            localStorage.setItem("listaPrecioArticulos", JSON.stringify(listaPrecioArticulos));
            articulosEncontrados = articulosEncontrados.filter((articulon) => articulon.id != articulo.id);
            localStorage.setItem("articulosEncontrados", JSON.stringify(articulosEncontrados));
            tagMainResultadosNuevo.removeChild(tadIdArticuloNuevo);           

        })
        //   
}

function cargarArticulo(e){
  //
  e.preventDefault();
  datosStorageListaPrecios();
  datosStorageArticulosEncontrados();
  const cat = localStorage.getItem("idBuscarArticuloCategoria");
  //
  const codigo = document.getElementById("idCrearArticuloCodigo").value;
  const nombre = document.getElementById("idCrearArticuloNombre").value;
  const marca = document.getElementById("idCrearArticuloMarca").value;
  const categoria = document.getElementById("idCrearArticuloCategoria").value;
  const precio = document.getElementById("idCrearArticuloPrecio").value;
  //
  if (listaPrecioArticulos.some(articulo => articulo.codigo.toUpperCase() == codigo.toUpperCase() )){
     crearMensajeTransaccionToast("Ya existe un articulo con ese codigo");
  } else if (listaPrecioArticulos.some(articulo => articulo.nombre.toUpperCase() == nombre.toUpperCase() )){
     crearMensajeTransaccionToast("Ya existe un articulo con ese nombre");
  } else {
     //
     const id = listaPrecioArticulos.length + 1;  
     //
     const articuloNuevo = new Articulo(id, 
                                        codigo.toUpperCase(), 
                                        nombre.toUpperCase(), 
                                        marca.toUpperCase(), 
                                        categoria.toUpperCase(), 
                                        parseFloat(precio));
     //
     const elementoNuevo = {
           id: articuloNuevo.id, 
           codigo: articuloNuevo.codigo,
           nombre: articuloNuevo.nombre,
           marca: articuloNuevo.marca,
           categoria: articuloNuevo.categoria,
           precio: articuloNuevo.precio
     };
     //
     listaPrecioArticulos.push(elementoNuevo);
     //
     localStorage.setItem("listaPrecioArticulos", JSON.stringify(listaPrecioArticulos));
     //
     console.log("en cargar articulo-cat: " + cat)
     console.log("en cargar articulo-typeof cat: " + typeof cat)
     //console.log("en cargar articulo-cat.length: " + cat.length)
     if (cat == elementoNuevo.categoria || (cat == null)) {
        console.log("en cargar articulo-entro en el if") 
        articulosEncontrados.push(elementoNuevo)
        localStorage.setItem("articulosEncontrados", JSON.stringify(articulosEncontrados));
     }
     localStorage.removeItem("articuloFormulario");
     //
     document.getElementById("idCrearArticuloCodigo").value = "";
     document.getElementById("idCrearArticuloNombre").value = "";
     document.getElementById("idCrearArticuloMarca").value = "";
     document.getElementById("idCrearArticuloCategoria").value = "";
     document.getElementById("idCrearArticuloPrecio").value = "";
     //
     agregarCardArticuloNuevo(elementoNuevo);
     crearMensajeTransaccionToast("El articulo se creo satisfactoriamente");
     //
  }
  //
} 


const tagFormCrearArticulo = document.getElementById("idMainFormularioCrear");
tagFormCrearArticulo.addEventListener("submit", cargarArticulo);
