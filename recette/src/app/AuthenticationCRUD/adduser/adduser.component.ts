import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../services/user-register.service";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  existinguser!:boolean;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService) {
  }
  ngOnInit(): void {

  }

  register(registerform: NgForm) {

    this.existUser(registerform).subscribe((exists: boolean) => {
      if (exists) {
        alert('This user already exists.');
      } else {
    this.userService.register(registerform.value).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response.id);
        console.log(response.firstname);
        console.log(response.lastname);
        console.log(response.email);
        console.log(response.role);

        alert(response.firstname +" "+response.lastname +" " + 'added succesfully')
        this.gotolist()
      },
      (error) => {
        console.log(error);
      }
    );}});
  }
  existUser(form: NgForm): Observable<boolean> {
    return this.userService.getuserbymail(form.value['email'])
      .pipe(
        map((response: any) => {
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
  verifi(registerform: NgForm){

    const firstname=registerform.value['firstname'];
    const lastname=registerform.value['lastname'];
    const email=registerform.value['email'];
    const role=registerform.value['role'];
    if( firstname===""|| lastname===""|| email===""|| role===""){
      alert('Tous les champs avec (*) sont obligatoires')



    }
else {
      if (!(this.isAlphabetical(firstname))){
        alert("Le nom doit être alphabétique")
      }else
      if (!(this.isAlphabetical(lastname))){
        alert("Le prénom doit être alphabétique")
      }else
if(!(this.isValidEmail(email))){
  alert("L'adresse e-mail doit avoir un format valide.")
}
     else this.register(registerform)
        }
  }
  isAlphabetical(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
  isValidEmail(email: string): boolean {

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(email);
  }
  isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return pattern.test(password);
  }
  gotolist() {
    this.router.navigate(['/register']);
  }
}
