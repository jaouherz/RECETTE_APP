import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../services/user-register.service";
import {ProjectsService} from "../../services/projects.service";
import {HttpErrorResponse} from "@angular/common/http";
interface domaininfo{
  id:number;
  name: string;
  vav_metier:string;
  respmetier:string;

  vav_orga:string;
  respEtude:string;
  vav_etude:string;
  resorga: string ;


}
@Component({
  selector: 'app-listedomaine',
  templateUrl: './listedomaine.component.html',
  styleUrls: ['./listedomaine.component.css']
})
export class ListedomaineComponent implements OnInit {
  public domaines: domaininfo[] = [];
  isLoading = false;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService,
              private projectservice : ProjectsService) {
  }
  ngOnInit(): void {
    this.getdomaines()
  }
  public getdomaines(): void {
    this.isLoading = true;
    this.projectservice.getdomains().subscribe(
      (response: domaininfo[]) => {

        this.domaines = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  updateEmployee(id: number){
    this.router.navigate(['/updatedomaine', id]);
  }
  deleteproject(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce domaine ?')) {
      this.projectservice.deletedomain(id).subscribe(  (response: any) => {
          console.log(response);
           if(response===true){
          this.getdomaines();
          alert("le domaine a été bien supprimé");}else{alert("impossible de supprimer ce domaine car il existe des projets qui utilisent ce domaine veuillez supprimer  ces projets puis supprimés le domaine")}
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }}

  public searchEmployees(key: string): void {
    console.log(key);
    const results: domaininfo[] = [];
    for (const user of this.domaines) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.vav_orga.toLowerCase().indexOf(key.toLowerCase()) !== -1

        || user.resorga.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.vav_metier.toLowerCase().indexOf(key.toLowerCase()) !== -1

        || user.respmetier.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.vav_etude.toLowerCase().indexOf(key.toLowerCase()) !== -1

        || user.respEtude.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.domaines = results;
    if (results.length === 0 || !key) {
      this.getdomaines();
    }
  }

}
