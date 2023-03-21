import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [

  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar !: ElementRef<HTMLInputElement>;

  constructor ( private gifsService : GifsService ) {}


  buscar() {
    //se borra el texto al pulsar enter
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs( valor ); //enviamos al servicio la busqueda

    this.txtBuscar.nativeElement.value = '';

  }
}
