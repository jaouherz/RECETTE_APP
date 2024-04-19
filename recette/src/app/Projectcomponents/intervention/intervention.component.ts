import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User2} from "../../User2";
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
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  public projectidtoupdate: number=0;
  project!:projectinfo;
  selectedEmail!:string;
  selectedintervenat: string[] = [];
  intervenant!:User2[];

  emails: string[] = ['jaouher2002@gmail.com', 'email2@example.com', 'email3@exam25252ple.com', 'email4@ex5252ample.com'];
  constructor(private userService: UserService, private projectservice: ProjectsService  , private router: Router, private route: ActivatedRoute ) {}



  ngOnInit(): void {
    this.projectidtoupdate=this.route.snapshot.params['id'];
    this.projectservice.getprojectdetailsbyid2(this.projectidtoupdate).subscribe(
      data2 =>{console.log(data2)
        this.project=data2

        console.log(this.project)
      },error => console.log(error));
    this.getUsersByRole_intervenant("intervenant");
  }
  intervention1(intervetionform: NgForm) {

      const email = this.selectedEmail;
      const msg = intervetionform.value.msg;
    if(this.selectedintervenat.length===0){
      alert('Merci de selectioner au moins un intervenant')

    }else{
    this.projectservice.sendintervention(this.projectidtoupdate, this.selectedintervenat, msg)
      .subscribe(result => {
        console.log(result) ;

      }, error => {
        console.log(error);
      });
    alert("un email d'intervention a éte envoyé avec le dpt du projet ");
    this.gotolist();}
  }


  gotolist() {
    this.router.navigate(['/list']);
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
}
