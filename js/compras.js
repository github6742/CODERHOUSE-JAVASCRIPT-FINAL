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

//obtiene los articulos disponibles, para el evento de filtrar por categoria
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
// obtiene los articulos disponibles al inicio del modulo
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
// agrega los card de articulos disponibles en el contenedor de resultados
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
// genera los listeners de articulos disponibles: listener de agregar al carrito y cambio de cantidad del articulo
function agregarCarritoComprasListeners(){
  let tagBotonEliminar;
  let tagBotonRestarCantidad;
  let tagBotonSumarCantidad;

  carritoCompras.forEach(articuloCC => {  

    tagBotonEliminar = document.getElementById("idBotonEliminarArticuloCC"+articuloCC.id);
    (tagBotonEliminar) && (tagBotonEliminar.addEventListener("click", (e) => { e.preventDefault();
                                                                               carritoCompras = carritoCompras.filter(articulo => articulo.id != articuloCC.id);
                                                                               localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
                                                                               renderizarCarritoCompras()
                                                                              }));    

    tagBotonRestarCantidad = document.getElementById("idBotonRestarCC"+articuloCC.id);
    (tagBotonRestarCantidad) && (tagBotonRestarCantidad.addEventListener("click", (e) => { e.preventDefault();cambiarCantidadCC(articuloCC.id,-1)}));  

    tagBotonSumarCantidad = document.getElementById("idBotonSumarCC"+articuloCC.id);
    (tagBotonSumarCantidad) && (tagBotonSumarCantidad.addEventListener("click", (e) => { e.preventDefault();cambiarCantidadCC(articuloCC.id,1)})); 

  });  
};
// render carrito compras
function renderizarCarritoCompras(){
  if (carritoCompras.length > 0 ){
    if (tagMainCarritoCompras) {
       tagMainCarritoCompras.innerHTML=``;
       carritoCompras.forEach(articulo => {
       const tagArticuloCarritoCompras = document.createElement("div");
       tagArticuloCarritoCompras.id = "idArticuloCarritoCompras"+articulo.id;
       tagArticuloCarritoCompras.className = "articuloCarritoCompras";
       tagMainCarritoCompras.appendChild(tagArticuloCarritoCompras);

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
                         <div id="idContenedorCardCantidadCC${articulo.id}" class="contenedorCardCantidad">                                        
                              <div class="contenedorElementosCardCantidad">
                                <button id="idBotonRestarCC${articulo.id}" class="botonCantidad">-</button>
                                <span id="idCantidadSpanCC${articulo.id}" class="spanCantidad">${articulo.cantidad}</span>
                                <button id="idBotonSumarCC${articulo.id}" class="botonCantidad">+</button>
                              </div>                              
                         </div>
                          <div class="contenedorCardDatosFila">
                              <p id="idTotalArticuloCC${articulo.id}" class="labelCard">Total: ${formatearImporte(articulo.cantidad*articulo.precio)}</p>
                          </div>
                          <div class="contenedorCardDatosBoton">
                            <button id="idBotonEliminarArticuloCC${articulo.id}" class="buttonCard">ELIMINAR</button>
                          </div>  
                        </div>
                        `;
        tagArticuloCarritoCompras.innerHTML = contenidoHtml;
      });  
    };
    agregarCarritoComprasListeners();
  };
};
// agrega el articulo disponible al carrito de compras
function agregarAlCarritoCompras(articuloId){
  if (carritoCompras.some(articulo => parseInt(articulo.id) === parseInt(articuloId))) {
     crearMensajeTransaccionToast("El articulo ya existe en el carrito de compras");
  } else {
    crearMensajeTransaccionToast("Agregando articulo al carrito..."); 
    const articulo = articulosDisponibles.find(articulo => articulo.id === articuloId);
    carritoCompras.push(articulo);
    localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras));    
  };    
};
// realiza el cambio de cantidad en el card de articulo disponible y en el storage de articulosDisponibles
function cambiarCantidad(articuloId, cantidad){
  const tagCantidad = document.getElementById("idCantidadSpan"+articuloId);  
  const articulo = articulosDisponibles.find(articulo => articulo.id === articuloId);
  let cantidadActual = Number(articulo.cantidad);
  if (tagCantidad) {
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
// realiza el cambio de cantidad en el card de articulo DEL CARRITO y en el storage del carrito
function cambiarCantidadCC(articuloId, cantidad){
  const tagCantidad = document.getElementById("idCantidadSpanCC"+articuloId);  
  const articulo = carritoCompras.find(articulo => articulo.id === articuloId);
  let cantidadActual = Number(articulo.cantidad);
  if (tagCantidad) {
     if (cantidadActual === 1 && cantidad === -1) {
        cantidadActual = 1;
     } else {
        cantidadActual += cantidad;
     };
     articulo.cantidad = Number(cantidadActual);
     tagCantidad.innerHTML = Number(cantidadActual);
     localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras))
  };
};
// genera los listeners de articulos disponibles: listener de agregar al carrito y +/- de cantidad del articulo
function agregarArticulosDisponiblesListeners(){
  let tagBotonAgregar;
  let tagBotonRestarCantidad;
  let tagBotonSumarCantidad;

  articulosDisponibles.forEach(articulo => {  

    tagBotonAgregar = document.getElementById("idBotonAgregarArticuloDisponible"+articulo.id);
    (tagBotonAgregar) && (tagBotonAgregar.addEventListener("click", (e) => { e.preventDefault();
                                                                             agregarAlCarritoCompras(articulo.id);
                                                                             renderizarCarritoCompras();
                                                                           }));    

    tagBotonRestarCantidad = document.getElementById("idBotonRestar"+articulo.id);
    (tagBotonRestarCantidad) && (tagBotonRestarCantidad.addEventListener("click", (e) => {e.preventDefault();cambiarCantidad(articulo.id,-1)}));  

    tagBotonSumarCantidad = document.getElementById("idBotonSumar"+articulo.id);
    (tagBotonSumarCantidad) && (tagBotonSumarCantidad.addEventListener("click", (e) => {e.preventDefault();cambiarCantidad(articulo.id,1)})); 

  });  
} 
// render articulos Disponibles
function renderizarArticulosDisponibles(){
  obtenerArticulosDisponiblesDatos();
  agregarArticulosDisponiblesHtml();
  agregarArticulosDisponiblesListeners();
};
// inicio de compras
async function inicioCompras(){
  // inicia el modulo
  if (localStorage.getItem("inicioModulo") == "NO" || localStorage.getItem("inicioModulo") == null) {
     await inicioModulo();
  }
  // obtiene los datos de storage
  datosStorageListaPrecios();
  datosStorageCarritoCompras();
  datosStorageArticulosDisponibles();
  //obtiene el storage de categoria
  document.getElementById("idBuscarArticuloCategoria").value = localStorage.getItem("idBuscarArticuloCategoria") || "";
  // render articulos disponibles
  renderizarArticulosDisponibles();
  // verifica si el carrtio estaba oculto, antes de renderizar
  if (localStorage.getItem("carritoComprasOculto") == "NO" || localStorage.getItem("carritoComprasOculto") == null) {
     renderizarCarritoCompras();
  };
};
//inicia compras
inicioCompras();