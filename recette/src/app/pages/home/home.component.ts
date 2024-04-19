import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Users} from "../../users";
import jwt_decode from "jwt-decode";
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public useridtoupdate: number=0;
  user2!: Users;
  loading!: boolean;
  isadmin:boolean=false;
  email2!:string|null;
  constructor(
    private userauthservice: UserAuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,private location: Location
  ) {}
  ngOnInit(): void {  this.loading = true;
    const email = localStorage.getItem('email');
    this.email2=email;
    if (email !== null) {
      this.userService.getuserbymail(email).subscribe(
        data =>{console.log(data)
          this.user2=data
          this.useridtoupdate=this.user2.id
          this.loading = false;
        },error => console.log(error));
    }
this.isadmin=this.userauthservice.isAdmin()
  }
updateUserjaou() {

  this.userService.updateuserr(this.useridtoupdate,this.user2).subscribe(
    data=>{console.log(data);
alert ("le profile mise a jour")
      this.gotolist();
if(this.user2.email!=this.email2){
this.onlogout()
  this.router.navigate(["/login"])

};
    },error=>console.log(error)) ;}

onSubmit() {

  const firstname=this.user2.firstname
  const lastname=this.user2.lastname
  if( firstname===""|| lastname===""){
    alert('Tous les champs avec (*) sont obligatoires')



  }
  else {
    if (!(this.isAlphabetical(firstname))){
      alert("Le nom doit être alphabétique")
    }else
    if (!(this.isAlphabetical(lastname))){
      alert("Le prénom doit être alphabétique")
    }else{
  this.updateUserjaou();}}
} gotolist() {
    this.router.navigate(['/home']);
  }
  goBack() {
    this.location.back();
  }
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
  isAlphabetical(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
}
