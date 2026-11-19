const swalValoresArray = [
  {
   nombre: "SERGIO GABRIEL RODRIGUEZ",
   numeroOrdenVenta: 1,
   totalCarrito: 12356333.38,
   medioPago: "EFECTIVO",
   direccionEnvioCalle: "SANTOS DUMONT",
   direccionEnvioNro: "322",
   direccionEnvioCiudad: "ISIDRO CASANOVA",
   direccionEnvioProvincia: "BUENOS AIRES",
   direccionEnvioCodigoPostal: "1870"
  }
];

const carritoCompras =[
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 4,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 1,
    precio: 3400000
  },
  {
    nombre: "TELEVISOR SMART TV JVC 32 PULGADAS",
    cantidad: 6,
    precio: 3400000
  }
]
console.log("prueba.js")
const listaArticulosCompras = carritoCompras.map(articulo => `
               <li class="swalResumenCompraDetalleLi">${articulo.nombre} - x ${articulo.cantidad} - ${formatearImporte(articulo.cantidad*articulo.precio)}</li>
               `
).join("");




function formatearImporte(importe){
  return new Intl.NumberFormat("es-AR",{
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2
  }).format(importe);
}
swalValoresArray.forEach(swalValores=>{
 Swal.fire({
               title: "Compra exitosa",
               width: "70%",
               html: `
               <div class="swalResumenCompra">
                  <p>Gracias por su compra, <strong>${swalValores.nombre}</strong></p>
                  <p>Número de Orden de Compra: <strong>${swalValores.numeroOrdenVenta}</strong></p>
                  <p>Total Compra: <strong>${formatearImporte(swalValores.totalCarrito)}</strong></p>
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
          });