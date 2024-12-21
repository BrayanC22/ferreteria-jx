import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  precioOriginal: number;
  precioConDescuento: number;
  descuento: number;
  imagen: string;
  categoria: string;
}

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosPagina: Producto[] = [];
  carrito: CarritoItem[] = [];
  promociones: Promocion[] = [];
  mostrarCarrito: boolean = false;
  totalCarrito: number = 0;



  mostrarComprobante: boolean = false;
  usuarioAutenticado: boolean = false;
  tipoComprobante: string = 'factura';
  fechaActual: string = new Date().toLocaleDateString();


  categorias: string[] = ['Todas las promociones', 'Oferta en pinturas', 'Oferta relámpago', 'Liquidación de Temporada'];
  categoriaSeleccionada: string = 'Todas las promociones';
  terminoBusqueda: string = '';
  productosPorPagina: number = 8;
  paginaActual: number = 1;
  totalPaginas: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.cargarProductos();
    this.buscarProductos(); // Mantener los productos filtrados actualizados desde el inicio
  }

  cargarProductos(): void {
    this.productos = [
  // Oferta en pinturas
  {
    id: 1,
    nombre: 'Pintura Acrílica Blanca',
    precioOriginal: 20.50,
    precioConDescuento: 15.00,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura1.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 2,
    nombre: 'Pintura para Piscina Neptuno Azul Mar 1Gal',
    precioOriginal: 40.50,
    precioConDescuento: 30.00,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura2.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 3,
    nombre: 'Laca Interior Altos Sólidos Unidas Blanco 1Gal',
    precioOriginal: 29.60,
    precioConDescuento: 20.20,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura3.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 4,
    nombre: 'Pintura Látex Supremo Unidas Caneca - Varios Colores',
    precioOriginal: 79.00,
    precioConDescuento: 62.00,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura4.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 5,
    nombre: 'Pintura Unidas Supremo Satín Blanco Caneca',
    precioOriginal: 100.90,
    precioConDescuento: 91.20,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura5.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 6,
    nombre: 'Pintura Anticorrosivo Unidas Industrial Brillante 1Gal',
    precioOriginal: 19.99,
    precioConDescuento: 12.99,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura6.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 7,
    nombre: 'Pintura Esmalte Unidas Supremo 1Gal',
    precioOriginal: 90.00,
    precioConDescuento: 72.00,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura7.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 8,
    nombre: 'Pintura Esmalte Pintulux Anticorrosivo 1L',
    precioOriginal: 4.77,
    precioConDescuento: 2.70,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura8.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 9,
    nombre: 'Pintura Anticorrosiva Sintético Latina 1Gal ',
    precioOriginal: 18.66,
    precioConDescuento: 15.00,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura9.jpg',
    categoria: 'Oferta en pinturas',
  },
  {
    id: 10,
    nombre: 'Pintura Esmalte Pintuco Metaltec 3 en 1',
    precioOriginal: 25.98,
    precioConDescuento: 22.10,
    descuento: 20,
    imagen: 'assets/Recursos/Imagenes/ofertapinturas/pintura10.jpg',
    categoria: 'Oferta en pinturas',
  },

  // Oferta relámpago
  {
    id: 11,
    nombre: 'Kit Taladro de Impacto Inalámbrico + Linterna Tekno',
    precioOriginal: 105.00,
    precioConDescuento: 52.50,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago1.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 12,
    nombre: 'Sierra Caladora Bosch GST-750 520W Azul',
    precioOriginal: 150.00,
    precioConDescuento: 75.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago2.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 13,
    nombre: 'Lijadora Orbital Stanley 1/4 de 240w',
    precioOriginal: 60.00,
    precioConDescuento: 30.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago3.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 14,
    nombre: 'Amoladora de Banco Fixtec 150W Azul',
    precioOriginal: 80.00,
    precioConDescuento: 40.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago4.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 15,
    nombre: 'Soldadora Inverter Indura 200Pro 110/220V',
    precioOriginal: 280.00,
    precioConDescuento: 160.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago5.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 16,
    nombre: 'Pulidora Inalámbrica Tekno Pro 18V',
    precioOriginal: 220.00,
    precioConDescuento: 110.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago6.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 17,
    nombre: 'Cortadora de Cabello Remington Indestructible',
    precioOriginal: 90.00,
    precioConDescuento: 45.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago7.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 18,
    nombre: 'Pistola de Calor Bosch GHG 180 - 1800W',
    precioOriginal: 50.00,
    precioConDescuento: 25.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago8.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 19,
    nombre: 'Podadora de Césped Goodyear a Gasolina',
    precioOriginal: 820.00,
    precioConDescuento: 410.00,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago9.jpg',
    categoria: 'Oferta relámpago',
  },
  {
    id: 20,
    nombre: 'Soldadora Inverter Tekno 130A 120V ',
    precioOriginal: 89.00,
    precioConDescuento: 44.50,
    descuento: 50,
    imagen: 'assets/Recursos/Imagenes/Relampago/relampago10.jpg',
    categoria: 'Oferta relámpago',
  },

  // Liquidación de Temporada
  {
    id: 21,
    nombre: 'Gas Butano LG Products con Soplete 8oz',
    precioOriginal: 180.00,
    precioConDescuento: 54.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion1.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 22,
    nombre: 'Sierra de Mesa Bosch 10" 1700W GTS10-J',
    precioOriginal: 950.00,
    precioConDescuento: 420.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion2.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 23,
    nombre: 'Escalera de Aluminio Indalum Multiposición',
    precioOriginal: 195.00,
    precioConDescuento: 72.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion3.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 24,
    nombre: 'Sierra de Mesa Skil 10" 1600W',
    precioOriginal: 370.00,
    precioConDescuento: 145.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion4.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 25,
    nombre: 'Motosierra Tekno 3,1HP 62cc Espada 22',
    precioOriginal: 260.00,
    precioConDescuento: 88.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion5.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 26,
    nombre: 'Escalera de Aluminio Robinson Multiposición',
    precioOriginal: 465.00,
    precioConDescuento: 205.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion6.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 27,
    nombre: 'Cortadora de Cerámica Bellota 600mm',
    precioOriginal: 280.00,
    precioConDescuento: 78.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion7.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 28,
    nombre: 'Desbrozadora Ducati Garden 2 Tiempos',
    precioOriginal: 590.00,
    precioConDescuento: 290.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion8.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 29,
    nombre: 'Podador para Ramas Tramontina',
    precioOriginal: 130.00,
    precioConDescuento: 32.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion9.jpg',
    categoria: 'Liquidación de Temporada',
  },
  {
    id: 30,
    nombre: 'Pistola de Agua Tekno Inalámbrica a Presión 20V',
    precioOriginal: 228.00,
    precioConDescuento: 86.00,
    descuento: 70,
    imagen: 'assets/Recursos/Imagenes/Liquidacion/liquidacion10.jpg',
    categoria: 'Liquidación de Temporada',
  },
];
    // Configuración inicial
    this.productosFiltrados = this.productos;
    this.totalPaginas = Math.ceil(
      this.productosFiltrados.length / this.productosPorPagina
    );
    this.actualizarProductosPagina();
  }

  buscarProductos(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas las promociones' || producto.categoria === this.categoriaSeleccionada;
      const coincideBusqueda = producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
    this.totalPaginas = Math.ceil(this.productosFiltrados.length / this.productosPorPagina);
    this.paginaActual = 1; // Reiniciar a la primera página al buscar o filtrar
    this.actualizarProductosPagina();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarProductosPagina();
  }

  actualizarProductosPagina(): void {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPagina = this.productosFiltrados.slice(inicio, fin);
  }

  agregarAlCarrito(producto: Producto): void {
    const itemExistente = this.carrito.find((item) => item.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
    this.actualizarCarrito();
  }

  productoAnadido(producto: Producto): boolean {
    return this.carrito.some((item) => item.producto.id === producto.id);
  }

  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter((item) => item.producto.id !== producto.id);
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    this.carrito.forEach((item) => {
      if (item.cantidad < 1) {
        item.cantidad = 1;
      } else if (item.cantidad > 20) {
        item.cantidad = 20;
      }
    });
    this.totalCarrito = this.carrito.reduce(
      (acc, item) => acc + item.cantidad * item.producto.precioConDescuento,
      0
    );
  }

  abrirCarrito(): void {
    this.mostrarCarrito = true;
  }

  cerrarCarrito(): void {
    this.mostrarCarrito = false;
  }


  
  procederAlPago(): void {
    /* if (!this.usuarioAutenticado) {
       alert('Debe iniciar sesión para proceder con la compra.');
       // Aquí puedes abrir el modal de login si lo tienes implementado
       return;
     }*/
     this.mostrarComprobante = true;
   }
 
   confirmarCompra(): void {
     alert('Compra confirmada. Su comprobante será generado como: ' + this.tipoComprobante);
     this.carrito = []; // Vaciar carrito después de la compra
     this.totalCarrito = 0;
     this.mostrarComprobante = false;
   }
 
   cerrarComprobante(): void {
     this.mostrarComprobante = false;
   }
 
   imprimirFactura(): void {
     alert('Su factura se ha impreso con exito.');
     this.carrito = []; // Vaciar carrito después de la compra
     this.totalCarrito = 0;
     this.mostrarComprobante = false;
   }
 }
 /*
   imprimirFactura(): void {
     const ventanaImpresion = window.open('', '', 'height=700,width=900');
     ventanaImpresion?.document.write(`
       <html>
         <head>
           <title>Factura de Compra</title>
           <style>
             body {
               font-family: 'Poppins', sans-serif;
               padding: 30px;
               color: #333;
             }
             h3, p {
               text-align: center;
             }
             table {
               width: 100%;
               border-collapse: collapse;
               margin-top: 20px;
             }
             th, td {
               border: 1px solid #ddd;
               padding: 10px;
               text-align: center;
             }
             th {
               background-color: #0f143a;
               color: white;
             }
             .total {
               text-align: right;
               margin-top: 20px;
               font-size: 1.2rem;
             }
           </style>
         </head>
         <body>
           <h3>FERRETERÍA JUAN XAVIER</h3>
           <p>Factura Electrónica</p>
           <p><strong>Cliente:</strong> Juan Pérez</p>
           <p><strong>Fecha:</strong> ${this.fechaActual}</p>
           <table>
             <thead>
               <tr>
                 <th>Producto</th>
                 <th>Cantidad</th>
                 <th>Precio Unitario</th>
                 <th>Subtotal</th>
               </tr>
             </thead>
             <tbody>
               ${this.carrito.map(item => `
                 <tr>
                   <td>${item.producto.nombre}</td>
                   <td>${item.cantidad}</td>
                   <td>$${item.producto.precio.toFixed(2)}</td>
                   <td>$${(item.cantidad * item.producto.precio).toFixed(2)}</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>
           <p class="total"><strong>Total:</strong> $${this.totalCarrito.toFixed(2)}</p>
         </body>
       </html>
     `);
     ventanaImpresion?.document.close();
     ventanaImpresion?.print();
   }
 }
 */

