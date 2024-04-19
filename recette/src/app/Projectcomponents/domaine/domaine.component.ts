import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {Router} from "@angular/router";
import {Users} from "../../users";
import {User2} from "../../User2";

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit{
  isLoading = false;
  vav_metier1!:User2[];
  respmetier1!:User2[];

  vav_orga1!:Users[];
  respEtude1!:User2[];
  vav_etude1!:User2[];
  resorga1!: User2[] ;
  user2!:User2[]
  selectedorga:string="";
  selectedmetier:string="";
  selectedetude:string="";
  selectedvavmetier:string="";
  selectedvavorga:string="";
  selectedvavetude: string="";
  constructor(private userService: UserService, private projectservice: ProjectsService  , private router: Router ) {}

  ngOnInit(): void {
this.getUsersByRole_vavorga("orga");
this.getUsersByRole_vavmetier("metier");
this.getUsersByRole_vavetude("etude");
this.getUsersByRole_resmetier("resmetier");
    this.getUsersByRole_respetude("resetude");
    this.getUsersByRole_resorga("resorga")

  }
  adddomaine(domainForm: NgForm) {
    this.isLoading=true;
    const nom=domainForm.value['name']
    const vav1=this.selectedorga
    const vav2=this.selectedetude
    const vav3=this.selectedmetier
    const vav4=this.selectedvavetude
    const vav6=this.selectedvavorga
    const vav7=this.selectedvavmetier

      if (nom===""||vav1===""||vav2===""||vav3===""||vav4===""||vav6===""||vav7==="") {
        alert('Tous les champs avec (*) sont obligatoires');
        this.isLoading=false;
      } else {
        this.isLoading = true;
        // assign the selected user's id to the domainForm value before submitting
        domainForm.value.vav_orga = this.selectedvavorga;
domainForm.value.vav_metier=this.selectedvavmetier;
        domainForm.value.vav_etude=this.selectedvavetude;
        domainForm.value.respEtude=this.selectedetude;
        domainForm.value.respmetier=this.selectedmetier;
        domainForm.value.resorga=this.selectedorga;
        this.projectservice.adddomain(domainForm.value).subscribe(
          (response: any) => {
            this.isLoading = false;
            this.isLoading=false;
            alert('le domaine '+response.name + ' a été ajouté avec succès');
          },
          (error) => {
            console.log(error);
          }
        );
      }

  }
  existdomain(domainForm: NgForm): Observable<boolean> {
    return this.projectservice.getdomainbyname(domainForm.value['domaine'])
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
  getUsersByRole_vavmetier(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.vav_metier1 = data;
      })
    console.log(this.vav_metier1)
  }
  getUsersByRole_vavorga(role: string) {
    this.userService.getusersbyrole(role)
      .subscribe((data: Users[]) => {
        this.vav_orga1 = data;
      })
    console.log(this.vav_orga1)
  }
  getUsersByRole_vavetude(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.vav_etude1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_respetude(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.respEtude1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_resorga(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.resorga1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_resmetier(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.respmetier1 = data;
      })
    console.log(this.user2)
  }
}
