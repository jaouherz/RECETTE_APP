import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  existinguser:boolean=true;
  isLoading = false;
  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router) {
  }

  ngOnInit(): void {
  }

  login(loginform: NgForm) {
    this.isLoading = true;
      this.userService.login(loginform.value).subscribe(
        (response:any) => {
          console.log(response.token);
          console.log(response.role);
        this.userAuthService.setRoles(response.role);
          this.userAuthService.setToken(response.token);
          this.userAuthService.setEmail(response.email);
          console.log(localStorage.getItem('roles'))
          const email=loginform.value['email'];
          const pass=loginform.value['password'];
          if(email==="" || pass===""){
            this.isLoading = false;
            return alert("les champs sont obligatoires ");
          }
            const role1 = response.role;
            if (role1 === 'ADMIN') {
              this.router.navigate(['/register']);
              this.isLoading = false;
            } else if (role1==='recette')
            { this.router.navigate(['/seancebyproject']);
              this.isLoading = false;}else if (role1==='orga')
            { this.router.navigate(['/list']);
              this.isLoading = false;}
else if(role1 === 'adminfn'){this.router.navigate(['/seancebyproject']);this.isLoading = false;}


        },
        (error) => {
          this.existinguser=false;
loginform.value['email']="";
          loginform.value['password']="";
        }
      );
    }
    existuser(loginform: NgForm) {
      this.userService.getuserbymail(loginform.value['email'])
        .subscribe(
          (response: any) => {
            if (response !== null) { this.existinguser= true ;
            }else {this.existinguser=false}
          }, (error) => {
            console.log(error);

          }
        );
    }}
