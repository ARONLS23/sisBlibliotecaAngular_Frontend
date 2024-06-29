import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {
  constructor(private seguridadService: SeguridadService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSeguridad = this.seguridadService.obtenerToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad),
    });
    return next.handle(request);
  }
}
