import {Component, OnInit} from '@angular/core';
import {Users} from "../../users";
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../services/user-register.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProjectsService} from "../../services/projects.service";
import {Project} from "../../project";
import {Projects} from "@angular/cli/lib/config/workspace-schema";
interface projectinfo{
id:string ;
  name: string;
  description: string;
  url: string;
domaine : string

  dpt_file_name: string;
  tu_file_name: string;
  datedajout: Date;
  date: Date;
  time: Date;
  etat:string;
}
@Component({
  selector: 'app-listproject',
  templateUrl: './listproject.component.html',
  styleUrls: ['./listproject.component.css']
})
export class ListprojectComponent implements OnInit {
  public projects: projectinfo[] = [];
  isLoading = false;
  email!:string;
  user!:Users;
  isrecette:boolean=false;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService,
  private projectservice : ProjectsService) {
  }
  ngOnInit(): void {

    this.email = localStorage.getItem('email')!;

    this.userService.getuserbymail(this.email).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user.role)
        if (this.user.role==="orga"){
            this.getprojectbyorgaemail(this.email)
        } else{
          this.isrecette=true;
          this.getprojects()
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }
  public getprojects(): void {
    this.isLoading = true;
    this.projectservice.getprojects().subscribe(
      (response: projectinfo[]) => {

        this.projects = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getprojectbyorgaemail(email:string): void {
    this.isLoading = true;

    this.projectservice.getprojectbyemailorga(email).subscribe(
      (response: projectinfo[]) => {

        this.projects = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  updateEmployee(id: string){
    this.router.navigate(['/updateprojects', id]);
  } planifier(id: string){
    this.router.navigate(['/addseance', id]);
  }
  infoproject(id: string){
    this.router.navigate(['/infoproject', id]);
  }

  deleteproject(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {

    this.projectservice.deleteproject(id).subscribe(  (response: any) => {
        console.log(response);
      if(response===true){
        this.getprojects();
        alert("le projet a été bien supprimé");
      }else{alert("impossible de supprimer ce projet car il existe des seances qui utilisent ce projet veuillez supprimer  ces seances puis supprimés les projets")}
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );}
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: projectinfo[] = [];
    for (const user of this.projects) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.description.toLowerCase().indexOf(key.toLowerCase()) !== -1

        || user.etat.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.projects = results;
    if (results.length === 0 || !key) {
      this.getprojects();
    }
  }
}
