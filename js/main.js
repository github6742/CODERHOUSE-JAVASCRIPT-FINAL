let listaPrecioArticulos = [];
let carritoCompras = [];
let carritoComprasFinalizadas = [];
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
}

function formatearImporte(importe){
  return new Intl.NumberFormat("es-AR",{
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2
  }).format(importe);
}

function peticion(texto){
  (texto.length>0) && crearMensajeAvisoToast(texto);  
  return new Promise((resolve) => {
     setTimeout(()=> {
        const conexion = true;
        (conexion) ? (resolve(true)) : (resolve(false));
     },5000)
  });
}

async function fetchBase(){
  crearMensajeAvisoToast("Cargando los articulos..")
  try {
    fetch(url)
    .then(resp => resp.json())
    .then(lista => {
                       listaPrecioArticulos = [...lista]
                       localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPrecioArticulos]));
                   })
  } catch (err) {
    err=>crearMensajeAvisoToast("No se logro cargar los articulos de la base: " + err);
  } finally {    
    await peticion("");
    crearMensajeAvisoToast("Los articulos fueron cargados satisfactoriamente");
  }
}

function datosStorageListaPrecios() {
  let listaPreciosArticulosStorage = (JSON.parse(localStorage.getItem("listaPrecioArticulos")) == null) ? ([]) : JSON.parse(localStorage.getItem("listaPrecioArticulos"));
  if  (listaPreciosArticulosStorage.length > 0) {
      localStorage.setItem("listaPrecioArticulos", JSON.stringify([...listaPreciosArticulosStorage]));
      listaPrecioArticulos = [...listaPreciosArticulosStorage];
  };
};

function datosStorageCarritoCompras(){  
  let carritoComprasStorage = (JSON.parse(localStorage.getItem("carritoCompras")) == null) ? ([]) : JSON.parse(localStorage.getItem("carritoCompras"));
  if (carritoComprasStorage.length > 0) {
      localStorage.setItem("carritoCompras", JSON.stringify([...carritoComprasStorage]));
      carritoCompras = [...carritoComprasStorage];
  };
}

function datosStorageCarritoComprasFinalizadas(){  
  let carritoComprasFinalizadasStorage = (JSON.parse(localStorage.getItem("carritoComprasFinalizadas")) == null) ? ([]) : JSON.parse(localStorage.getItem("carritoComprasFinalizadas"));
  if (carritoComprasFinalizadasStorage.length > 0) {
      localStorage.setItem("carritoComprasFinalizadas", JSON.stringify([...carritoComprasFinalizadasStorage]));
      carritoComprasFinalizadas = [...carritoComprasFinalizadasStorage];
  };
}

function datosStorageArticulosEncontrados(){
  let articulosEncontradosStorage = (JSON.parse(localStorage.getItem("articulosEncontrados")) == null) ? ([]) : JSON.parse(localStorage.getItem("articulosEncontrados"));
  if (articulosEncontradosStorage.length > 0) {
      localStorage.setItem("articulosEncontrados",JSON.stringify([...articulosEncontradosStorage]));
      articulosEncontrados = [...articulosEncontradosStorage];
  } else {
      localStorage.setItem("articulosEncontrados",JSON.stringify([...listaPrecioArticulos]));
      articulosEncontrados = [...listaPrecioArticulos];
  }
}

async function inicioModulo(){
  const conectado = await peticion("Realizando conexion....");
  if (conectado) {
     await fetchBase();
     localStorage.setItem("inicioModulo","SI");
  };
}