const tagFormCrearArticulo = document.getElementById("idMainFormularioCrear");
const tagMainResultados = document.getElementById("idMainResultadosArtCreado");
const tagMainContenedorResultadosArtCreado = document.getElementById("idMainContenedorResultadosArtCreado");
const tagMainResultadosNuevo = document.getElementById("idMainResultadosArtCreado");
const tagInputCrearArticuloPrecio = document.getElementById("idCrearArticuloPrecio");
const tagSelectCrearArticuloCategoria = document.getElementById("idCrearArticuloCategoria");
const tagInputCrearArticuloMarca = document.getElementById("idCrearArticuloMarca");
const tagInputCrearArticuloNombre = document.getElementById("idCrearArticuloNombre");
const tagInputCrearArticuloCodigo = document.getElementById("idCrearArticuloCodigo");
const tagInputCrearArticuloImagen = document.getElementById("idCrearArticuloImagen");
const urlPathImagesCarga = "../assets/img/";


function guardarDatosFormulario(){
  let imagenName;
  if (tagInputCrearArticuloImagen) {    
    const imagen = tagInputCrearArticuloImagen.files[0];
    if (imagen) {
      imagenName = imagen.name;
    } else {        
      imagenName = "00-sin-imagen.webp";
    };
  };
  const valores = 
  {
    codigo: document.getElementById("idCrearArticuloCodigo").value,
    nombre: document.getElementById("idCrearArticuloNombre").value,
    marca: document.getElementById("idCrearArticuloMarca").value,
    categoria: document.getElementById("idCrearArticuloCategoria").value,
    precio: parseFloat(document.getElementById("idCrearArticuloPrecio").value),
    imagen: imagenName
  }
  localStorage.setItem("articuloFormulario", JSON.stringify(valores));
};

function agregarArticuloNuevosListeners() {
  if (articulosNuevos.length > 0) {
     articulosNuevos.forEach(articulo => {
      const botonEliminarNuevo = document.getElementById("idResultadosBotonAgregarArtNuevo"+articulo.id);
      botonEliminarNuevo.addEventListener("click", (e) => {
          e.preventDefault();
          const tadArticuloNuevo = document.getElementById("idArticuloNuevo"+articulo.id);

          listaPrecioArticulos = listaPrecioArticulos.filter((articulon) => articulon.id != articulo.id);
          localStorage.setItem("listaPrecioArticulos", JSON.stringify(listaPrecioArticulos));

          carritoCompras = carritoCompras.filter((articulon) => articulon.id != articulo.id);
          localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));

          articulosDisponibles = articulosDisponibles.filter((articulon) => articulon.id != articulo.id);
          localStorage.setItem("articulosDisponibles", JSON.stringify(articulosDisponibles));

          articulosNuevos = articulosNuevos.filter((articulon) => articulon.id != articulo.id);
          localStorage.setItem("articulosNuevos", JSON.stringify(articulosNuevos));

          tagMainResultadosNuevo.removeChild(tadArticuloNuevo);
      });    
    });
  };  
};

function cargarDatosStorage(){
  datosStorageListaPrecios();
  datosStorageArticulosDisponibles();
  datosStorageArticulosNuevos();
};

function cargarArticulo(e){
  e.preventDefault();
  
  cargarDatosStorage();
  const selectCategoria = localStorage.getItem("idSelectCategoria");
  const codigo = document.getElementById("idCrearArticuloCodigo").value;
  const nombre = document.getElementById("idCrearArticuloNombre").value;
  const marca = document.getElementById("idCrearArticuloMarca").value;
  const categoria = document.getElementById("idCrearArticuloCategoria").value;
  const precio = document.getElementById("idCrearArticuloPrecio").value;
  const tagInputCrearArticuloImagen = document.getElementById("idCrearArticuloImagen");
  let imagenName;
  if (tagInputCrearArticuloImagen) {    
    const imagen = tagInputCrearArticuloImagen.files[0];
    if (imagen) {
      imagenName = imagen.name;
   } else {
      imagenName = "00-sin-imagen.webp";
   };
  }; 
    
  if (listaPrecioArticulos.some(articulo => articulo.codigo.toUpperCase() == codigo.toUpperCase() )){
     crearMensajeToast("Ya existe un articulo con ese codigo");
  } else if (listaPrecioArticulos.some(articulo => articulo.nombre.toUpperCase() == nombre.toUpperCase() )){
     crearMensajeToast("Ya existe un articulo con ese nombre");
  } else {
     //const id = listaPrecioArticulos.length + 1;  
     const id = listaPrecioArticulos.length === 0 ? 1
                : listaPrecioArticulos.reduce((valorMaximo, articulo) => {(articulo.id>valorMaximo?articulo.id:valorMaximo)},0 ) +1;
     const articuloNuevo = new Articulo(id, 
                                        codigo.toUpperCase(), 
                                        nombre.toUpperCase(), 
                                        marca.toUpperCase(), 
                                        categoria.toUpperCase(), 
                                        parseFloat(precio),
                                        imagenName);
     const elementoNuevo = {
           id: articuloNuevo.id, 
           codigo: articuloNuevo.codigo,
           nombre: articuloNuevo.nombre,
           marca: articuloNuevo.marca,
           categoria: articuloNuevo.categoria,
           precio: articuloNuevo.precio,
           imagen: articuloNuevo.imagen
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

     if (selectCategoria === elementoNuevo.categoria || (selectCategoria === "")) {
        articulosDisponibles.push({...articuloDisponibleNuevo})
        localStorage.setItem("articulosDisponibles", JSON.stringify(articulosDisponibles));
     }
     
     localStorage.removeItem("articuloFormulario");
     document.getElementById("idCrearArticuloCodigo").value = "";
     document.getElementById("idCrearArticuloNombre").value = "";
     document.getElementById("idCrearArticuloMarca").value = "";
     document.getElementById("idCrearArticuloCategoria").value = "";
     document.getElementById("idCrearArticuloPrecio").value = "";
     document.getElementById("idCrearArticuloImagen").value = "";
     /*if (document.getElementById("idCrearArticuloImagen").files[0]) {
         document.getElementById("idCrearArticuloImagen").files[0]  = "";
     }*/

     renderizarArticulosNuevos();
     agregarArticuloNuevosListeners();
     crearMensajeToast("El articulo se creo satisfactoriamente");
  }  
} 

function renderizarArticulosNuevos(){
   if (tagMainResultadosNuevo) {
      tagMainResultadosNuevo.innerHTML = ``;
      if (articulosNuevos.length > 0 ){
          articulosNuevos.forEach(articulo => {
            const tagArticuloNuevo = document.createElement("div");
            tagMainResultadosNuevo.appendChild(tagArticuloNuevo);
            tagArticuloNuevo.id = "idArticuloNuevo"+articulo.id;
            tagArticuloNuevo.className = "articuloNuevo";
            let contenidoHtml = ` 
                       <div class="contenedorCard">
                          <div class="contenedorCardDatos">
                            <div class="contenedorCardImagen">
                                <img src="${urlPathImagesCarga}${articulo.imagen}" class="cardImagen">
                            </div>
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
              tagArticuloNuevo.innerHTML = contenidoHtml;
            });
   };
  };
};

function inicioCarga(){
   datosStorageListaPrecios();
   datosStorageCarritoCompras();
   datosStorageArticulosDisponibles();
   datosStorageArticulosNuevos();
   renderizarArticulosNuevos();
   agregarArticuloNuevosListeners();
};

inicioCarga();

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
tagSelectCrearArticuloCategoria.addEventListener("change",guardarDatosFormulario);
tagInputCrearArticuloPrecio.addEventListener("input",guardarDatosFormulario);
tagInputCrearArticuloImagen.addEventListener("change",guardarDatosFormulario);