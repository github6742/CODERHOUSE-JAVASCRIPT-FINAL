// declaracion de variables de elementos del index.html
const tagMainContenedor = document.getElementById("idMainContenedor");
const tagMainContenedorElementos = document.getElementById("idMainContenedorElementos");
const tagBuscarArticuloCategoria = document.getElementById("idBuscarArticuloCategoria");
const tagMainContenedorResultados = document.getElementById("idMainContenedorResultados");
const tagMainResultados = document.getElementById("idMainResultados");
const tagTituloBotonesCarrito = document.getElementById("idTituloBotonesCarrito");
const tagMainContenedorCarritoComprasBotones = document.getElementById("idMainContenedorCarritoComprasBotones");
const tagMainCarritoComprasBotones = document.getElementById("idMainCarritoComprasBotones");
const tagBotonVerCarritoCompras = document.getElementById("idBotonVerCarritoCompras");
const tagBotonOcultarCarritoCompras = document.getElementById("idBotonOcultarCarritoCompras");
const tagBotonVaciarCarritoCompras = document.getElementById("idBotonVaciarCarritoCompras");
const tagBotonConfirmarCarritoCompras = document.getElementById("idBotonConfirmarCarritoCompras");
const tagMainContenedorCarritoCompras = document.getElementById("idMainContenedorCarritoCompras");
const tagTotalCarrito = document.getElementById("idTotalCarrito");
const tagMainCarritoCompras = document.getElementById("idMainCarritoCompras");

//obtiene los articulos
function obtenerArticulosDisponiblesDatosFiltros(){
  if (tagBuscarArticuloCategoria) {
     let listaFiltro = [];
     let articuloDisponible = {};

     const categoria = tagBuscarArticuloCategoria.value.toUpperCase();
     listaFiltro = (categoria.length === 0) ? [...listaPrecioArticulos] :
                   listaPrecioArticulos.filter(articulo => articulo.categoria.toUpperCase().includes(categoria.toUpperCase()));

     listaFiltro.forEach(articulo =>{
             articuloDisponible = {
               ...articulo,
               cantidad: 1
             };
             articulosDisponibles.push(articuloDisponible);
          });
     localStorage.setItem("articulosDisponibles",JSON.stringify(articulosDisponibles));
  };
};

function obtenerArticulosDisponiblesDatos(){   
  let articuloDisponible = {};
  //inicio
  if (articulosDisponibles.length === 0) {
      listaPrecioArticulos.forEach(articulo => {
        articuloDisponible = {
            ...articulo,
            cantidad: 1
        };
        articulosDisponibles.push(articuloDisponible);
      }); 
      localStorage.setItem("articulosDisponibles",JSON.stringify(articulosDisponibles));
  };
};

function agregarArticulosDisponiblesHtml(){
  if (tagMainResultados) {
     tagMainResultados.innerHTML = ``;
     let contenidoHtml;

     articulosDisponibles.forEach(articulo => {
       const tagArticuloDisponible = document.createElement("div");
       tagArticuloDisponible.id = "idArticuloDisponible"+articulo.id;
       tagArticuloDisponible.className = "articuloDisponible";
       tagMainResultados.appendChild(tagArticuloDisponible);

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
                                <p class="cardDatosFilaEtiqueta">Categoria:</p><p class="cardDatosFilaValor">${articulo.categoria.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">${formatearImporte(articulo.precio)}</p>  
                            </div>
                          </div>
                         <div id="idContenedorCardCantidad${articulo.id}" class="contenedorCardCantidad">                                        
                              <div class="contenedorElementosCardCantidad">
                                <button id="idBotonRestar${articulo.id}" class="botonCantidad">-</button>
                                <span id="idCantidadSpan${articulo.id}" class="spanCantidad">${articulo.cantidad}</span>
                                <button id="idBotonSumar${articulo.id}" class="botonCantidad">+</button>
                              </div>                              
                         </div>
                          <div class="contenedorCardDatosFila">
                              <p id="idTotalArticuloDisponible${articulo.id}" class="labelCard">Total: ${formatearImporte(articulo.cantidad*articulo.precio)}</p>
                          </div>
                          <div class="contenedorCardDatosBoton">
                            <button id="idBotonAgregarArticuloDisponible${articulo.id}" class="buttonCard">AGREGAR</button>
                          </div>  
                        </div>
                        `;
        tagArticuloDisponible.innerHTML = contenidoHtml;
     });
   };
}; 

function cambiarCantidad(articuloId, cantidad){
  const tagCantidad = document.getElementById("idCantidadSpan"+articuloId);  
  const articulo = articulosDisponibles.find(articulo => articulo.id === articuloId);
  let cantidadActual = Number(articulo.cantidad);
  if (tagCantidad) {
     console.log("cantidadActual: " + cantidadActual);
     if (cantidadActual === 1 && cantidad === -1) {
        cantidadActual = 1;
     } else {
        cantidadActual += cantidad;
     };
     articulo.cantidad = Number(cantidadActual);
     tagCantidad.innerHTML = Number(cantidadActual);
     localStorage.setItem("articulosDisponibles",JSON.stringify(articulosDisponibles))
  };
};

function agregarArticulosDisponiblesListeners(){
  let tagBotonAgregar;
  let tagBotonRestarCantidad;
  let tagBotonSumarCantidad;

  articulosDisponibles.forEach(articulo => {  

    tagBotonAgregar = document.getElementById("idBotonAgregarArticuloDisponible"+articulo.id);
    (tagBotonAgregar) && (tagBotonAgregar.addEventListener("click", (e) => {e.preventDefault();agregarAlCarrito(articulo.id)}));    

    tagBotonRestarCantidad = document.getElementById("idBotonRestar"+articulo.id);
    (tagBotonRestarCantidad) && (tagBotonRestarCantidad.addEventListener("click", (e) => {e.preventDefault();cambiarCantidad(articulo.id,-1)}));  

    tagBotonSumarCantidad = document.getElementById("idBotonSumar"+articulo.id);
    (tagBotonSumarCantidad) && (tagBotonSumarCantidad.addEventListener("click", (e) => {e.preventDefault();cambiarCantidad(articulo.id,1)})); 

  });
  
} 

function renderizarArticulosDisponibles(){
  obtenerArticulosDisponiblesDatos();
  agregarArticulosDisponiblesHtml();
  agregarArticulosDisponiblesListeners();
};

async function inicioCompras(){
  if (localStorage.getItem("inicioModulo") == "NO" || localStorage.getItem("inicioModulo") == null) {
     await inicioModulo();
  }

  datosStorageListaPrecios();
  datosStorageCarritoCompras();
  datosStorageArticulosDisponibles();

  document.getElementById("idBuscarArticuloCategoria").value = localStorage.getItem("idBuscarArticuloCategoria") || "";
  //buscarArticulosHtml(articulosEncontrados);

  renderizarArticulosDisponibles();

  if (localStorage.getItem("carritoComprasOculto") == "NO" || localStorage.getItem("carritoComprasOculto") == null) {
     //verCarritoCompras();
     //renderizarCarritoCompras();
     console.log("renderizar carrito Compras")
  };

};

inicioCompras();