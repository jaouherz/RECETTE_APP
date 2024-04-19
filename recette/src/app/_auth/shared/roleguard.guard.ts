import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(): boolean {
    const isAdmin = this.auth.isAdmin();
    if (!isAdmin) {
      alert('You are not an admin you are logged out');
this.auth.onlogout();
      this.router.navigate(['/login']);
    }
    return isAdmin;
  }


}
