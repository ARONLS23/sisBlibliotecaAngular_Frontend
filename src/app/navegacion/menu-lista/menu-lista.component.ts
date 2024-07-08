import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy{

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario?: boolean;
  usuarioSuscription?: Subscription;

  constructor(private seguridadService: SeguridadService){}

  ngOnInit():void{
    this.usuarioSuscription = this.seguridadService.seguridadCambio.subscribe(status =>{
      this.estadoUsuario = status;
    });
  }

  onCerrarMenu(){
    this.menuToggle.emit();
  }

  terminarSesionMenu(){
    this.seguridadService.logOut();
  }

  ngOnDestroy(): void{
    this.usuarioSuscription?.unsubscribe();
  }

}
