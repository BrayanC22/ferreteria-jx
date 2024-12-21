
import { Component, OnInit } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
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
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
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

  categorias: string[] = ['Todos los productos', 'Herramientas Electricas', 'Herramientas Manuales', 'Construcción y Jardineria', 'Materiales para el Hogar'];
  categoriaSeleccionada: string = 'Todos los productos';
  terminoBusqueda: string = '';
  productosPorPagina: number = 8;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  fechaActual: string = new Date().toLocaleDateString();

  constructor() {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarPromociones();
    this.buscarProductos(); // Mantener los productos filtrados actualizados desde el inicio
  }


  cargarProductos(): void {
    this.productos = [
      // Herramientas Eléctricas
      {
        id: 1,
        nombre: 'Taladro Percutor',
        precio: 95.99,
        imagen: '../../assets/Recursos/Imagenes/Electricas/taladro.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 2,
        nombre: 'Sierra Circular',
        precio: 120.49,
        imagen: '../../assets/Recursos/Imagenes/Electricas/sierra.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 3,
        nombre: 'Lijadora Orbital',
        precio: 130.25,
        imagen: '../../assets/Recursos/Imagenes/Electricas/lijadora.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 4,
        nombre: 'Amoladora Angular',
        precio: 85.75,
        imagen: '../../assets/Recursos/Imagenes/Electricas/amoladora.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 5,
        nombre: 'Pistola de Calor Black+Decker',
        precio: 60.99,
        imagen: '../../assets/Recursos/Imagenes/Electricas/pistolacalor.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 6,
        nombre: 'Soldadora Inverter',
        precio: 140.30,
        imagen: '../../assets/Recursos/Imagenes/Electricas/soldadora.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 7,
        nombre: 'Taladro Atornillador',
        precio: 110.50,
        imagen: '../../assets/Recursos/Imagenes/Electricas/taladroatornillador.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 8,
        nombre: 'Sierra de Calar',
        precio: 78.20,
        imagen: '../../assets/Recursos/Imagenes/Electricas/sierracalar.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 9,
        nombre: 'Cortadora de Metal',
        precio: 180.60,
        imagen: '../../assets/Recursos/Imagenes/Electricas/cortadorametal.jpg',
        categoria: 'Herramientas Electricas',
      },
      {
        id: 10,
        nombre: 'Pulidora Angular',
        precio: 89.40,
        imagen: '../../assets/Recursos/Imagenes/Electricas/pulidora.jpg',
        categoria: 'Herramientas Electricas',
      },
  
      // Herramientas Manuales
      {
        id: 11,
        nombre: 'Martillo de Carpintero',
        precio: 15.89,
        imagen: '../../assets/Recursos/Imagenes/Manuales/martillo.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 12,
        nombre: 'Alicate de Corte Truper',
        precio: 12.99,
        imagen: '../../assets/Recursos/Imagenes/Manuales/alicate.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 13,
        nombre: 'Llave Inglesa',
        precio: 18.20,
        imagen: '../../assets/Recursos/Imagenes/Manuales/llavein.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 14,
        nombre: 'Serrucho para Madera',
        precio: 22.50,
        imagen: '../../assets/Recursos/Imagenes/Manuales/serrucho.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 15,
        nombre: 'Destornillador',
        precio: 10.75,
        imagen: '../../assets/Recursos/Imagenes/Manuales/destornillador.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 16,
        nombre: 'Cinta Métrica',
        precio: 8.30,
        imagen: '../../assets/Recursos/Imagenes/Manuales/cintametrica.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 17,
        nombre: 'Tenaza Universal',
        precio: 19.40,
        imagen: '../../assets/Recursos/Imagenes/Manuales/tenaza.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 18,
        nombre: 'Llave de Cruz Automotriz',
        precio: 30.99,
        imagen: '../../assets/Recursos/Imagenes/Manuales/llavecruz.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 19,
        nombre: 'Cuchillo Retráctil',
        precio: 14.50,
        imagen: '../../assets/Recursos/Imagenes/Manuales/cuchillo.jpg',
        categoria: 'Herramientas Manuales',
      },
      {
        id: 20,
        nombre: 'Cincel',
        precio: 9.99,
        imagen: '../../assets/Recursos/Imagenes/Manuales/cincel.jpg',
        categoria: 'Herramientas Manuales',
      },
  
      // Construcción y Jardinería
      {
        id: 21,
        nombre: 'Carretilla de Construcción',
        precio: 45.50,
        imagen: '../../assets/Recursos/Imagenes/Construccion/carretilla.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 22,
        nombre: 'Rastrillo para Jardín',
        precio: 20.75,
        imagen: '../../assets/Recursos/Imagenes/Construccion/rastrillo.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 23,
        nombre: 'Pala para Excavación',
        precio: 25.99,
        imagen: '../../assets/Recursos/Imagenes/Construccion/pala.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 24,
        nombre: 'Tijeras para Podar',
        precio: 18.20,
        imagen: '../../assets/Recursos/Imagenes/Construccion/tijeraspodar.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 25,
        nombre: 'Regadera',
        precio: 22.00,
        imagen: '../../assets/Recursos/Imagenes/Construccion/regadera.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 26,
        nombre: 'Manguera para Jardín 15m',
        precio: 35.99,
        imagen: '../../assets/Recursos/Imagenes/Construccion/manguera.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 27,
        nombre: 'Cortacésped Manual',
        precio: 150.25,
        imagen: '../../assets/Recursos/Imagenes/Construccion/cortacesped.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 28,
        nombre: 'Nivel de Albañil',
        precio: 12.40,
        imagen: '../../assets/Recursos/Imagenes/Construccion/nivel.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 29,
        nombre: 'Andamio Plegable',
        precio: 250.99,
        imagen: '../../assets/Recursos/Imagenes/Construccion/andamio.jpg',
        categoria: 'Construcción y Jardineria',
      },
      {
        id: 30,
        nombre: 'Mazo de Goma',
        precio: 14.25,
        imagen: '../../assets/Recursos/Imagenes/Construccion/mazo.jpg',
        categoria: 'Construcción y Jardineria',
      },
  
      // Materiales para el Hogar
      {
        id: 31,
        nombre: 'Juego de Llaves Allen',
        precio: 18.25,
        imagen: '../../assets/Recursos/Imagenes/Hogar/llavesallen.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 32,
        nombre: 'Nivel de metal',
        precio: 8.99,
        imagen: '../../assets/Recursos/Imagenes/Hogar/nivelburbuja.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 33,
        nombre: 'Cinta Adhesiva para Reparación',
        precio: 5.50,
        imagen: '../../assets/Recursos/Imagenes/Hogar/cinta.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 34,
        nombre: 'Caja Organizadora Plástica',
        precio: 22.40,
        imagen: '../../assets/Recursos/Imagenes/Hogar/cajaplastica.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 35,
        nombre: 'Cepillo de Mano',
        precio: 10.00,
        imagen: '../../assets/Recursos/Imagenes/Hogar/cepillo.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 36,
        nombre: 'Cubeta de Pintura',
        precio: 12.80,
        imagen: '../../assets/Recursos/Imagenes/Hogar/cubeta.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 37,
        nombre: 'Escalera de Aluminio',
        precio: 60.75,
        imagen: '../../assets/Recursos/Imagenes/Hogar/escalera.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 38,
        nombre: 'Mango Extensible para Pintura',
        precio: 9.99,
        imagen: '../../assets/Recursos/Imagenes/Hogar/mango.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 39,
        nombre: 'Juego de Brochas para Pintar',
        precio: 15.00,
        imagen: '../../assets/Recursos/Imagenes/Hogar/brochas.jpg',
        categoria: 'Materiales para el Hogar',
      },
      {
        id: 40,
        nombre: 'Esponja Multiusos',
        precio: 2.50,
        imagen: '../../assets/Recursos/Imagenes/Hogar/esponja.jpg',
        categoria: 'Materiales para el Hogar',
      },
    ];
  
    // Configuración inicial
    this.productosFiltrados = this.productos;
    this.totalPaginas = Math.ceil(
      this.productosFiltrados.length / this.productosPorPagina
    );
    this.actualizarProductosPagina();
  }
  
  cargarPromociones(): void {
    this.promociones = [
      {
        id: 1,
        titulo: 'Promoción Especial 1',
        descripcion: 'Descuento en herramientas eléctricas.',
        imagen: 'https://via.placeholder.com/400x200?text=Promoción+1'
      },
      {
        id: 2,
        titulo: 'Promoción Especial 2',
        descripcion: '3x2 en pinturas seleccionadas.',
        imagen: 'https://via.placeholder.com/400x200?text=Promoción+2'
      },
      {
        id: 3,
        titulo: 'Promoción Especial 3',
        descripcion: 'Hasta 40% en materiales de construcción.',
        imagen: 'https://via.placeholder.com/400x200?text=Promoción+3'
      }
    ];
  }

  buscarProductos(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todos los productos' || producto.categoria === this.categoriaSeleccionada;
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
      (acc, item) => acc + item.cantidad * item.producto.precio,
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



