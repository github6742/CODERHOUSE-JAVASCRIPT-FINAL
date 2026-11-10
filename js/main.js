let listaPrecioArticulos = [];
let carritoCompras = [];
let articulosEncontrados = [];

const url = "./db/data.json";
class Articulo {
      constructor(id,
                  codigo, 
                  nombre, 
                  marca,
                  categoria,
                  precio){
        this.id = id,
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.categoria = categoria;
        this.precio = precio;
      };
};

/*
let carritoComprasStorage = (JSON.parse(localStorage.getItem("carritoCompras")) == null) ? ([]) : JSON.parse(localStorage.getItem("carritoCompras"));
if (carritoComprasStorage.length > 0) {
   localStorage.setItem("carritoCompras", JSON.stringify([...carritoComprasStorage]));
   carritoCompras = [...carritoComprasStorage];
}

carritoCompras.length > 0 && (localStorage.getItem("carritoComprasOculto") === "NO" || localStorage.getItem("carritoComprasOculto")===null ) && agregarListaArticulosHtml(carritoCompras);

let articulosEncontradosStorage = (JSON.parse(localStorage.getItem("articulosEncontrados")) == null) ? ([]) : JSON.parse(localStorage.getItem("articulosEncontrados"));
if (articulosEncontradosStorage.length > 0) {
  localStorage.setItem("articulosEncontrados",JSON.stringify([...articulosEncontradosStorage]));
  articulosEncontrados = [...articulosEncontradosStorage];
}

articulosEncontrados.length > 0 && buscarArticulosHtml(articulosEncontrados);

const articuloFormulario = JSON.parse(localStorage.getItem("articuloFormulario")) || {};
*/
/*
document.getElementById("idCrearArticuloCodigo").value = articuloFormulario.codigo || "";
document.getElementById("idCrearArticuloNombre").value = articuloFormulario.nombre || "";
document.getElementById("idCrearArticuloMarca").value = articuloFormulario.marca || "";
document.getElementById("idCrearArticuloCategoria").value = articuloFormulario.categoria || "";
document.getElementById("idCrearArticuloPrecio").value = articuloFormulario.precio || "";
document.getElementById("idBuscarArticuloCategoria").value = localStorage.getItem("idBuscarArticuloCategoria") || "";
*/

function crearMensajeAvisoToast(texto){
 
Toastify({
  text: texto,
  duration: 3000,
  destination: "#",
  newWindow: false,
  close:false,
  className: "toastLargoTop",
  gravity: "top", 
  position: "left", 
  stopOnFocus: true, 
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
}).showToast();

}
function crearMensajeTransaccionToast(texto){
//  
Toastify({
  text: texto,
  duration: 3000,
  destination: "#",
  newWindow: false,
  close:false,
  className: "toastTransaccionTop",
  gravity: "top", 
  position: "left", 
  stopOnFocus: true, 
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
}).showToast();
//
}
//const tagFormBuscarArticulo = document.getElementById("idMainFormularioBuscar");
//tagFormBuscarArticulo.addEventListener("submit", buscarArticulo);

/*
const tagInputCrearArticuloCodigo = document.getElementById("idCrearArticuloCodigo");
tagInputCrearArticuloCodigo.addEventListener("input", guardarDatosFormulario);

const tagInputCrearArticuloNombre = document.getElementById("idCrearArticuloNombre");
tagInputCrearArticuloNombre.addEventListener("input",guardarDatosFormulario);

const tagInputCrearArticuloMarca = document.getElementById("idCrearArticuloMarca");
tagInputCrearArticuloMarca.addEventListener("input",guardarDatosFormulario);

const tagInputCrearArticuloCategoria = document.getElementById("idCrearArticuloCategoria");
tagInputCrearArticuloCategoria.addEventListener("input",guardarDatosFormulario);

const tagInputCrearArticuloPrecio = document.getElementById("idCrearArticuloPrecio");
tagInputCrearArticuloPrecio.addEventListener("input",guardarDatosFormulario);
*/

function peticion(texto){
//    console.log("--->peticion()")
  (texto.length>0) && crearMensajeAvisoToast(texto);  
  return new Promise((resolve) => {
     setTimeout(()=> {
        const conexion = true;
        (conexion) ? (resolve(true)) : (resolve(false));
     },5000)
  });
}

function renderizarLista(lista){
    console.log("--->renderizarLista()")
  crearMensajeAvisoToast("Cargando datos...");
  const tagContenedorElementos = document.getElementById("idCargaArticulosElementos");
  let contenidoHtml;
  lista.forEach(articulo => {
      const card = document.createElement("div");
      card.id = "idCargaArticulosCard"+articulo.id; 
      card.className = "cargaArticulosCard"; 
      contenidoHtml = `
                       <div class="cardFilaCampos">
                        <h4 class="cardLabel">Id:</h4><h4 class="cardValue">${articulo.id}</h4>
                       </div>
                       <div class="cardFilaCampos">
                        <h5 class="cardLabel">Codigo:</h4><h4 class="cardValue">${articulo.codigo}</h5>
                       </div>
                       <div class="cardFilaCampos">
                        <h5 class="cardLabel">Nombre:</h4><h4 class="cardValue">${articulo.nombre}</h5>
                       </div>
                       <div class="cardFilaCampos">
                        <h5 class="cardLabel">Marca:</h4><h4 class="cardValue">${articulo.marca}</h5>
                       </div>
                       <div class="cardFilaCampos">
                        <h5 class="cardLabel">Categoria:</h4><h4 class="cardValue">${articulo.categoria}</h5>
                       </div>
                       <div class="cardFilaCampos">
                        <h5 class="cardLabel">Precio:</h4><h4 class="cardValue">${articulo.precio}</h5>
                       </div>
      `;
      card.innerHTML = contenidoHtml;
      tagContenedorElementos.appendChild(card);
    }
  );
};


async function fetchBase(){
    console.log("--->fetchBase()")
  crearMensajeAvisoToast("Cargando los articulos..")
  try {
    fetch(url)
    .then(resp => resp.json())
    .then(lista => {
                       //console.log("fetch-lista")
                       //console.log(lista)
                       listaPrecioArticulos = [...lista]
                       //console.log("listaPrecioArticulos")
                       //console.log(listaPrecioArticulos)
                       localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPrecioArticulos]));
                   })
  } catch (err) {
    err=>crearMensajeAvisoToast("No se logro cargar los articulos de la base: " + err);
  } finally {    
    /*const conectado = */await peticion("");
    crearMensajeAvisoToast("Los articulos fueron cargados satisfactoriamente");
  }
}

function datosStorageListaPrecios() {
    console.log("--->datosStorageListaPrecios()")
  //console.log("-datosStorageListaPrecios()-JSON.parse(localStorage.getItem(listaPrecioArticulos))"+JSON.parse(localStorage.getItem("listaPrecioArticulos")));
  let listaPreciosArticulosStorage = (JSON.parse(localStorage.getItem("listaPrecioArticulos")) == null) ? ([]) : JSON.parse(localStorage.getItem("listaPrecioArticulos"));
  //console.log("-datosStorageListaPrecios()-listaPreciosArticulosStorage.length > 0 = antes "+listaPreciosArticulosStorage.length);
  if  (listaPreciosArticulosStorage.length > 0) {
      //console.log("-datosStorageListaPrecios()-listaPreciosArticulosStorage.length > 0 = true "+listaPreciosArticulosStorage.length);
      //console.log("-datosStorageListaPrecios()-listaPreciosArticulosStorage: "+listaPreciosArticulosStorage);
      localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPreciosArticulosStorage]));
      listaPrecioArticulos = [...listaPreciosArticulosStorage];
      //console.log("-datosStorageListaPrecios()-listaPrecioArticulos: "+listaPrecioArticulos);
  /*} else {
    listaPrecioArticulos = [...listaInicio];
    localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPrecioArticulos]));
    */
  };
};

function datosStorageCarritoCompras(){  
    console.log("--->datosStorageCarritoCompras()")
  let carritoComprasStorage = (JSON.parse(localStorage.getItem("carritoCompras")) == null) ? ([]) : JSON.parse(localStorage.getItem("carritoCompras"));
  if (carritoComprasStorage.length > 0) {
      localStorage.setItem("carritoCompras", JSON.stringify([...carritoComprasStorage]));
      carritoCompras = [...carritoComprasStorage];
  };
  carritoCompras.length > 0 && (localStorage.getItem("carritoComprasOculto") === "NO" || localStorage.getItem("carritoComprasOculto")===null ) 
  /*&& agregarListaArticulosHtml(carritoCompras)*/;
}

function datosStorageArticulosEncontrados(){
    console.log("--->datosStorageArticulosEncontrados()")
  let articulosEncontradosStorage = (JSON.parse(localStorage.getItem("articulosEncontrados")) == null) ? ([]) : JSON.parse(localStorage.getItem("articulosEncontrados"));
  //console.log("datosStorageArticulosEncontrados: " + articulosEncontradosStorage.length);
  if (articulosEncontradosStorage.length > 0) {
       //console.log("datosStorageArticulosEncontrados: true" );
      localStorage.setItem("articulosEncontrados",JSON.stringify([...articulosEncontradosStorage]));
      articulosEncontrados = [...articulosEncontradosStorage];
  } else {
       //console.log("datosStorageArticulosEncontrados: false" );
      localStorage.setItem("articulosEncontrados",JSON.stringify([...listaPrecioArticulos]));
      articulosEncontrados = [...listaPrecioArticulos];
  }
  //articulosEncontrados.length > 0 && buscarArticulosHtml(articulosEncontrados);
}

async function inicioModulo(){
    console.log("--->inicioModulo()")
    //console.log("localStorage.getItem(inicioModulo): " + localStorage.getItem("inicioModulo"))
    //if (localStorage.getItem("inicioModulo") == "NO" || localStorage.getItem("inicioModulo") == null) {
      //console.log("true")
        const conectado = await peticion("Realizando conexion....");
        if (conectado) {
          await fetchBase()
          ;
          ////console.log("inicioModulo-luego-await FetchBase-listaPrecioArticulos")
          ////console.log(listaPrecioArticulos)
          //datosStorageListaPrecios();
          //datosStorageArticulosEncontrados();
          ////console.log("inicioModulo-luego-datosStorageListaPrecios-listaPrecioArticulos")
          ////console.log(listaPrecioArticulos)
          //datosStorageCarritoCompras();
          //datosStorageArticulosEncontrados();
          //buscarArticulosHtml(listaPrecioArticulos);
          ////console.log("inicioModulo-luego-buscarArticulosHtml-listaPrecioArticulos")
          ////console.log(listaPrecioArticulos)
          localStorage.setItem("inicioModulo","SI");
        };
    /*} else {
      //console.log("false")
      datosStorageListaPrecios();
      datosStorageCarritoCompras();
      datosStorageArticulosEncontrados();*/
      //buscarArticulosHtml(articulosEncontrados);
    //}
}
//inicioModulo();
/*
async function inicioModulo(){
  
  try {
        const conectado = await peticion("Realizando conexion....");
        const tagSection = document.getElementById("idCargaArticulosContenedor");
        let listaInicio = [];
       
        if (conectado) {
          
           fetch(url)
           .then(resp => resp.json()) 
           .then(lista => {
                              //listaPrecioArticulos = [...lista]
                              listaInicio = [...lista]
                              renderizarLista(lista)
                              
                              let listaPreciosArticulosStorage = (JSON.parse(localStorage.getItem("listaPrecioArticulos")) == null) ? ([]) : JSON.parse(localStorage.getItem("listaPrecioArticulos"));
                              
                              if (listaPreciosArticulosStorage.length > 0) {
                                localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPreciosArticulosStorage]));
                                listaPrecioArticulos = [...listaPreciosArticulosStorage];
                              } else {
                                listaPrecioArticulos = [...listaInicio];
                                localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPrecioArticulos]));
                              };
                              
                              let carritoComprasStorage = (JSON.parse(localStorage.getItem("carritoCompras")) == null) ? ([]) : JSON.parse(localStorage.getItem("carritoCompras"));
                              if (carritoComprasStorage.length > 0) {
                                  localStorage.setItem("carritoCompras", JSON.stringify([...carritoComprasStorage]));
                                  carritoCompras = [...carritoComprasStorage];
                              }

                              carritoCompras.length > 0 && (localStorage.getItem("carritoComprasOculto") === "NO" || localStorage.getItem("carritoComprasOculto")===null ) && agregarListaArticulosHtml(carritoCompras);

                              let articulosEncontradosStorage = (JSON.parse(localStorage.getItem("articulosEncontrados")) == null) ? ([]) : JSON.parse(localStorage.getItem("articulosEncontrados"));
                              if (articulosEncontradosStorage.length > 0) {
                                  localStorage.setItem("articulosEncontrados",JSON.stringify([...articulosEncontradosStorage]));
                                  articulosEncontrados = [...articulosEncontradosStorage];
                              }

                              articulosEncontrados.length > 0 && buscarArticulosHtml(articulosEncontrados);
                          })
           .then(()=> {setTimeout(()=> {(tagSection) && (tagSection.classList.add("ocultarSection"));},7000);})
           .then(()=> { 
                          if (articulosEncontrados.length > 0){
                             buscarArticulosHtml(articulosEncontrados);
                          } else {
                             buscarArticulosHtml(listaInicio);
                          }
                      })
           .catch(err=>crearMensajeAvisoToast("No se logro cargar los articulos: " + err))
           
    }
     
  } catch (error) {
    crearMensajeAvisoToast("No se logro cargar los articulos")
  } finally {    
    const conectado = await peticion("");
    crearMensajeAvisoToast("Bienvenidos al Modulo de Compras");
  }
};

inicioModulo();
*/