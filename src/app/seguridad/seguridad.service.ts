import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario | null = null;
  basUrl = environment.baseUrl;
  private token: string | undefined;

  obtenerToken() {
    return this.token;
  }

  cargarUsuario() {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }
    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.http
      .get<Usuario>(this.basUrl + 'api/usuario')
      .subscribe((response) => {
        console.log('login respuesta', response);
        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token);
      });
  }

  constructor(private router: Router, private http: HttpClient) {}

  registrarUsuario(user: Usuario): void {
    this.http
      .post<Usuario>(this.basUrl + 'api/usuario/registrar', user)
      .subscribe((response) => {
        console.log(user);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
    /* this.usuario = {
      email: user.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: user.nombre,
      apellidos: user.apellidos,
      username: user.username,
      password: '',
      token: '',
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']); */
  }

  login(loginData: LoginData): void {
    this.http
      .post<Usuario>(this.basUrl + 'api/usuario/login', loginData)
      .subscribe((response) => {
        console.log('login respuesta', response);
        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  logOut() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion() {
    return this.token != null;
  }
}
