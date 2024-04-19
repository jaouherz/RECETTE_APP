import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrgaroleGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(): boolean {
    const isorgarecette = this.auth.isorga();

    if (!isorgarecette) {
      alert("you don't have orga or recette role you are logged out");

      this.router.navigate(['/login']);
    }
    return isorgarecette;
  }


}
