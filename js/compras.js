// declaracion de variables de elementos del index.html
const tagMainContenedor = document.getElementById("idMainContenedor");
const tagMainContenedorElementos = document.getElementById("idMainContenedorElementos");
const tagSelectCategoria = document.getElementById("idSelectCategoria");
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
  if (tagSelectCategoria) {
     let listaFiltro = [];
     let articuloDisponible = {};

     const categoria = tagSelectCategoria.value.toUpperCase();
     console.log("obtenerArticulosDisponiblesDatosFiltros-categoria: " + categoria);
     listaFiltro = (categoria.length === 0) ? [...listaPrecioArticulos] :
                   listaPrecioArticulos.filter(articulo => articulo.categoria.toUpperCase().includes(categoria.toUpperCase()));
     console.log("listaFiltro");
     console.log(listaFiltro);
     articulosDisponibles.splice(0,articulosDisponibles.length);
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
                                                                               renderizarCarritoCompras();
                                                                              }));    

    tagBotonRestarCantidad = document.getElementById("idBotonRestarCC"+articuloCC.id);
    (tagBotonRestarCantidad) && (tagBotonRestarCantidad.addEventListener("click", (e) => { e.preventDefault();cambiarCantidadCC(articuloCC.id,-1)}));  

    tagBotonSumarCantidad = document.getElementById("idBotonSumarCC"+articuloCC.id);
    (tagBotonSumarCantidad) && (tagBotonSumarCantidad.addEventListener("click", (e) => { e.preventDefault();cambiarCantidadCC(articuloCC.id,1)})); 

  });  
};
// render carrito compras
function renderizarCarritoCompras(){

  if (tagMainCarritoCompras){
     tagMainCarritoCompras.innerHTML=``;
    if  (carritoCompras.length > 0 ){
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
        localStorage.setItem("carritoComprasOculto","NO");
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
     renderizarArticulosDisponibles();
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
     renderizarCarritoCompras();
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
  };
  // obtiene los datos de storage
  datosStorageListaPrecios();
  datosStorageCarritoCompras();
  datosStorageArticulosDisponibles();
  datosStorageArticulosNuevos();
  //obtiene el storage de categoria
  document.getElementById("idSelectCategoria").value = localStorage.getItem("idSelectCategoria") || "";
  // render articulos disponibles
  renderizarArticulosDisponibles();
  // verifica si el carrtio estaba oculto, antes de renderizar
  if (localStorage.getItem("carritoComprasOculto") == "NO" || localStorage.getItem("carritoComprasOculto") == null) {
     renderizarCarritoCompras();
  };
};
//inicia compras
inicioCompras();

tagSelectCategoria.addEventListener("change", (e) => {
    console.log("listener select categoria")
    e.preventDefault();
    console.log("e.preventdefault")
    obtenerArticulosDisponiblesDatosFiltros();
    console.log("obtenerArticulosDisponiblesDatosFiltros")
    renderizarArticulosDisponibles();
    console.log("renderizarArticulosDisponibles")
});
//
async function confirmarCarritoCompras(){
  if (carritoCompras.length === 0) {
     crearMensajeTransaccionToast("El carrito de compras esta vacio"); 
     return;
  };  

  const totalCarrito = carritoCompras.reduce((sumador,articulo)  => sumador + (articulo.precio*articulo.cantidad),0);
  
  const {value: swalValores} = await Swal.fire({
   title: "Finalizar Compra",
   html: `
      <input id="idSwalNombre" class="swal2-input" placeholder="Ingrese su nombre completo">
      <input id="idSwalEmail" class="swal2-input" placeholder="Email">
      <input id="idSwalDireccionEnvio" class="swal2-input" placeholder="Direccion de envío">
      <select id="idSwalMedioPago" class="swal2-select">
        <option value="">Metodo de Pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="tarjetaCredito">Tarjeta Crédito</option>
        <option value="tarjetaDebito">Tarjeta Débito</option>
        <option value="transferencia">Transferencia</option>
      </select>
      <p id="idSwalTotalPago">Total a pagar: <strong>${formatearImporte(totalCarrito)}</strong></p>        
   `,
   focusConfirm: false,
   showCancelButton: true,
   confirmButtonText: "Confirmar compra",
   cancelButtonText: "Cancelar",
   confirmButtonColor: "green",
   preConfirm: () => {
       const nombre = document.getElementById("idSwalNombre").value;
       const email = document.getElementById("idSwalEmail").value;
       const direccionEnvio = document.getElementById("idSwalDireccionEnvio").value;
       const medioPago = document.getElementById("idSwalMedioPago").value;
       if (!nombre || !email || !direccionEnvio || !medioPago) {
          Swal.showValidationMessage("Debe completar todos los campos")
          return false;
       }
       return {nombre, email, direccionEnvio, medioPago};
   }
  });

  if (!swalValores) return;
  
  const numeroOrdenVenta = (carritoComprasFinalizadas.length === 0) ? 1 : carritoComprasFinalizadas.length+1;  
  
  await Swal.fire({
   title: "Compra exitosa",
   html: `
      <p>Gracias por su compra, <strong>${swalValores.nombre}</strong><p>
      <p>Número de Orden de Venta: <strong>${numeroOrdenVenta}</strong><p>
      <p>Total Compra: <strong>${formatearImporte(totalCarrito)}</strong><p>
      <p>Metodo de Pago: <strong>${swalValores.medioPago}</strong><p>
      <p>Dirección de envío: <strong>${swalValores.direccionEnvio}</strong><p>
   `,
   icon: "success",
   confirmButtonText: "Aceptar",
   confirmButtonColor: "green"
  });  
  
  datosStorageCarritoComprasFinalizadas();
 
  const venta = {
   cliente: {
     ordenDeVenta: numeroOrdenVenta,
     nombreCliente: swalValores.nombre,
     emailCliente: swalValores.email,
     direccionEnvio: swalValores.direccionEnvio,
     medioPago: swalValores.medioPago,
     totalImporte: totalCarrito
   },
   articulos: [...carritoCompras]
  };
  
  carritoComprasFinalizadas.push(venta);
  localStorage.setItem("carritoComprasFinalizadas", JSON.stringify(carritoComprasFinalizadas));  
  
  const tagIdMainCarritoCompras = document.getElementById("idMainCarritoCompras");
  (tagIdMainCarritoCompras) && (tagIdMainCarritoCompras.innerHTML=``);
  
  const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
  (tagIdTotalCarrito) && (tagIdTotalCarrito.innerHTML=``);
  
  carritoCompras = [];
  localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras));  
};

tagBotonVerCarritoCompras.addEventListener("click", (e) => {
    e.preventDefault();
    //datosStorageCarritoCompras();
    console.log("listener boton ver carrito")
    if (carritoCompras.length === 0) {
        crearMensajeTransaccionToast("El carrito de compras esta vacio");
    } else {
      renderizarCarritoCompras();
   };
});

tagBotonOcultarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();
   console.log("listener boton ocultar carrito");
   if (carritoCompras.length > 0) {
      if (tagMainCarritoCompras) {
         if (tagMainCarritoCompras.childElementCount === 0) {
            crearMensajeTransaccionToast("El carrito de compras ya esta oculto");
         } else {
            tagMainCarritoCompras.innerHTML=``;
            (tagTotalCarrito) && (tagTotalCarrito.innerHTML=``);
         };
      };
   } else {
      crearMensajeTransaccionToast("El carrito de compras esta vacio");
   };
   localStorage.setItem("carritoComprasOculto","SI");
});

tagBotonVaciarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();    
   console.log("listener boton vaciar carrito")
   if (carritoCompras.length > 0) {
      if (tagMainCarritoCompras) {
         if (tagMainCarritoCompras.childElementCount === 0) {
            crearMensajeTransaccionToast("El carrito de compras ya esta vacio");
         } else {
            carritoCompras.splice(0,carritoCompras.length);
            localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras));
            tagMainCarritoCompras.innerHTML=``;
            (tagTotalCarrito) && (tagTotalCarrito.innerHTML=``);
         };
      };
   } else {
      crearMensajeTransaccionToast("El carrito de compras esta vacio");
   };
});

tagBotonConfirmarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();
   console.log("listener boton confirmar carrito")
   confirmarCarritoCompras();
});