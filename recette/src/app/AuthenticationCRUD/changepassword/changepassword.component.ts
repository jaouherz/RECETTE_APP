import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserRegisterService} from "../../services/user-register.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {


  constructor(private userService: UserService,
              private userauthservice: UserAuthService,
              private  router : Router,

              private userregisterservice:UserRegisterService
              ) {
  }

  ngOnInit(): void {
  }

  changepass(changepassform: NgForm) {
    const pass1=changepassform.value['newPassword'];
    const pass2=changepassform.value['confirmPassword'];
    const pass3=changepassform.value['currentPassword'];
    if(pass1==="" || pass2===""|| pass2===""){

      return alert("les champs sont obligatoire ");}
    if(!this.isValidPassword(pass1)){
      return alert(" Votre mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre. ")


    }
    if(pass1!=pass2){return alert("les mot de pass ne correspond pas ")}
    else {
    this.userService.changepass(changepassform.value).subscribe(
      (response:any) => {
        if(response==null){alert("le mot de passe actuel est invalide")}else{
        console.log(response.email);
        console.log(response.newPassword);
alert(response.msg);
this.onlogout()
this.router.navigate(['/login']);}
      },
      (error) => {
        console.log(error);
      }
    );
  }}
  public onlogout() {



    const token = localStorage.getItem('jwtToken');
    this.userauthservice.clear();
    if (token) {
      this.userService.logout(token).subscribe(
        () => {
          localStorage.removeItem('jwtToken');


        },
        error => console.error(error)
      );
    }

  }
  isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return pattern.test(password);
  }
}
