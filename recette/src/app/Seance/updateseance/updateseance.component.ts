import {Component, OnInit} from '@angular/core';
import {User2} from "../../User2";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Seance3, SeanceService} from "../../services/seance.service";
import {HttpErrorResponse} from "@angular/common/http";
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
  selector: 'app-updateseance',
  templateUrl: './updateseance.component.html',
  styleUrls: ['./updateseance.component.css']
})
export class UpdateseanceComponent implements OnInit {
  projectidtoupdate: number = 0;
  projectid: number = 0;
  projectname: string = "";
  seance!: Seance3;
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
    private seanceservice: SeanceService
  ) {}

  ngOnInit(): void {
    this.projectidtoupdate = this.route.snapshot.params['id'];
    this.seanceservice.getbyid(this.projectidtoupdate).subscribe(
      data2 => {
        console.log(data2);
        this.seance = data2;
        console.log(this.seance);
      },
      error => console.log(error)
    );
  }

  intervention1(interventionform: NgForm) {
    this.isLoading = true;
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



    this.seanceservice.update(interventionform.value,this.seance.id).subscribe(
      (response: any) => {
        console.log(response.startTime);
        console.log(response.id);
        console.log(response.endTime);
        console.log(response.lastname);
        console.log(response.poste);
        console.log(response.etats);

        alert('La séance a été modifiée avec succès.');
        this.router.navigate(['/listseance']);
        this.isLoading = false;
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

