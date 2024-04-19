import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecetteGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(): boolean {
    const isrecette = this.auth.isrecette();

    if (!isrecette) {
      alert("you don't have rectte role you are logged out");

      this.router.navigate(['/login']);
    }
    return isrecette;
  }


}
