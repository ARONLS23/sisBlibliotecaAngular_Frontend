import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy{
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario?: boolean;
  usuarioSuscription?: Subscription;

  constructor (private seguridadServicio: SeguridadService) {}

  ngOnInit(): void{
    this.usuarioSuscription =  this.seguridadServicio.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status;
    });
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  ngOnDestroy(): void {
    this.usuarioSuscription?.unsubscribe();
  }

  terminarSesion(){
    this.seguridadServicio.logOut();
  }

}
