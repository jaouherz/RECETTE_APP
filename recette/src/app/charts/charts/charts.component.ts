import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeanceService} from "../../services/seance.service";
import _default from "chart.js/dist/plugins/plugin.decimation";
import destroy = _default.destroy;
interface  etatcount{
  etat:string ;
  number:number;


}
interface feedcount{
  description:string;
  count:number;

}
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @ViewChild('yearSelect') yearSelect!: ElementRef;
  selectedYear: string="";
  chart: any;
  chart2: any;
  etatlist!:etatcount[];
  feedlist!:feedcount[];
  years = [(new Date().getFullYear()-1).toString(), (new Date().getFullYear()).toString(), (new Date().getFullYear()+1).toString(),(new Date().getFullYear()+2).toString()];
  constructor(

    private userService: UserService,
    private projectservice: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private seanceservice: SeanceService
  ) {}
  ngOnInit() {
this.feedko()
this.chartaa2();
if(this.selectedYear==""){


  this.chartaa();
}

  }

  onYearChange() {

    if (this.chart) {
      this.chart.destroy();
    }if(this.chart2){
      this.chart2.destroy();

    }
    if(this.selectedYear==""){
      this.chartaa();
this.chartaa2()
    }else{
      this.chart.destroy();
    this.chartyear(this.selectedYear);
    this.chartyear2(this.selectedYear)}
  }
    chartaa(){
      this.projectservice.countetat().subscribe(
        data2 => {
          console.log(data2)
          this.etatlist = data2;
          console.log(this.etatlist);

          // Create chart here
          this.chart = new Chart('MyChart', {
            type: 'doughnut',
            data: {
              labels: this.etatlist.map(e => e.etat),
              datasets: [{

                data: this.etatlist.map(e => e.number),
                backgroundColor: [
                  'rgb(67,104,43)',
                  'rgb(153,115,0)',
                  'rgb(237,125,49)',
                  'rgb(109,171,67)',
                  'rgb(255,192,0)',
                  'rgb(158,72,14)'
                ],

                borderWidth: 1
              }]
            },

          });
        }, error => console.log(error));
    }
  feedko(){
    this.seanceservice.countfeedko(new Date().getFullYear()).subscribe(
      data2 => {
        console.log(data2)
        this.feedlist = data2;
        console.log(this.feedlist);

        // Create chart here
        this.chart = new Chart('MyChart3', {
          type: 'bar',
          data: {
            labels: this.feedlist.map(e => e.description),
            datasets: [{

              data: this.feedlist.map(e => e.count),
              backgroundColor: [
                'rgb(243,172,44)',
                'rgb(173,63,63)',

              ],

              borderWidth: 1
            }]
          },
          options: {
            scales: {

            }
          }
        });
      }, error => console.log(error));
  }
  chartyear(year: string){
    this.projectservice.countetatbyyear(parseInt(year)).subscribe(
      data2 => {
        console.log(data2)
        this.etatlist = data2;
        console.log(this.etatlist);



        // Create chart here
        this.chart = new Chart('MyChart', {
          type: 'doughnut',
          data: {
            labels: this.etatlist.map(e => e.etat),
            datasets: [{

              data: this.etatlist.map(e => e.number),
              backgroundColor: [
                'rgb(67,104,43)',
                'rgb(153,115,0)',
                'rgb(237,125,49)',
                'rgb(109,171,67)',
                'rgb(255,192,0)',
                'rgb(158,72,14)'
              ],

              borderWidth: 1
            }]
          },

        });
      }, error => console.log(error));
  }
  chartyear2(year: string){
    this.projectservice.countstatutbyyear(parseInt(year)).subscribe(
      data2 => {
        console.log(data2)
        this.etatlist = data2;
        console.log(this.etatlist);



        // Create chart here
        this.chart2 = new Chart('MyChart2', {
          type: 'pie',
          data: {
            labels: this.etatlist.map(e => e.etat),
            datasets: [{

              data: this.etatlist.map(e => e.number),
              backgroundColor: [
                'rgba(173,63,63,0.82)',
                'rgba(243,172,44,0.8)',
                'rgb(113,112,122)',
                'rgba(53,63,63,0.2)',
                'rgb(222,13,13)',
                'rgb(31,30,38)'
              ],

              borderWidth: 1
            }]
          },

        });
      }, error => console.log(error));
  }
  chartaa2(){
    this.projectservice.countstatut().subscribe(
      data2 => {
        console.log(data2)
        this.etatlist = data2;
        console.log(this.etatlist);

        // Create chart here
        this.chart2 = new Chart('MyChart2', {
          type: 'pie',
          data: {
            labels: this.etatlist.map(e => e.etat),
            datasets: [{

              data: this.etatlist.map(e => e.number),
              backgroundColor: [
                'rgba(173,63,63,0.82)',
                'rgba(243,172,44,0.8)',
                'rgb(113,112,122)',
                'rgba(53,63,63,0.2)',
                'rgb(222,13,13)',
                'rgb(31,30,38)'
              ],

              borderWidth: 1
            }]
          },

        });
      }, error => console.log(error));
  }}




