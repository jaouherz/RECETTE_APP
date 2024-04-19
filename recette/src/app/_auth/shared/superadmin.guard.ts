import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(): boolean {
    const isrecette = this.auth.issuperadm();

    if (!isrecette) {
      alert("you don't have super admin role , you are logged out");

      this.router.navigate(['/login']);
    }
    return isrecette;
  }
}
