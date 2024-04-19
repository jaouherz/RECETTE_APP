import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {SeanceService} from "../services/seance.service";
import {count} from "rxjs";
import {ProjectsService} from "../services/projects.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
isrecette:boolean=false
  issuperadm:boolean=false
  email!:string;
notif!:number;
  notif2!:number;
  constructor(private userauthservice: UserAuthService, private router: Router, private userService: UserService,private seanceservice: SeanceService,    private projectservice: ProjectsService) {
  }
  ngOnInit(): void {
    this.isrecette=this.userauthservice.isrecette()
    this.issuperadm=this.userauthservice.issuperadm()
    this.email = localStorage.getItem('email')!;
    this.seanceservice.getSeancesCount(this.email, '-', 'séance terminée')
      .subscribe(count =>{
          this.notif = count;
        console.log(this.notif)
        }

      );
    this.projectservice.getprojectcount('Retour recette')
      .subscribe(count2 =>{
          this.notif2 = count2;
          console.log(this.notif2)
        }

      );


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





}
