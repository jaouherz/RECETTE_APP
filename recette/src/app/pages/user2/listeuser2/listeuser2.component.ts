import {Component, OnInit} from '@angular/core';
import {Users} from "../../../users";
import {UserService} from "../../../services/user.service";
import {UserAuthService} from "../../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../../services/user-register.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {User2} from "../../../User2";

@Component({
  selector: 'app-listeuser2',
  templateUrl: './listeuser2.component.html',
  styleUrls: ['./listeuser2.component.css']
})
export class Listeuser2Component implements OnInit {
  public users: User2[] = []
  public editUsers: any = null;
  usera!: User2;
  user5!: User2;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService) {
  }

  ngOnInit(): void {
    this.getusers();

  }



  public getusers(): void {
    this.userService.getusers2().subscribe(
      (response: User2[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteuserr(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.userService.deleteUser2(id).subscribe(  (response: any) => {
          console.log(response);
          if(response===true){
            this.getusers();
            alert("le domaine a été bien supprimé");}else{alert("impossible de supprimer ce profile car il existe des domaine qui utilisent ce user veuillez supprimer  ces domaines puis supprimés le profile")}
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }}
  updateEmployee(id: number){
    this.router.navigate(['updateuser2/', id]);
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: User2[] = [];
    for (const user of this.users) {
      if (user.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.profile.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getusers();
    }
  }

}
