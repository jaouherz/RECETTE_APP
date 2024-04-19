import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {Project} from "../../project";
import {saveAs} from "file-saver";

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
etat : string ;
}
@Component({
  selector: 'app-infoproject',
  templateUrl: './infoproject.component.html',
  styleUrls: ['./infoproject.component.css']
})
export class InfoprojectComponent implements OnInit {
  public projectidtoupdate: number=0;
  project!:projectinfo;
  project2!:Project;
  iddpt!:string;
  idtu!:string;
  constructor(
    private userauthservice: UserAuthService,
    private router: Router,
    private userService: UserService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.projectidtoupdate=this.route.snapshot.params['id'];
    this.projectsService.getprojectdetailsbyid2(this.projectidtoupdate).subscribe(
      data2 =>{console.log(data2)
        this.project=data2
        console.log(this.project)

      },error => console.log(error));
    this.projectsService.getprojectdetailsbyid(this.projectidtoupdate).subscribe(
      data =>{console.log(data)
        this.project2=data
        console.log(this.project2)

      },error => console.log(error));

  }

  downloadfile(id: number, type: string) {
    if(type === 'dpt') {
      this.projectsService.findFileIdByProjectId(id, type).subscribe((id2) => {
        this.projectsService.downloadfile(id2).subscribe((data) => {

          saveAs(data, "DPT du version "+this.project2.name);
        });
      });
    } else if(type === 'tu') {
      this.projectsService.findFileIdByProjectId(id, type).subscribe((id2) => {
        this.projectsService.downloadfile(id2).subscribe((data) => {

          saveAs(data, "TU du version "+this.project2.name);
        });
      });
    }
  }
}
