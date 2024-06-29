import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LibrosComponent } from './libros/libros.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { isUser } from './seguridad/seguridad.router';
import { BooksComponent } from './books/books.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
  { path:'', component: InicioComponent, canActivate:[isUser] },
  { path:'libros', component: LibrosComponent },
  { path:'registrar', component: RegistrarComponent },
  { path:'login', component: LoginComponent },
  { path:'books', component: BooksComponent, canActivate:[isUser] },
  { path:'autores', component: AutoresComponent, canActivate:[isUser] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
