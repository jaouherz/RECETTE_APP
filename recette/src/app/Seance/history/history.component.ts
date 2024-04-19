import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User2} from "../../User2";
import {HttpErrorResponse} from "@angular/common/http";
import {SeanceService} from "../../services/seance.service";
interface History{

  dateopeartion:Date;
  nomoperation:string;
  nomprojet:string;
  id:number;
  idprojet:number;



}
interface projectinfo {
  id: string;
  name: string;
  description: string;
  url: string;
  domaine:string ;

  dpt_file_name: string;
  tu_file_name: string;
  datedajout: Date;
  date: Date;
  time: Date;

}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public projectidtoupdate: number = 0;
  project: projectinfo[] = [];
  selectedEmail!: string;
  selectedintervenat: string[] = [];
  selectedProject!: string;
  filteredProjects: projectinfo[] = [];
  intervenant!:User2[];
  emails: string[] = ['jaouher2002@gmail.com', 'email2@example.com', 'email3@exam25252ple.com', 'email4@ex5252ample.com'];
  showProjectList: boolean = true; // Add flag to track whether to display the project list
 history!: History[];
  constructor(private userService: UserService, private projectservice: ProjectsService, private router: Router, private route: ActivatedRoute,private seanceservice:SeanceService) { }

  ngOnInit(): void {
    this.projectservice.getprojects().subscribe(
      data2 => {
        console.log(data2)
        this.project = data2;
        console.log(this.project)
      }, error => console.log(error));

  }



  gotolist() {
    this.router.navigate(['/list']);
  }

  search() {
    this.filteredProjects = this.project.filter(project =>
      project.name.toLowerCase().includes(this.selectedProject.toLowerCase())
    );

    if (this.selectedProject.trim().length > 0) {
      this.showProjectList = true;
    } else {
      this.showProjectList = false;
    }
  }

  selectProject(id: string,name:string) {
    this.selectedProject = name;
    this.projectidtoupdate = parseInt(id);
    this.showProjectList = false;
    this.gethistory(this.projectidtoupdate)
  }


  onProjectSelected() {
    // Hide the project list after a selection is made
    this.showProjectList = false;
  }
  getUsersByRole_intervenant(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.intervenant = data;
      })
    console.log(this.intervenant)
  }
  onCheckboxChange(email: string) {
    const index = this.selectedintervenat.indexOf(email);
    if (index > -1) {
      this.selectedintervenat.splice(index, 1); // remove the email from the array
    } else {
      this.selectedintervenat.push(email); // add the email to the array
    }
    console.log(this.selectedintervenat); // log the selected emails to the console
  }
  public gethistory(id:number): void {

    this.seanceservice.getseancehistory(id).subscribe(
      (response: History[]) => {

        this.history = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
