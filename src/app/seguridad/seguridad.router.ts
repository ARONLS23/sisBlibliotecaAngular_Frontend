import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SeguridadService } from "./seguridad.service";

@Injectable({
  providedIn: 'root'
})

export class SeguridadRouter {

  constructor(private seguridadService: SeguridadService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) :boolean {
    if (this.seguridadService.onSesion()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const isUser: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(SeguridadRouter).canActivate(route,state);
}
