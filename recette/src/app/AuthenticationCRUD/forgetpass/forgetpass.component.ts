import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
showalert: boolean=false;
  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router) {
  }


  ngOnInit(): void {
  }
  forgetpass(forgetform: NgForm) {
    this.existUser(forgetform).subscribe((exists: boolean) => {
      if (exists) {
    this.userService.forgetpass(forgetform.value).subscribe(
      (response:any) => {

        console.log(response);
        alert("Veuillez consulter votre boite E-mail")
        this.router.navigate(['/login']);

      },
      (error) => {
        console.log(error);
      }
    );}else {this.showalert=true;}});
  }
  existUser(form: NgForm): Observable<boolean> {
    return this.userService.getuser2bymail2(form.value['email'])
      .pipe(
        map((response: any) => {
          console.log(response)
          if (response == null) {
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
}
