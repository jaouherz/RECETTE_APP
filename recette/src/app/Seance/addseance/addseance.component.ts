import {Component, OnInit} from '@angular/core';
import {User2} from "../../User2";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SeanceService} from "../../services/seance.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthService} from "../../services/user-auth.service";
interface Seance2 {

  startTime: Date;
  endTime: Date;

  poste: string;

  projectid:number;


}
interface projectinfo{
  id:string ;
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
  selector: 'app-addseance',
  templateUrl: './addseance.component.html',
  styleUrls: ['./addseance.component.css']
})
export class AddseanceComponent implements OnInit {
  projectidtoupdate: number = 0;
  projectid: number = 0;
  projectname: string = "";
  project!: projectinfo;
  isLoading = false;
  selectedEmail!: string;
  selectedintervenat: string[] = [];
  selectedProject!: string;
  filteredProjects: projectinfo[] = [];
  intervenant!: User2[];
  email!: string;
  showProjectList: boolean = true;

  constructor(
    private userService: UserService,
    private projectservice: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private userAuthService: UserAuthService,
    private seanceservice: SeanceService
  ) {}

  ngOnInit(): void {
    this.projectidtoupdate = this.route.snapshot.params['id'];
    this.projectservice.getprojectdetailsbyid2(this.projectidtoupdate).subscribe(
      data2 => {
        console.log(data2);
        this.project = data2;
        console.log(this.project);
      },
      error => console.log(error)
    );
  }

  intervention1(interventionform: NgForm) {
    this.isLoading=true
    const startDate = new Date(interventionform.value.startTime);
    const endDate = new Date(interventionform.value.endTime);

    if (startDate.getDay() === 6 || startDate.getDay() === 0) {
      alert("You can't select a weekend day as start date.");
      return;
    }

    if (endDate.getDay() === 6 || endDate.getDay() === 0) {
      alert("You can't select a weekend day as end date.");
      return;
    }

    const seance: Seance2 = {
      startTime: interventionform.value.startTime,
      endTime: interventionform.value.endTime,
      poste: interventionform.value.poste,
      projectid: parseInt(this.project.id),
    };

    this.seanceservice.add(seance).subscribe(
      (response: any) => {
        console.log(response.startTime);
        console.log(response.id);
        console.log(response.endTime);
        console.log(response.lastname);
        console.log(response.poste);
        console.log(response.etats);

        alert('la seance a été bien planifié');
        this.isLoading=false
       const aa= this.userAuthService.issuperadm();
if (aa){
        this.router.navigate(['/seancebyproject']);}else{this.router.navigate(['/listseance'])}
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  gotolist() {
    this.router.navigate(['/list']);
  }

  selectProject(id: string, name: string) {
    this.selectedProject = name;
    this.projectidtoupdate = parseInt(id);
    this.showProjectList = false;
  }

  onFocus() {
    if (this.selectedProject.trim().length > 0) {
      this.showProjectList = true;
    }
  }

  onBlur() {
    this.showProjectList = false;
  }

  onProjectSelected() {
    this.showProjectList = false;
  }
}

