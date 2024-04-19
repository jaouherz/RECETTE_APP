import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(){
    if(this.auth.isLoggedIn2()) {
      return true;
}alert("you have to login");
    this.router.navigate(['/login']);
    return false ;
  }

}
