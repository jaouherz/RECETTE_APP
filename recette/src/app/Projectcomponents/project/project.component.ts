import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Users} from "../../users";
import {Domaine} from "../../Domain";
interface addprojectdata{

  name: string;
  description: string;
  url: string;

domaine:string;
  dpt_id: File;
  T_U: File;

  envi:string;
  intervention:string;

}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  dpt_id: FileList | undefined;
  T_U: FileList | undefined;
  selectedFile!: File ;
  selectedDptIdFile!: File;
  selectedTUFile!: File;
  users: Users[] = [];
  domaines: Domaine[] = [];
  selectedEmail!: string;
  intervention: boolean = false;
  envi: boolean = false;
  selectedOption: string = "";
  isLoading = false;
  selecteddomain: string="";
  constructor(private userService: UserService, private projectservice: ProjectsService  , private router: Router ) {}

  ngOnInit(): void {
this.getdomaines()

    console.log(this.users)

  }

  addprojects(projectForm: NgForm) {
    const name=projectForm.value['name'];
    const domaine=this.selecteddomain;
    const option=this.selectedOption
    if(name===""||domaine===""){

      alert("Tous les champs avec (*) sont obligatoires")

    }else if (option===""){ alert("Merci de choisir entre 'Environnement prêt' et 'Intervention nécessaire' ")}else{
    this.isLoading = true;
    const projectData : addprojectdata ={
      name: projectForm.value.name,
      description: projectForm.value.description,
      url: projectForm.value.url,
domaine: this.selecteddomain,


      dpt_id: this.selectedDptIdFile,
      T_U: this.selectedTUFile,
      envi: this.selectedOption === "envi" ? "true" : "false",
      intervention: this.selectedOption === "intervention"? "true" : "false"
    };

    console.log(projectData);

    this.projectservice.addproject(projectData).subscribe(
      (response: any) => {
        console.log(response);

        if(this.selectedOption === "intervention") {
          this.router.navigate(['/intervention', response.id]);

        }
        else {alert("Le projet a été ajouté avec succès");
          this.gotolist();

        }this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );}
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
  gotolist() {
    this.router.navigate(['/list']);
  }
  getdomaines() {
    this.projectservice.getdomains()
      .subscribe((data: Domaine[]) => {
        this.domaines = data;
      })
    console.log(this.domaines)
  }

}





