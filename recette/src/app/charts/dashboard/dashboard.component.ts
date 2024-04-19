import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeanceService} from "../../services/seance.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
moyenne!:number;
  projects!:number;
  retour!:number;
  constructor(

    private userService: UserService,
    private projectservice: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private seanceservice: SeanceService
  ) {}
  ngOnInit(): void {
    this.projectservice.averagetime().subscribe(
      (averageDuration: number) => {

       this.moyenne=  Number(averageDuration.toFixed(2));
      },
      (error: any) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );
    this.projectservice.numberofprojectsbyyear(new Date().getFullYear()).subscribe(
      (averageDuration: number) => {

        this.projects=  averageDuration;
      },
      (error: any) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );
    this.projectservice.getretour(new Date().getFullYear()).subscribe(
      (averageDuration: number) => {

        this.retour=  averageDuration;
      },
      (error: any) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );
  }

}
