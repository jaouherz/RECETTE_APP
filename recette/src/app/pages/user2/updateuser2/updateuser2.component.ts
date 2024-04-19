import {Component, OnInit} from '@angular/core';
import {Users} from "../../../users";
import {UserService} from "../../../services/user.service";
import {ProjectsService} from "../../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {User2} from "../../../User2";

@Component({
  selector: 'app-updateuser2',
  templateUrl: './updateuser2.component.html',
  styleUrls: ['./updateuser2.component.css']
})
export class Updateuser2Component implements OnInit {

  users: Users[] = [];
  user2!:User2;
  intervention: boolean = false;
  envi: boolean = false;
  useridtoupdate!:number;
  isLoading = false;
exist:boolean=false;
email!:string
  constructor(private userService: UserService, private projectservice: ProjectsService
              , private router: Router,   private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.useridtoupdate=this.route.snapshot.params['id'];
    this.userService.getuser2detailsbyid(this.useridtoupdate).subscribe(
      data =>{console.log(data)
        this.user2=data
        this.email=this.user2.email;
        console.log(this.existuser(this.user2.email));
      },error => console.log(error));










  }

 adduser2(user2form: NgForm) {this.isLoading = true;
   const firstname=this.user2.firstname;
   const lastname=this.user2.lastname;
   const email=this.user2.email;
   if( firstname===""|| lastname===""|| email==="" ) {
     alert('Tous les champs avec (*) sont obligatoires')
     this.isLoading = false;

   }else
   if (!(this.isAlphabetical(firstname))){
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

   if(this.email!=user2form.value['email']){
   this.userService.getuser2bymail2(user2form.value['email'])
     .subscribe(
       (response: any) => {
         this.exist = false;
         if (response == null) {
           this.userService.updateuser2(this.useridtoupdate, user2form.value).subscribe(
             (response: any) => {
               console.log(response);
               if (response != null) {
                 alert("Le profile a été mise à jour");
                 this.isLoading = false;
                 this.email=user2form.value['email'];
               } else {
                 alert("impossible d'ajouter le profile");
                 this.isLoading = false;
               }
             },
             (error) => {
               console.log(error);
             }
           );
         } else {
           alert("this user exist");
           this.isLoading = false;
         }
       }, (error) => {
         console.log("no");

       }
     );

 }else {

   this.userService.updateuser2(this.useridtoupdate, user2form.value).subscribe(
     (response: any) => {
       console.log(response);
       if (response != null) {
         alert("Le profile a été mise à jour");
         this.gotolist()
         this.isLoading = false;
       } else {
         alert("impossible d'ajouter le profile");
         this.isLoading = false;
       }
     },
     (error) => {
       console.log(error);
     }
   );}}
 }


  gotolist() {
    this.router.navigate(['/listuser2']);
  }
  existuser(email:string){
    this.userService.getuser2bymail2(email)
      .subscribe(
        (response: any) => {
          console.log(response)

        }, (error) => {
          console.log(error);

        }
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
