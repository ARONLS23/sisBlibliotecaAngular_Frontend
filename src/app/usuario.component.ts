import { Component } from "@angular/core";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent{
  usuarios = ['Aron', 'Daniel', 'Jimena'];
  usuarioNombre  = '';
  visible = false;

  constructor (){
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }

  onAgregar(){
    this.usuarios.push(this.usuarioNombre);
  }

}
