import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import {SeanceService} from "../../services/seance.service";
import {Seance} from "../../Seance";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {UserService} from "../../services/user.service";
import {Users} from "../../users";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})

export class SeanceComponent implements OnInit {
  email!:string;
  events: any[] = [];
  currentDate!: string | null ;
  @ViewChild("calendar", {static: false}) calendar: any;
  config: any = {
    startDate: DayPilot.Date.today(),
    viewType: "WorkWeek",
    timeHeaders: [
      {groupBy: "Day", format: "dddd"},
      {groupBy: "Hour", format: "h tt"}
    ],
    businessBeginsHour: 8,
    businessEndsHour: 16,

    days: 5,
    headerDateFormat: "dddd ",
    eventClickHandling: "Disabled",
    eventDeleteHandling: "Disabled",
    eventResizeHandling: "Disabled",
    eventMoveHandling: "Disabled",
    timeRangeSelectedHandling: "Disabled",
    allowEventOverlap: false,
    eventBorderRadius: "30%",
    locale: "fr-fr",
    weekStarts: 1,

  };
  user!:Users;

  constructor(private seanceservice: SeanceService, private router: Router,private userService: UserService,@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!;

    this.userService.getuserbymail(this.email).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user.role)
        if (this.user.role==="orga"){
          this.getseances(this.email);
        } else{

          this.getseances2();
        }
      },
      (error) => {
        console.log(error);
      }
    );
    const datePipe = new DatePipe(this.locale);
    this.currentDate = datePipe.transform(new Date(), '  dd/ MM / yyyy HH:mm:ss');

  }

  getseances(email:string) {
    this.seanceservice.getbyorga(email).subscribe((data: Seance[]) => {
      console.log(data); // Log the data array
      this.events = data.map((seance: Seance) => ({
        id: seance.id,
        html: '<strong>'+seance.projectname + '</strong><br><span style="font-size: 100%">' + new DayPilot.Date(seance.startTime).toString("h:mm tt") + ' - ' + new DayPilot.Date(seance.endTime).toString("h:mm tt") + '</span><br><a>Poste:'+seance.poste+'</a><br>'+seance.etats,        start: new DayPilot.Date(seance.startTime),
        end: new DayPilot.Date(seance.endTime),
        backColor: 'rgba(243,172,44,0.72)',
        heightSpec: "Fixed",
        height: 50,
        etats: seance.etats,
        title: "Additional information to show in tooltip"
      }));

      this.initializeCalendar();
    });
  }
  getseances2() {
    this.seanceservice.getseances().subscribe((data: Seance[]) => {
      console.log(data); // Log the data array
      this.events = data.map((seance: Seance) => ({
        id: seance.id,
        html: '<strong>'+seance.projectname + '</strong><br><span style="font-size: 100%">' + new DayPilot.Date(seance.startTime).toString("h:mm tt") + ' - ' + new DayPilot.Date(seance.endTime).toString("h:mm tt") + '</span><br><a>Poste:'+seance.poste+'</a><br>'+seance.etats,
        start: new DayPilot.Date(seance.startTime),
        end: new DayPilot.Date(seance.endTime),
        backColor: 'rgba(243,172,44,0.72)',
        heightSpec: "Fixed",
        height: 50,
        etats: seance.etats
      }));

      this.initializeCalendar();
    });
  }

  onTimeRangeSelected(args: any) {
    args.preventDefault();
  }

  initializeCalendar() {
    const dp = new DayPilot.Calendar("calendar");
    dp.events.list = this.events;

    dp.onTimeRangeSelect = (args) => this.onTimeRangeSelected(args);

    dp.eventDeleteHandling = "Update";


    dp.init();
  }
  onButtonClick() {
    console.log("Button clicked");
    // Do something when the button is clicked
  }






}



