import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeanceService} from "../../services/seance.service";
import {NgForm} from "@angular/forms";
interface feedData {

  statut: string;
  description: string;
seanceid:number;


  finale:boolean;


}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  seanceid!:number;
  isLoading = false;
  constructor(
    private userService: UserService,
    private projectservice: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private seanceservice: SeanceService
  ) {}
  ngOnInit(): void {
    this.seanceid = this.route.snapshot.params['id'];
  }

  feedbackfn(feedback: NgForm) {
    this.isLoading = true;
    const feedback1:feedData ={
      finale:feedback.value.finale,
      statut:feedback.value.statut,
      seanceid:this.seanceid,
      description:feedback.value.description


    }

this.seanceservice.addfeed(feedback1).subscribe(
  (response: any) => {
console.log(response)

    alert('feedback ajouté');
    this.isLoading = false;
    this.router.navigate(['/listseance']);
  },
  (error) => {
    alert(error.error);
  }
);
  }




}
