import {Component, OnInit} from '@angular/core';
import {Users} from "../../users";
import {SeanceService} from "../../services/seance.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Seance} from "../../Seance";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
export interface Seance3 {
  id: number;
  startTime: String;
  endTime: String;

  poste: string;
  etats: string;
  projectname: string;
statut:string;
cause:string;
}
@Component({
  selector: 'app-seanceliste',
  templateUrl: './seanceliste.component.html',
  styleUrls: ['./seanceliste.component.css']
})
export class SeancelisteComponent implements OnInit{
  user!:Users;
  email!:string;
  isrecette:boolean=false;
  seance!:Seance3[];

  isLoading = false;
  constructor(private seanceservice: SeanceService, private router: Router,private userService: UserService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!;

    this.userService.getuserbymail(this.email).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user.role)
        if (this.user.role==="orga"){
          this.getseances(this.email);

        } else{
          this.isrecette=true;
          this.getseances2();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getseances(email:string) {
    this.seanceservice.getbyorga2(email).subscribe((data: Seance3[]) => {
      console.log(data); // Log the data array
      this.seance = data;


    });
  }
  getseances2() {
    this.seanceservice.getseancestringtime().subscribe((data: Seance3[]) => {

      this.seance = data;


    });
  }
  deleteSeance(id:number) {

    if (confirm('Voulez-vous vraiment supprimer cette seance ?')) {
    this.seanceservice.deleteproject(id).subscribe((response: any) => {
      if(response===true){alert("Séance supprimée avec succès");console.log(response);
      if (this.user.role==="orga"){
        this.getseances(this.email);
      } else{

        this.getseances2();
      }}else{alert("impossible de supprimer cette seance")}
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
          if (this.user.role==="orga"){
            this.getseances(this.email);
          } else{

            this.getseances2();
          }
        }else{alert("impossible de supprimer ce feedback")}

        console.log(id);

      });
    }
  }
}
