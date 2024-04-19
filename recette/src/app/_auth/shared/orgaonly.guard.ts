import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrgaonlyGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(): boolean {
    const isorgarecette = this.auth.isorga2();
    const issuperadmin= this.auth.issuperadm()

    if (!isorgarecette&&!issuperadmin) {
      alert("you don't have orga or super admin role you are logged out");

      this.router.navigate(['/login']);
    }
    return isorgarecette;
  }


}
