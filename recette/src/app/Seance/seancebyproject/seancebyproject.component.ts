import {Component, OnInit} from '@angular/core';
import {Users} from "../../users";
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../services/user-register.service";
import {ProjectsService} from "../../services/projects.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Seance3} from "../seanceliste/seanceliste.component";
import {SeanceService} from "../../services/seance.service";

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
  selector: 'app-seancebyproject',
  templateUrl: './seancebyproject.component.html',
  styleUrls: ['./seancebyproject.component.css']
})
export class SeancebyprojectComponent implements OnInit {
  public projects: projectinfo[] = [];
  isLoading = false;
  email!:string;
  projectid!:number;
  user!:Users;
  isrecette:boolean=false;
  issuperadm:boolean=false;
  seance2!:Seance3[];
  selectedProject: string="";
  click:boolean=false
  nameproject!:string
  counter: number = 0;
  showSeances: boolean = false;
  selectedProjectId: string="";
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService,
              private projectservice : ProjectsService,private seanceservice: SeanceService) {
  }
  ngOnInit(): void {

    this.email = localStorage.getItem('email')!;

    this.userService.getuserbymail(this.email).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user.role)
        if (this.user.role==="orga"){
          this.getprojectbyorgaemail(this.email)
        } else if(this.user.role==="recette"){
          this.isrecette=true;
          this.getprojects()
        } else { this.issuperadm=true;
          this.getprojects()
        }
      },
      (error) => {
        console.log(error);
      }
    );
console.log(this.selectedProjectId)
  }

  getseances4(id: string) {

    this.seanceservice.getseancesbyproject(parseInt(id)).subscribe((data2: Seance3[]) => {

if(data2==null){
  this.seance2=[]

}else {this.seance2 = data2;}
      console.log(this.seance2); // Log the data array
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
  click2(){
    this.showSeances=!this.showSeances


  }
  toggleSessions(project: string) {
    this.projectid=parseInt(project);
    if (this.selectedProject === project) {
      this.showSeances = false;
      this.selectedProject = "";

    } else {
      this.selectedProject = project;
      this.showSeances = true;
      this.getseances4(project);
    }
  }
  selectedProjectIdfn(project:string){
    this.selectedProjectId=project
    console.log(this.selectedProjectId)
  }
  deleteSeance(id:number) {

    if (confirm('Voulez-vous vraiment supprimer cette seance ?')) {
      this.seanceservice.deleteproject(id).subscribe((response: any) => {
        if(response===true){alert("Séance supprimée avec succès");console.log(response);
          this.getprojects();}else{alert("impossible de supprimer cette seance")}
        console.log(id);

      });
    }}
  updateseance(id: number){
    this.router.navigate(['/updateseance', id]);
  }
  addfeedback(id: number){
    this.router.navigate(['/feedback', id]);
  }
  deletefeedback(id: number){
    if (confirm('Voulez-vous vraiment supprimer ce Feedback ?')) {
      this.seanceservice.deletefeed(id).subscribe((response: any) => {
        if(response===true){
          alert("Séance supprimée avec succès");console.log(response);
          this.getprojects();
        }else{alert("impossible de supprimer ce feedback")}

        console.log(id);

      });
    }
  }
}
