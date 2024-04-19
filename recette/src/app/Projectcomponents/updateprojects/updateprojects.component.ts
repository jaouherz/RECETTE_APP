import {Component, OnInit} from '@angular/core';
import {Project} from "../../project";
import {UserAuthService} from "../../services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {NgForm} from "@angular/forms";
import {Users} from "../../users";
import {Domaine} from "../../Domain";

interface addprojectdata{

  name: string;
  description: string;
  url: string;
domaine:string ;
  dpt_id: File;
  T_U: File;

  envi:string;
  intervention:string;

}
interface projectinfo{
  id:string ;
  name: string;
  description: string;
  url: string;
domaine:string;

  dpt_file_name: string;
  tu_file_name: string;
  datedajout: Date;
  date: Date;
  time: Date;

}
@Component({
  selector: 'app-updateprojects',
  templateUrl: './updateprojects.component.html',
  styleUrls: ['./updateprojects.component.css']
})
export class UpdateprojectsComponent implements OnInit{
  public projectidtoupdate: number=0;
  project!:projectinfo;
  project2!:Project;
  selectedDptIdFile!: File;
  selectedTUFile!: File;
  intervention!: boolean ;
  envi!: boolean ;
  selectedEmail!: string;
  users: Users[] = [];
  isLoading = false;
  selecteddomain: string="";
  domaines: Domaine[] = [];
  constructor(
    private userauthservice: UserAuthService,
    private router: Router,
    private userService: UserService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
this.getdomaines()
    console.log(this.users)
    this.projectidtoupdate=this.route.snapshot.params['id'];
    this.projectsService.getprojectdetailsbyid2(this.projectidtoupdate).subscribe(
      data2 =>{console.log(data2)
        this.project=data2
this.selecteddomain=this.project.domaine
        console.log(this.project)
      },error => console.log(error));
    this.projectsService.getprojectdetailsbyid(this.projectidtoupdate).subscribe(
      data =>{console.log(data)
        this.project2=data
        console.log(this.project2)
      },error => console.log(error));



  }

  updateUserjaou(projectForm: NgForm){
    const name=projectForm.value['name'];
    if(name===""){

      alert(" Le nom du projet est obligatoire")
      this.isLoading = false;
    }else{
    const projectData : addprojectdata ={
      name: projectForm.value.name,
      description: projectForm.value.description,
      url: projectForm.value.url,

domaine:projectForm.value.domaine,
      dpt_id: this.selectedDptIdFile,
      T_U: this.selectedTUFile,
      envi:projectForm.value.envi,
      intervention:projectForm.value.intervention
    };
    this.projectsService.updateProject(this.projectidtoupdate,projectData).subscribe(
      data=>{console.log(data);
        alert("le projet a été bien mise à jour")
        this.gotolist();
        this.isLoading = false;
      },error=>console.log(error)) ;}}

  onSubmit(projectForm: NgForm) {
    this.isLoading = true;
    this.updateUserjaou(projectForm);
  }
  gotolist() {
    this.router.navigate(['/seancebyproject']);
  }
  onFileSelected(event: any): void {

    const target = event.target as HTMLInputElement;

    const file = target.files![0];

    this.selectedDptIdFile = file;


  }


  onFileSelected2(event: any) : void {
    const target = event.target as HTMLInputElement;

    const file = target.files![0];
    this.selectedTUFile = file;
  }
  getUsersByRole(role: string) {
    this.userService.getusersbyrole(role)
      .subscribe((data: Users[]) => {
        this.users = data;
      })
    console.log(this.users)
  }
  getdomaines() {
    this.projectsService.getdomains()
      .subscribe((data: Domaine[]) => {
        this.domaines = data;
      })
    console.log(this.domaines)
  }
}
