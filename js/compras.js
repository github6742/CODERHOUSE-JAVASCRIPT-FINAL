function eliminarDelCarritoDatos(articuloId){
  //
  carritoCompras = carritoCompras.filter((articulo) => articulo.id != articuloId);
  localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
  //
}

function eliminarDelCarritoHtml(articuloId){
  //
  const tagIdMainCarritoCompras = document.getElementById("idMainCarritoCompras");
  const tagIdCarritoComprasArticulo = document.getElementById("idCarritoComprasArticulo"+articuloId);
  const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
  //
  (tagIdMainCarritoCompras && tagIdCarritoComprasArticulo) && tagIdMainCarritoCompras.removeChild(tagIdCarritoComprasArticulo);
  // 
  if (tagIdTotalCarrito) {
     let totalCarrito = carritoCompras.reduce((sumador,articulo)  => sumador + (parseInt(articulo.precio)*parseInt(articulo.cantidad)),0);
     tagIdTotalCarrito.innerText = `Total del Carrito de Compras: $${parseInt(totalCarrito)}`;
  }
  //
  crearMensajeTransaccionToast("El articulo fue eliminado");
  //   
}

function eliminarDelCarrito(e, articuloId){
  //
  e.preventDefault();
  eliminarDelCarritoDatos(articuloId);
  eliminarDelCarritoHtml(articuloId);
  //
}

function agregarListaArticulosHtml(lista){
  lista.forEach(articulo => {agregarArticuloHtml(articulo.id)});
}
         
function agregarArticuloHtml(articuloId){
  //
  let totalCarrito;
  let contenidoHtml;
  let cantidad;
  const tagMainCarritoCompras = document.getElementById("idMainCarritoCompras");
  const articulo = carritoCompras.find(articulo => articulo.id == articuloId);
  ////console.log("articulo.cantidad: " + articulo.cantidad)
  
  //
  if (tagMainCarritoCompras) {
    ////console.log("ExisteCarritoCompras")
     //
     const tagDivArticulo = document.createElement("div");
     tagDivArticulo.id = "idCarritoComprasArticulo"+articulo.id;
     tagDivArticulo.className = "carritoComprasArticulo";
     tagMainCarritoCompras.appendChild(tagDivArticulo); 
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
                     <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">$${articulo.precio}</p>  
                </div>
              </div>  `;
              // contenidoHtml +=`
              // <div id="idCarritoComprasCantidadDiv${articulo.id}" class="carritoComprasCantidadDiv">
              //     <label class="labelCard" for="idCarritoComprasCantidadInput${articulo.id}" >Cantidad: </label>            
              //     <input id="idCarritoComprasCantidadInput${articulo.id}" class="inputCard" type="number" min=1 max=1000 value=${articulo.cantidad} required>
              // </div>   `;
                         contenidoHtml +=`
                         <div id="idCarritoComprasCantidadDiv${articulo.id}" class="carritoComprasCantidadDiv">                                        
                              <div class="contenedorCarritoCantidad">
                                <button id="idCarritoBotonRestar${articulo.id}" class="botonCantidad">-</button>
                                <span id="idCarritoCantidadSpan${articulo.id}" class="spanCantidad">${articulo.cantidad}</span>
                                <button id="idCarritoBotonSumar${articulo.id}" class="botonCantidad">+</button>
                              </div>                              
                         </div>
                         `;
              contenidoHtml +=`
              <div class="contenedorCardDatosFila">
                   <p id="idTotalArticuloComprado${articulo.id}" class="labelCard">Total: $${articulo.precio*articulo.cantidad}</p>
              </div>
              <div class="contenedorCardDatosBoton">
                <button id="idCarritoComprasBotonEliminar${articulo.id}" class="buttonCard">ELIMINAR</button>                
              </div>  
            </div>
            </div>
            `;
     // 
     tagDivArticulo.innerHTML = contenidoHtml;     
     //
  }
  //  
  const tagBotonEliminar = document.getElementById("idCarritoComprasBotonEliminar"+articulo.id);
  //
  (tagBotonEliminar) && (tagBotonEliminar.addEventListener("click", (e) => eliminarDelCarrito(e,articulo.id)));
  //
            const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
            //
            if (tagIdTotalCarrito) {
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               tagIdTotalCarrito.innerText="Total Carrito-1: $"+(parseInt(totalCarrito));
               //
            }
          const tagBotonRestar = document.getElementById("idCarritoBotonRestar"+articulo.id);
          //
          if (tagBotonRestar) {
             tagBotonRestar.addEventListener("click", (e) => {
               e.preventDefault();
               let cantidadResultado;
               const tagResultadoCantidadSpan = document.getElementById("idCarritoCantidadSpan"+articulo.id);
               if (tagResultadoCantidadSpan) {
                  cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
                  if (cantidadResultado > 1){
                     cantidadResultado += -1;
                     tagResultadoCantidadSpan.innerText = cantidadResultado;
                  };
               };
               const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloComprado"+articulo.id);
               if (tagIdTotalArticuloBuscado){
                  tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
               };
               
            articulo.cantidad = parseInt(cantidadResultado);
            articulo.totalArticulo = parseInt(cantidadResultado)*parseInt(articulo.precio);
            localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
            //
            const tagIdTotalArticuloComprado = document.getElementById("idTotalArticuloComprado"+articulo.id);
            //
            (tagIdTotalArticuloComprado) && (tagIdTotalArticuloComprado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio)));
            //
            const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
            //
            if (tagIdTotalCarrito) {
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               tagIdTotalCarrito.innerText="Total Carrito-2: $"+(parseInt(totalCarrito));
               //
            }
            //localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
             });
          }
          //
          const tagBotonSumar = document.getElementById("idCarritoBotonSumar"+articulo.id);
          //
          if (tagBotonSumar) {
             tagBotonSumar.addEventListener("click", (e) => {
               e.preventDefault();
               let cantidadResultado;
               const tagResultadoCantidadSpan = document.getElementById("idCarritoCantidadSpan"+articulo.id);
               if (tagResultadoCantidadSpan) {
                  cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
                  cantidadResultado += 1;
                  tagResultadoCantidadSpan.innerText = cantidadResultado;
               };
               const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloComprado"+articulo.id);
               if (tagIdTotalArticuloBuscado){
                  tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
               };
               
            articulo.cantidad = parseInt(cantidadResultado);
            articulo.totalArticulo = parseInt(cantidadResultado)*parseInt(articulo.precio);
            localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
            //
            const tagIdTotalArticuloComprado = document.getElementById("idTotalArticuloComprado"+articulo.id);
            //
            (tagIdTotalArticuloComprado) && (tagIdTotalArticuloComprado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio)));
            //
            const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
            //
            if (tagIdTotalCarrito) {
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               tagIdTotalCarrito.innerText="Total Carrito-3: $"+(parseInt(totalCarrito));
               //
            }
             });
          }
  /*
  const tagInputCantidad = document.getElementById("idCarritoComprasCantidadInput"+articulo.id);
  //
  if (tagInputCantidad) {
     //
     tagInputCantidad.addEventListener("input",(e) => {
            //
            e.preventDefault();
            articulo.cantidad = parseInt(tagInputCantidad.value);
            articulo.totalArticulo = parseInt(tagInputCantidad.value)*parseInt(articulo.precio);
            //
            const tagIdTotalArticuloComprado = document.getElementById("idTotalArticuloComprado"+articulo.id);
            //
            (tagIdTotalArticuloComprado) && (tagIdTotalArticuloComprado.innerText="Total: $"+(parseInt(tagInputCantidad.value)*parseInt(articulo.precio)));
            //
            const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
            //
            if (tagIdTotalCarrito) {
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               tagIdTotalCarrito.innerText="Total Carrito-4: $"+(parseInt(totalCarrito));
               //
            }
            //
     });
  }
     */
  //
  //localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
  //
}

function agregarAlCarritoDatos(articuloId){
  const articulo = listaPrecioArticulos.find(articulo => parseInt(articulo.id) === parseInt(articuloId));
  const tagIdResultadoCantidadSpan = document.getElementById("idResultadoCantidadSpan"+articuloId);
  if (tagIdResultadoCantidadSpan) {
    let cantidad = parseInt(tagIdResultadoCantidadSpan.innerText);
    articulo.cantidad = parseInt(cantidad);
    articulo.totalArticulo = parseInt(articulo.precio)*parseInt(cantidad);
    carritoCompras.push(articulo);
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
  };
}

function agregarAlCarritoHtml(articuloId){
  agregarArticuloHtml(articuloId);
}

function agregarAlCarrito(e,articuloId){
  e.preventDefault();
  if (carritoCompras.some(articulo => parseInt(articulo.id) === parseInt(articuloId))) {
     crearMensajeTransaccionToast("El articulo ya existe en el carrito de compras");
  } else {
    crearMensajeTransaccionToast("Agregando articulo al carrito..."); 
    agregarAlCarritoDatos(articuloId);
    agregarAlCarritoHtml(articuloId);
  }    
}

function buscarArticulosHtml(lista){
  //
  console.log("buscarArticulosHtml")
  let contenidoHtml;
  let tagDivArticuloEncontrado;
  let cantidad;
  const tagMainResultados = document.getElementById("idMainResultados");
  //
  if (tagMainResultados) {
    //
  ////console.log("buscarArticulosHtml tagMainResultados" )
    tagMainResultados.innerHTML = ``;
    //
    lista.forEach(lista => {
  ////console.log("buscarArticulosHtml tagMainResultados lista" )
        //
        tagDivArticuloEncontrado = document.createElement('div')
        tagDivArticuloEncontrado.id = "idArticuloEncontrado"+lista.id;
        tagDivArticuloEncontrado.className ="articuloEncontrado";
        tagMainResultados.appendChild(tagDivArticuloEncontrado);
        //                    
        let cantidadArticulo = 0; 
        //
        /*if (lista.cantidad == undefined) {
            cantidadArticulo = 1;
            precioArticuloTotal = parseInt(lista.precio)*parseInt(cantidadArticulo);
            lista.totalArticulo = precioArticuloTotal;
            ////console.log("1-precioArticuloTOtal: "+precioArticuloTotal)
        } else {
            cantidadArticulo = parseInt(lista.cantidad);
            precioArticuloTotal = parseInt(lista.totalArticulo);
            ////console.log("2-precioArticuloTOtal: "+precioArticuloTotal)
        }*/
        ////////////////////////
        if(lista.cantidad) {
          cantidad = parseInt(lista.cantidad);
          precioArticuloTotal = parseInt(lista.cantidad) * parseInt(lista.precio);
          //lista.cantidad = parseInt(cantidad);
        }else{
          cantidad=1;
          lista.cantidad = parseInt(cantidad);
          precioArticuloTotal = parseInt(lista.cantidad) * parseInt(lista.precio);
        }
        //
        contenidoHtml = ` <div class="contenedorCard">
                          <div class="contenedorCardDatos">
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Id:</p><p class="cardDatosFilaValor">${lista.id}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Codigo:</p><p class="cardDatosFilaValor">${lista.codigo.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Nombre:</p><p class="cardDatosFilaValor">${lista.nombre.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Marca:</p><p class="cardDatosFilaValor">${lista.marca.toUpperCase()}</p>
                            </div>
                            <div class="contenedorCardDatosFila">
                                <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">$${parseInt(lista.precio)}</p>  
                            </div>
                          </div>`;
                          /*
                          
                          <div id="idResultadoCantidadDiv${lista.id}" class="resultadoCantidadDiv">
                              <label class="labelCard" for="idResultadoCantidadInput${lista.id}" >Cantidad: </label>            
                              <input id="idResultadoCantidadInput${lista.id}" class="inputCard" type="number" min=1 max=1000 value=${parseInt(cantidadArticulo)} required>
                          </div> 
                          */
                         contenidoHtml +=`
                         <div id="idResultadoCantidadDiv${lista.id}" class="resultadoCantidadDiv">                                        
                              <div class="contenedorResultadoCantidad">
                                <button id="idBotonRestar${lista.id}" class="botonCantidad">-</button>
                                <span id="idResultadoCantidadSpan${lista.id}" class="spanCantidad">${cantidad}</span>
                                <button id="idBotonSumar${lista.id}" class="botonCantidad">+</button>
                              </div>                              
                         </div>
                         `;
                          contenidoHtml += `
                          <div class="contenedorCardDatosFila">
                              <p id="idTotalArticuloBuscado${lista.id}" class="labelCard">Total: $${parseInt(precioArticuloTotal)}</p>
                          </div>
                          <div class="contenedorCardDatosBoton">
                            <button id="idResultadosBotonAgregar${lista.id}" class="buttonCard">AGREGAR</button>
                          </div>  
                        </div>
                        `;
        //
        tagDivArticuloEncontrado.innerHTML = contenidoHtml;
        //        
    });
  };
  //
  lista.forEach(articulo => {
      //  
      const tagBotonAgregar = document.getElementById("idResultadosBotonAgregar"+articulo.id);
      //
      (tagBotonAgregar) && (tagBotonAgregar.addEventListener("click", (e) => agregarAlCarrito(e,articulo.id)));
      //
      const tagBotonRestar = document.getElementById("idBotonRestar"+articulo.id);
      //
      if (tagBotonRestar) {
         tagBotonRestar.addEventListener("click", (e) => {
           e.preventDefault();
           let cantidadResultado;
           const tagResultadoCantidadSpan = document.getElementById("idResultadoCantidadSpan"+articulo.id);
           if (tagResultadoCantidadSpan) {
              cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
              if (cantidadResultado > 1){
                  cantidadResultado += -1;
                  tagResultadoCantidadSpan.innerText = cantidadResultado;
              };
           };
           const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloBuscado"+articulo.id);
           if (tagIdTotalArticuloBuscado){
              tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
           };
           articulo.cantidad = cantidadResultado;
     localStorage.setItem("articulosEncontrados",JSON.stringify(lista));
         });
      }
      //
      const tagBotonSumar = document.getElementById("idBotonSumar"+articulo.id);
      //
      if (tagBotonSumar) {
         tagBotonSumar.addEventListener("click", (e) => {
           e.preventDefault();
           let cantidadResultado;
           const tagResultadoCantidadSpan = document.getElementById("idResultadoCantidadSpan"+articulo.id);
           if (tagResultadoCantidadSpan) {
              cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
              cantidadResultado += 1;
              tagResultadoCantidadSpan.innerText = cantidadResultado;
           };
           const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloBuscado"+articulo.id);
           if (tagIdTotalArticuloBuscado){
              tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
           };
           articulo.cantidad = cantidadResultado;
     localStorage.setItem("articulosEncontrados",JSON.stringify(lista));
         });
      }
      //
  });
};

//function buscarArticulo(e){
function buscarArticulo(){
  //
  //e.preventDefault();
  //console.log("buscarArticulo")
  //
  const tagIdBuscarArticuloCategoria = document.getElementById("idBuscarArticuloCategoria");
  //
  if (tagIdBuscarArticuloCategoria) {
  ////console.log("buscarArticulo-tagIdBuscarArticuloCategoria-existe")
     //
     const categoria = tagIdBuscarArticuloCategoria.value.toUpperCase();
  ////console.log("buscarArticulo-tagIdBuscarArticuloCategoria-existe")
  ////console.log("listaPrecioArticulos")
  ////console.log(listaPrecioArticulos)
  
  ////console.log("articulosEncontrados")
  ////console.log(articulosEncontrados)
  
  //console.log("articulosEncontrados-categoria.length : " +categoria.length )
     //
     /*let localStorageArticulosEncontrados = JSON.parse(localStorage.getItem("articulosEncontrados"))
     if (localStorageArticulosEncontrados.length > 0) {
        articulosEncontrados = [...localStorageArticulosEncontrados ];
     } else {*/
     articulosEncontrados = (categoria.length == 0) ? [...listaPrecioArticulos] :
                            listaPrecioArticulos.filter(articulo => articulo.categoria.toUpperCase().includes(categoria.toUpperCase()));
     //}
  ////console.log("articulosEncontrados2")
  ////console.log(articulosEncontrados)
     //
  //localStorage.setItem("articulosEncontrados",JSON.stringify([...articulosEncontradosStorage]));
     localStorage.setItem("articulosEncontrados",JSON.stringify(articulosEncontrados));
     //
     buscarArticulosHtml(articulosEncontrados);
    //
   } 
}

//function verCarritoCompras(e){
function verCarritoCompras(){
  //
  //e.preventDefault();
  //
  localStorage.setItem("carritoComprasOculto","NO")
  let totalCarrito; 
  //
  //if ((carritoCompras.length === 0) ) {
     //   
     //crearMensajeTransaccionToast("El carrito de compras esta vacio")
     //
  /*} else {*/
    //
    const tagIdMainCarritoCompras = document.getElementById("idMainCarritoCompras");
    //
    if (tagIdMainCarritoCompras.childElementCount === 0) {
       //
       let contenidoHtml;
       let tagDivArticuloEncontrado;
       tagIdMainCarritoCompras.innerHTML = ``;
       //
       if (tagIdMainCarritoCompras) {
          //
          carritoCompras.forEach(lista => {
             //
             //let cantidad;
             tagDivArticuloEncontrado = document.createElement('div')
             tagDivArticuloEncontrado.id = "idCarritoComprasArticulo"+lista.id;
             tagDivArticuloEncontrado.className ="articuloEncontrado";
             tagIdMainCarritoCompras.appendChild(tagDivArticuloEncontrado);
             //
             contenidoHtml = ` <div class="contenedorCard">
              <div class="contenedorCardDatos">
                <div class="contenedorCardDatosFila">
                     <p class="cardDatosFilaEtiqueta">Id:</p><p class="cardDatosFilaValor">${lista.id}</p>
                </div>
                <div class="contenedorCardDatosFila">
                     <p class="cardDatosFilaEtiqueta">Codigo:</p><p class="cardDatosFilaValor">${lista.codigo.toUpperCase()}</p>
                </div>
                <div class="contenedorCardDatosFila">
                     <p class="cardDatosFilaEtiqueta">Nombre:</p><p class="cardDatosFilaValor">${lista.nombre.toUpperCase()}</p>
                </div>
                <div class="contenedorCardDatosFila">
                     <p class="cardDatosFilaEtiqueta">Marca:</p><p class="cardDatosFilaValor">${lista.marca.toUpperCase()}</p>
                </div>
                <div class="contenedorCardDatosFila">
                     <p class="cardDatosFilaEtiqueta">Precio:</p><p class="cardDatosFilaValor">$${lista.precio}</p>  
                </div>
              </div>`;
             /* contenidoHtml +=  `
              <div id="idCarritoComprasCantidadDiv${lista.id}" class="carritoComprasCantidadDiv">
                  <label class="labelCard" for="idCarritoComprasCantidadInput${lista.id}" >Cantidad: </label>            
                  <input id="idCarritoComprasCantidadInput${lista.id}" class="inputCard" type="number" min=1 max=1000 value=${lista.cantidad} required>
              </div> `;*/
                         contenidoHtml +=`
                         <div id="idCarritoComprasCantidadDiv${lista.id}" class="carritoComprasCantidadDiv">                                        
                              <div class="contenedorCarritoCantidad">
                                <button id="idCarritoBotonRestar${lista.id}" class="botonCantidad">-</button>
                                <span id="idCarritoCantidadSpan${lista.id}" class="spanCantidad">${lista.cantidad}</span>
                                <button id="idCarritoBotonSumar${lista.id}" class="botonCantidad">+</button>
                              </div>                              
                         </div>
                         `;
              contenidoHtml +=  `
              <div class="contenedorCardDatosFila">
                   <p id="idTotalArticuloComprado${lista.id}" class="labelCard">Total: $${lista.precio*lista.cantidad}</p>
              </div>
              <div class="contenedorCardDatosBoton">
                <button id="idCarritoComprasBotonEliminar${lista.id}" class="buttonCard">ELIMINAR</button>                
              </div>  
            </div>
            `;



             tagDivArticuloEncontrado.innerHTML = contenidoHtml;
          });

            //totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
            //document.getElementById("idTotalCarrito").innerText="Total Carrito-5: $"+(totalCarrito);

       };
       //
              
      carritoCompras.forEach(articulo => {          
          //
          const tagBotonEliminar = document.getElementById("idCarritoComprasBotonEliminar"+articulo.id);
          //
          (tagBotonEliminar) && (tagBotonEliminar.addEventListener("click", (e) => eliminarDelCarrito(e,articulo.id)));
          //
          const tagBotonRestar = document.getElementById("idCarritoBotonRestar"+articulo.id);
          //
          if (tagBotonRestar) {
             tagBotonRestar.addEventListener("click", (e) => {
               e.preventDefault();
               let cantidadResultado;
               const tagResultadoCantidadSpan = document.getElementById("idCarritoCantidadSpan"+articulo.id);
               if (tagResultadoCantidadSpan) {
                  cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
                  if (cantidadResultado > 1){
                     cantidadResultado += -1;
                     tagResultadoCantidadSpan.innerText = cantidadResultado;
                  };
               };
               const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloComprado"+articulo.id);
               if (tagIdTotalArticuloBuscado){
                  tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
               };
               
               articulo.cantidad = parseInt(cantidadResultado);
               articulo.totalArticulo = parseInt(cantidadResultado)*parseInt(articulo.precio);
               
               localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras))
               document.getElementById("idTotalArticuloComprado"+articulo.id).innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio));
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               document.getElementById("idTotalCarrito").innerText="Total Carrito-6: $"+(totalCarrito);
             });
          }
          //
          const tagBotonSumar = document.getElementById("idCarritoBotonSumar"+articulo.id);
          //
          if (tagBotonSumar) {
             tagBotonSumar.addEventListener("click", (e) => {
               e.preventDefault();
               let cantidadResultado;
               const tagResultadoCantidadSpan = document.getElementById("idCarritoCantidadSpan"+articulo.id);
               if (tagResultadoCantidadSpan) {
                  cantidadResultado = parseInt(tagResultadoCantidadSpan.innerText);
                  cantidadResultado += 1;
                  tagResultadoCantidadSpan.innerText = cantidadResultado;
               };
               const tagIdTotalArticuloBuscado = document.getElementById("idTotalArticuloComprado"+articulo.id);
               if (tagIdTotalArticuloBuscado){
                  tagIdTotalArticuloBuscado.innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio))
               };
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0); 
               document.getElementById("idTotalCarrito").innerText="Total Carrito-7: $"+(parseInt(totalCarrito));
               
               articulo.cantidad = parseInt(cantidadResultado);
               articulo.totalArticulo = parseInt(cantidadResultado)*parseInt(articulo.precio);
               
               localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras))
               document.getElementById("idTotalArticuloComprado"+articulo.id).innerText="Total: $"+(parseInt(cantidadResultado)*parseInt(articulo.precio));
               //
               totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
               document.getElementById("idTotalCarrito").innerText="Total Carrito-8: $"+(totalCarrito);
             });
          }
          /*
          const tagInputCantidad = document.getElementById("idCarritoComprasCantidadInput"+articulo.id);
          //
          if (tagInputCantidad) {
             tagInputCantidad.addEventListener("input",(e) => {
                //
                articulo.cantidad = parseInt(tagInputCantidad.value);
                articulo.totalArticulo = parseInt(tagInputCantidad.value)*parseInt(articulo.precio);
                //
                localStorage.setItem("carritoCompras",JSON.stringify(carritoCompras))
                document.getElementById("idTotalArticuloComprado"+articulo.id).innerText="Total: $"+(parseInt(tagInputCantidad.value)*parseInt(articulo.precio));
                //
                totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
                document.getElementById("idTotalCarrito").innerText="Total Carrito-9: $"+(totalCarrito);
               //                                                          
             });
          }*/
        });
        //
        /*
        totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0); 
        document.getElementById("idTotalCarrito").innerText="Total Carrito-10: $"+(parseInt(totalCarrito));
        */
    //}
  //localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
  } 
  if (carritoCompras.length > 0) {
    totalCarrito = carritoCompras.reduce((sumador,articulocc)  => sumador + (parseInt(articulocc.precio)*parseInt(articulocc.cantidad)),0);  
    document.getElementById("idTotalCarrito").innerText="Total Carrito-5: $"+(totalCarrito);
}
  
} 

function ocultarCarritoCompras(e){
  //
  e.preventDefault();
  //
  localStorage.setItem("carritoComprasOculto","SI");
  const tagIdMainCarritoCompras = document.getElementById("idMainCarritoCompras");
  //
  if ((tagIdMainCarritoCompras.childElementCount === 0) && (carritoCompras.length > 0)){
    crearMensajeTransaccionToast("El carrito ya esta oculto")
  } else if ((tagIdMainCarritoCompras.childElementCount > 0) && (carritoCompras.length > 0)){
     //
     carritoCompras.forEach(articulo => {
          const tagInputCantidad = document.getElementById("idCarritoComprasCantidadInput"+articulo.id);
          if(tagInputCantidad){
            articulo.cantidad = parseInt(tagInputCantidad.value);
            articulo.totalArticulo = parseInt(tagInputCantidad.value)*parseInt(articulo.precio);
          }
        });
     tagIdMainCarritoCompras.innerHTML=``;
     const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
     //
     (tagIdTotalCarrito) && (tagIdTotalCarrito.innerHTML=``);
     //
  } else {
    crearMensajeTransaccionToast("El carrito de compras esta vacio")
 }
}   

function vaciarCarritoCompras(e){
  e.preventDefault();
  localStorage.setItem("carritoComprasOculto","SI")
  //
  if (carritoCompras.length > 0) {
     //
     const tagIdMainCarritoCompras = document.getElementById("idMainCarritoCompras");
     //
     (tagIdMainCarritoCompras) && (tagIdMainCarritoCompras.innerHTML=``);
     //
     const tagIdTotalCarrito = document.getElementById("idTotalCarrito");
     //
     (tagIdTotalCarrito) && (tagIdTotalCarrito.innerHTML=``);
     //
     carritoCompras.splice(0,carritoCompras.length);
     //
     crearMensajeTransaccionToast("Se eliminaron los articulos del carrito")
  }else{ 
     
     crearMensajeTransaccionToast("El carrito de compras esta vacio")
  };
  localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
}   

function confirmarCarritoCompras(e){
  
  e.preventDefault();
  
  (carritoCompras.length > 0) ? crearMensajeTransaccionToast("Se comfirmo la compra") 
                              : crearMensajeTransaccionToast("El carrito de compras esta vacio");
} 

const tagFormBuscarArticulo = document.getElementById("idBuscarArticuloCategoria");
tagFormBuscarArticulo.addEventListener("change", (e) => {
    e.preventDefault();
    buscarArticulo()
 });

const tagBotonVerCarrito = document.getElementById("idBotonVerCarritoCompras");
tagBotonVerCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    if (carritoCompras.length == 0) {crearMensajeTransaccionToast("El carrito de compras esta vacio")} else {
    verCarritoCompras();}
}
);

const tagBotonOcultarCarrito = document.getElementById("idBotonOcultarCarritoCompras");
tagBotonOcultarCarrito.addEventListener("click", ocultarCarritoCompras);

const tagBotonVaciarCarrito = document.getElementById("idBotonVaciarCarritoCompras");
tagBotonVaciarCarrito.addEventListener("click", vaciarCarritoCompras);

const tagBotonConfirmarCarrito = document.getElementById("idBotonConfirmarCarritoCompras");
tagBotonConfirmarCarrito.addEventListener("click", confirmarCarritoCompras);

const tagInputBuscarArticuloCategoria = document.getElementById("idBuscarArticuloCategoria");
tagInputBuscarArticuloCategoria.addEventListener("input",()=>localStorage.setItem("idBuscarArticuloCategoria",document.getElementById("idBuscarArticuloCategoria").value));



async function inicioCompras(){

    if (localStorage.getItem("inicioModulo") == "NO" || localStorage.getItem("inicioModulo") == null) {
        await inicioModulo();
    }
  console.log("--->inicioCompras()")
  //buscarArticulosHtml(articulosEncontrados);
  console.log("--->inicioCompras()--->datosStorageListaPrecios()")
 datosStorageListaPrecios();
  //console.log("inicioCompras-ListaPrecioArticulos")
  //console.log(listaPrecioArticulos)
  console.log("--->inicioCompras()--->datosStorageCarritoCompras()")
  datosStorageCarritoCompras();
  //console.log("inicioCompras-carritoCompras")
  //console.log(carritoCompras)
  document.getElementById("idBuscarArticuloCategoria").value = localStorage.getItem("idBuscarArticuloCategoria") || "";
  console.log("--->inicioCompras()--->datosStorageArticulosEncontrados()")
  datosStorageArticulosEncontrados();
  //console.log("inicioCompras-articulosEncontrados")
  //console.log(articulosEncontrados)
  //buscarArticulo();
  console.log("--->inicioCompras()--->buscarArticulosHtml()")
    buscarArticulosHtml(articulosEncontrados);
    
    if (localStorage.getItem("carritoComprasOculto") == "NO" || localStorage.getItem("carritoComprasOculto") == null) {
       verCarritoCompras();
    };
    
}

inicioCompras();