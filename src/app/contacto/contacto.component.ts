import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  mensajeExito: boolean = false; // Variable para mostrar el mensaje

  constructor() { }

  ngOnInit(): void { }

  enviarMensaje(): void {
    // Muestra el mensaje de éxito
    this.mensajeExito = true;

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000);
  }
}
