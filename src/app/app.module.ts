import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './libro/libro.component';
import { FormsModule } from '@angular/forms';
import { LibrosService } from './services/libros.service';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './seguridad/seguridad.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { BooksNuevoComponent } from './books/Agregar/books-nuevo/books-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutoresNuevoComponent } from './autores/Agregar/autores-nuevo/autores-nuevo.component';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LibrosComponent,
    LibroComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent,
    BooksNuevoComponent,
    AutoresComponent,
    AutoresNuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi:true
    },
    LibrosService,
    SeguridadService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
