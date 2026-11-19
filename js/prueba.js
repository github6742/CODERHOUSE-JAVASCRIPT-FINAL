const carritoCompras = [
  {
    "id": 13,
    "codigo": "HELELE0013",
    "nombre": "HELADERA ELECTOLUX BOTTOM FREEZER NO FROST",
    "marca": "ELECTROLUX",
    "categoria": "HELADERA",
    "precio": 1300000,
    "imagen": "13-heladera-electrolux-bottom-freezer.webp",
    "cantidad": 1
  },
  {
    "id": 15,
    "codigo": "HELELE0015",
    "nombre": "HELADERA ELECTOLUX BOTTOM FREEZER NO FROST",
    "marca": "ELECTROLUX",
    "categoria": "HELADERA",
    "precio": 1800000,
    "imagen": "18-heladera-electrolux-bottom-freezer.webp",
    "cantidad": 7
  }
];



function formatearImporte(importe){
  return new Intl.NumberFormat("es-AR",{
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2
  }).format(importe);
}

const listaArticulosHTML = carritoCompras.map(item => `
        <li>
            ${item.nombre} (x${item.cantidad}) - <strong>${formatearImporte(item.precio * item.cantidad)}</strong>
        </li>
    `).join("");


console.log(listaArticulosHTML)    ;

const listaArticulosHTML2 = carritoCompras.map(item => `
        <li>
            ${item.nombre} (x${item.cantidad}) - <strong>${formatearImporte(item.precio * item.cantidad)}</strong>
        </li>
    `);


console.log(listaArticulosHTML2)    ;