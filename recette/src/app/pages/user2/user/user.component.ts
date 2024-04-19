import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ProjectsService} from "../../../services/projects.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Users} from "../../../users";
import {Domaine} from "../../../Domain";
import {catchError, map, Observable, of} from "rxjs";
interface addprojectdata{

  name: string;
  description: string;
  url: string;

  domaine:string;
  dpt_id: File;
  T_U: File;

  envi:string;
  intervention:string;

}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Users[] = [];

  intervention: boolean = false;
  envi: boolean = false;

  isLoading = false;

  constructor(private userService: UserService, private projectservice: ProjectsService  , private router: Router ) {}

  ngOnInit(): void {


    console.log(this.users)

  }

  adduser2(user2form: NgForm) {
    this.isLoading = true;
    const firstname=user2form.value['firstname'];
    const lastname=user2form.value['lastname'];
    const email=user2form.value['email'];
    const profil=user2form.value['profile'];
    if( firstname===""|| lastname===""|| email===""|| profil===""){
    alert('Tous les champs avec (*) sont obligatoires')
      this.isLoading = false;


    }else  if (!(this.isAlphabetical(firstname))){
      alert("Le nom doit être alphabétique")
      this.isLoading = false;
    }else
    if (!(this.isAlphabetical(lastname))){
      alert("Le prénom doit être alphabétique")
      this.isLoading = false;
    }else
    if(!(this.isValidEmail(email))){
      alert("L'adresse e-mail doit avoir un format valide.")
      this.isLoading = false;
    }else{
    this.existUser(user2form).subscribe((exists: boolean) => {
      if (exists) {
        alert('This user already exists.');
        this.isLoading = false;
      } else {
    this.userService.registeruser2(user2form.value).subscribe(
      (response: any) => {
        console.log(response);
if (response!=null){

       alert("Le profile a été ajouté avec succès");
          this.gotolist();
  this.isLoading = false;
        }else{alert("impossible d'ajouter le profile");
  this.isLoading = false;}
      },
      (error) => {
        console.log(error);
      }
    );}});}
  }







  gotolist() {
    this.router.navigate(['/list']);
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
  isAlphabetical(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
  isValidEmail(email: string): boolean {

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(email);
  }
}





