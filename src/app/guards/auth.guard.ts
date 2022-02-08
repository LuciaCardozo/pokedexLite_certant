import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiPokemonService } from '../services/api-pokemon.service';
import { ToastService } from '../services/toast.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router:Router, private toastService:ToastService, private authSvb:ApiPokemonService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authSvb.isLogged){
      return true;
    }
    this.router.navigateByUrl('/login');
    this.toastService.show("Acceso denegado, inicie sesion", {classname:'bg-warning', "delay":"5000"});
    return false;
  }
  
}