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
const urlPathImagesCompras = "./assets/img/";

function actualizarTotalCarrito(){
   if (tagTotalCarrito) {
      const totalCarritoCompras = carritoCompras.reduce((sumador, articulo) => sumador + (articulo.precio*articulo.cantidad),0);
      tagTotalCarrito.innerText= `Total Carrito Compras: ${formatearImporte(totalCarritoCompras)}`;
  };
};

//obtiene los articulos disponibles, para el evento de filtrar por categoria
function obtenerArticulosDisponiblesDatosFiltros(){
  if (tagSelectCategoria) {
     let listaFiltro = [];
     let articuloDisponible = {};

     const categoria = tagSelectCategoria.value.toUpperCase();
     listaFiltro = (categoria.length === 0) ? [...listaPrecioArticulos] :
                   listaPrecioArticulos.filter(articulo => articulo.categoria.toUpperCase().includes(categoria.toUpperCase()));
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
                            <div class="contenedorCardImagen">
                                <img src="${urlPathImagesCompras}${articulo.imagen}" class="cardImagen">
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

       let contenidoHtml = ` <div class="contenedorCard">  
                          <div class="contenedorCardDatos">
                            <div class="contenedorCardImagen">
                                <img src="${urlPathImagesCompras}${articulo.imagen}" class="cardImagen">
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
      localStorage.setItem("carritoComprasOculto","NO");
    };
    actualizarTotalCarrito();
    agregarCarritoComprasListeners();
  };
};
// agrega el articulo disponible al carrito de compras
function agregarAlCarritoCompras(articuloId){
  if (carritoCompras.some(articulo => parseInt(articulo.id) === parseInt(articuloId))) {
     crearMensajeToast("El articulo ya existe en el carrito de compras");
  } else {
    crearMensajeToast("Agregando articulo al carrito..."); 
    const articulo = articulosDisponibles.find(articulo => articulo.id === articuloId);
    carritoCompras.push({...articulo});
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
  // obtiene los datos de storage
  datosStorageListaPrecios();
  datosStorageCarritoCompras();
  datosStorageArticulosDisponibles();
  datosStorageArticulosNuevos();
  datosStorageCarritoComprasFinalizadas();
  // chequeo inicio el modulo
  const listaPreciosStorage = JSON.parse(localStorage.getItem("listaPrecioArticulos")) || [];
  if (listaPreciosStorage.length === 0) {
     await inicioModulo();  
  }
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
    e.preventDefault();
    localStorage.setItem("idSelectCategoria", tagSelectCategoria.value);
    obtenerArticulosDisponiblesDatosFiltros();
    renderizarArticulosDisponibles();
});
//validacion del nombre del cliente, en la cofirmacion de la compra
function validarNombre(nombre){
   let error;
   const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
   if(nombre === ""){
      error = "El nombre es obligatorio";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(!soloLetras.test(nombre)){
      error = "El nombre debe tener letras y espacios";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(!nombre.includes(" ")){
      error = "Ingrese nombre y apellido, por ejemplo: JUAN CARLOS PEREZ";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
//validacion del email del cliente, en la confirmacion de la compra
function validarEmail(email){
   let error;
   const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(email === ""){
      error = "El email es obligatorio";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(!formatoEmail.test(email)){
      error = "Email invalido";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(email.includes(" ")){
      error = "El email no puede contener espacios";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
// validacion del telefono del cliente,en la confirmacion de la compra
function validarTelefono(telefono){
  let error;
  const formatoTelefono = /^\d{2}-\d{4}-\d{4}$/;
  const formatoNumeros  = /^[0-9-]+$/;
  if(telefono === ""){
    error = "El telefono es obligatorio";
    Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
    return false;
  };
  if(!formatoNumeros.test(telefono)){
    error = "No puede contener letras, ingresar un formato de telefono valido por ej: 11-5555-6666";
    Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
    return false;
  };
  if(!formatoTelefono.test(telefono)){
    error = "Ingresar un formato de telefono valido por ej: 11-5555-6666";
    Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
    return false;
  };
  return true;
};
//validacion del nombre de la calle del domicilio del cliente, en la cofirmacion de la compra
function validarEnvioCalle(calle){
   let error;
   if(calle === ""){
      error = "El nombre de la calle es obligatorio";
      Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
//validacion del numero en la calle del domicilio del cliente, en la cofirmacion de la compra
function validarEnvioNro(numero){
   let error;
   const formatoNumeros  = /^[0-9-]+$/;
   console.log("validaEnvioNro:"+numero)
   console.log("validaEnvioNro.length:"+numero.length)
   if(numero.length == 0){
      error = "El numero en la calle es obligatorio";
      Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(!formatoNumeros.test(numero)){
       error = "El numero de calle no puede contener letras, solo numeros";
       Swal.showValidationMessage(error);
       setTimeout(() => {
             Swal.resetValidationMessage();
       }, 3000);
      return false;
   };
   if(parseInt(numero)>999999 || parseInt(numero) <= 0){
       error = "El numero debe ser entre 1 y 999999";
       Swal.showValidationMessage(error);
       setTimeout(() => {
             Swal.resetValidationMessage();
       }, 3000);
      return false;
   };
   return true;   
};
//validacion de la ciudad del cliente, en la cofirmacion de la compra
function validarEnvioCiudad(ciudad){
   let error;
   const formatoNumeros  = /^[0-9-]+$/;
   if(ciudad.length == 0){
      error = "El nombre de la ciudad es obligatorio";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(formatoNumeros.test(ciudad)){
      error = "El nombre la cidudad no puede tener solo numeros";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
//validacion de la provincia del cliente, en la cofirmacion de la compra
function validarEnvioProvincia(provincia){
   let error;
   const formatoNumeros  = /^[0-9-]+$/;
   if(provincia.length == 0){
      error = "El nombre de la provincia es obligatorio";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(formatoNumeros.test(provincia)){
      error = "El nombre la ciudad no puede tener solo numeros";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
//validacion del numero de codigo postal del cliente, en la cofirmacion de la compra
function validarEnvioCodigoPostal(codigoPostal){
   let error;
   const formatoNumeros  = /^[0-9-]+$/;
   if(codigoPostal.length == 0){
      error = "El numero de codigo postal es obligatorio";
      Swal.showValidationMessage(error);
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   if(!formatoNumeros.test(codigoPostal)){
       error = "El numero de calle no puede contener letras, solo numeros";
       Swal.showValidationMessage(error);
       setTimeout(() => {
             Swal.resetValidationMessage();
       }, 3000);
      return false;
   };
   if(parseInt(codigoPostal)>9999 || parseInt(codigoPostal) <= 0){
       error = "El numero de codigo postal debe ser entre 1 y 9999";
       Swal.showValidationMessage(error);
       setTimeout(() => {
             Swal.resetValidationMessage();
       }, 3000);
      return false;
   };
   return true;   
};
//validacion del medio de pago del cliente, en la cofirmacion de la compra
function validarMedioPago(medioPago){
   let error;
   if(medioPago.length == 0){
      error = "Debe seleccionar un medio de pago";
      Swal.showValidationMessage(error)
      setTimeout(() => {
            Swal.resetValidationMessage();
      }, 3000);
      return false;
   };
   return true;   
};
// mensaje de confirmacion del carrito
async function confirmarCarritoCompras(){
  if (carritoCompras.length === 0) {
     crearMensajeToast("El carrito de compras esta vacio"); 
  } else {

      const totalCarrito = carritoCompras.reduce((sumador,articulo)  => sumador + (articulo.precio*articulo.cantidad),0);
      
      const {value: swalValores} = await Swal.fire({
         title: "Finalizar Compra",
         html: `
            <label for="idSwalNombre">Nombre</label>
            <input id="idSwalNombre" class="swal2-input" placeholder="ej. JUAN CARLOS PEREZ">
            <label for="idSwalEmail">Email</label>
            <input id="idSwalEmail" class="swal2-input" placeholder="ej. juan.carlos.perez@gmail.com">
            <label for="idSwalTelefono">Telefono</label>
            <input id="idSwalTelefono" class="swal2-input" placeholder="ej. 11-3827-6499">
            <label for="idSwalDireccionEnvioCalle">Calle</label>
            <input id="idSwalDireccionEnvioCalle" class="swal2-input" placeholder="ej. Mario Bravo">
            <label for="idSwalDireccionEnvioNro">Numero</label>
            <input id="idSwalDireccionEnvioNro" class="swal2-input" placeholder="ej. 641">
            <label for="idSwalDireccionEnvioCiudad">Ciudad</label>
            <input id="idSwalDireccionEnvioCiudad" class="swal2-input" placeholder="ej. Avellaneda">
            <label for="idSwalDireccionEnvioProvincia">Provincia</label>
            <input id="idSwalDireccionEnvioProvincia" class="swal2-input" placeholder="ej. Buenos Aires">
            <label for="idSwalDireccionEnvioCodigoPostal">Cod.Post.</label>
            <input id="idSwalDireccionEnvioCodigoPostal" class="swal2-input" placeholder="ej. 1780">
            <label for="idSwalMedioPago">Medio Pago</label>
            <select id="idSwalMedioPago" class="swal2-select">
            <option value=""></option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjetaCredito">Tarjeta Crédito</option>
            <option value="tarjetaDebito">Tarjeta Débito</option>
            <option value="transferencia">Transferencia</option>
            </select>
            <br><br>
            <p id="idSwalTotalPago">Total a pagar: <strong>${formatearImporte(totalCarrito)}</strong></p>        
         `,
         focusConfirm: false,
         showCancelButton: true,
         confirmButtonText: "Confirmar compra",
         cancelButtonText: "Cancelar",
         confirmButtonColor: "green",
         cancelButtonColor: "red",
         preConfirm: () => {
            const nombre = document.getElementById("idSwalNombre").value;
            const email = document.getElementById("idSwalEmail").value;
            const telefono = document.getElementById("idSwalTelefono").value;
            const direccionEnvioCalle = document.getElementById("idSwalDireccionEnvioCalle").value;
            const direccionEnvioNro = document.getElementById("idSwalDireccionEnvioNro").value;
            const direccionEnvioCiudad = document.getElementById("idSwalDireccionEnvioCiudad").value;
            const direccionEnvioProvincia = document.getElementById("idSwalDireccionEnvioProvincia").value;
            const direccionEnvioCodigoPostal = document.getElementById("idSwalDireccionEnvioCodigoPostal").value;
            const medioPago = document.getElementById("idSwalMedioPago").value;
            if (!validarNombre(nombre) ||               
                !validarEmail(email) ||
                !validarTelefono(telefono) ||
                !validarEnvioCalle(direccionEnvioCalle) ||
                !validarEnvioNro(direccionEnvioNro)||
                !validarEnvioCiudad(direccionEnvioCiudad)||
                !validarEnvioProvincia(direccionEnvioProvincia)||
                !validarEnvioCodigoPostal(direccionEnvioCodigoPostal)||
                !validarMedioPago(medioPago)
               ) {
               return false;              
            };
            if (!nombre || !email || !telefono ||
                !direccionEnvioCalle || !direccionEnvioNro || !direccionEnvioCiudad || 
                !direccionEnvioCodigoPostal || !direccionEnvioProvincia || !medioPago                 
            ) {
               Swal.showValidationMessage("Debe completar todos los campos")
               return false;
            };
            return {nombre, email, telefono,
                    direccionEnvioCalle,
                    direccionEnvioNro,
                    direccionEnvioCiudad,
                    direccionEnvioProvincia,
                    direccionEnvioCodigoPostal,
                    medioPago};
         }
      });

      if (swalValores) {
         
            datosStorageCarritoComprasFinalizadas();
            const listaArticulosCompras = carritoCompras.map(articulo => `
               <li class="swalResumenCompraDetalleLi">${articulo.nombre} - x ${articulo.cantidad} - ${formatearImporte(articulo.cantidad*articulo.precio)}</li>
               `
            ).join("");
            console.log("listaArticulosCompras")
            console.log(listaArticulosCompras)
            const numeroOrdenVenta = (carritoComprasFinalizadas.length == 0) ? 1
                : parseInt(carritoComprasFinalizadas.reduce((valorMaximo, venta) => ((venta.cliente.ordenDeVenta>valorMaximo)?venta.cliente.ordenDeVenta:valorMaximo),0 )) +1;
            console.log("numeroordenventa: " + numeroOrdenVenta)
            //const numeroOrdenVenta = (carritoComprasFinalizadas.length == 0) ? 1 : carritoComprasFinalizadas.length+1;  
            await Swal.fire({
               title: "Compra exitosa",
               width: "70%",
               html: `
               <div class="swalResumenCompra">
                  <p>Gracias por su compra, <strong>${swalValores.nombre}</strong></p>
                  <p>Número de Orden de Compra: <strong>${numeroOrdenVenta}</strong></p>
                  <p>Total Compra: <strong>${formatearImporte(totalCarrito)}</strong></p>
                  <p>Metodo de Pago: <strong>${swalValores.medioPago}</strong></p>
                  <p>Dirección de envío: <strong>${swalValores.direccionEnvioCalle} 
                                                 ${swalValores.direccionEnvioNro}, 
                                                 ${swalValores.direccionEnvioCiudad}, 
                                                 ${swalValores.direccionEnvioProvincia}, 
                                                 CP: ${swalValores.direccionEnvioCodigoPostal}</strong></p>
               </div>
               <p class="swalResumenCompraDetalleTitulo">Detalle de Articulos</p>
               <div class="swalResumenCompraDetalleDiv">                                                 
                  <ul class="swalResumenCompraDetalleUl">${listaArticulosCompras}</ul>
               </div>   
               `,
               icon: "success",
               confirmButtonText: "Aceptar",
               confirmButtonColor: "green"
            });  
                        
            const venta = {
               cliente: {
               ordenDeVenta: parseInt(numeroOrdenVenta),
               nombreCliente: swalValores.nombre,
               emailCliente: swalValores.email,
               direccionEnvioCalle: swalValores.direccionEnvioCalle,
               direccionEnvioNro: swalValores.direccionEnvioNro,
               direccionEnvioCiudad: swalValores.direccionEnvioCiudad,
               direccionEnvioProvincia: swalValores.direccionEnvioProvincia,
               direccionEnvioCodigoPostal: swalValores.direccionEnvioCodigoPostal,
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
   };            
};

tagBotonVerCarritoCompras.addEventListener("click", (e) => {
    e.preventDefault();
    if (carritoCompras.length === 0) {
        crearMensajeToast("El carrito de compras esta vacio");
    } else {
      renderizarCarritoCompras();
   };
});

tagBotonOcultarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();
   if (carritoCompras.length > 0) {
      if (tagMainCarritoCompras) {
         if (tagMainCarritoCompras.childElementCount === 0) {
            crearMensajeToast("El carrito de compras ya esta oculto");
         } else {
            tagMainCarritoCompras.innerHTML=``;
            (tagTotalCarrito) && (tagTotalCarrito.innerHTML=``);
         };
      };
   } else {
      crearMensajeToast("El carrito de compras esta vacio");
   };
   localStorage.setItem("carritoComprasOculto","SI");
});

tagBotonVaciarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();    
   if (carritoCompras.length > 0) {
      if (tagMainCarritoCompras) {
         if (tagMainCarritoCompras.childElementCount === 0) {
            crearMensajeToast("El carrito de compras ya esta vacio");
         } else {
           Swal.fire({
                title: "Desea vaciar el carrito?",
                text: "Esta seguro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "red",
                confirmButtonText: "Si, vaciar",
                cancelButtonText: "Cancelar"
           }).then((result) => {
                    if (result.isConfirmed) {
                       Swal.fire({
                            title: "Articulos eliminados",
                            text: "El carrito esta vacio",
                            icon: "success",
                            confirmButtonColor: "green"
                        });
      
                    carritoCompras.splice(0,carritoCompras.length);
                    localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras));
                    tagMainCarritoCompras.innerHTML=``;
                    (tagTotalCarrito) && (tagTotalCarrito.innerHTML=``);
                   };
           });           
         };
      };
   } else {
      crearMensajeToast("El carrito de compras esta vacio");
   };
});

tagBotonConfirmarCarritoCompras.addEventListener("click", (e) => {
   e.preventDefault();
   confirmarCarritoCompras();
});