import {Component, OnInit} from '@angular/core';
import {User2} from "../../User2";
import {Users} from "../../users";
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Domaine} from "../../Domain";




@Component({
  selector: 'app-updatedomaine',
  templateUrl: './updatedomaine.component.html',
  styleUrls: ['./updatedomaine.component.css']
})
export class UpdatedomaineComponent implements OnInit{
  public domaineidtoupdate: number=0;
  isLoading = false;
  vav_metier1!:User2[];
  respmetier1!:User2[];

  vav_orga1!:Users[];
  respEtude1!:User2[];
  vav_etude1!:User2[];
  resorga1!: User2[] ;
  user2!:User2[]
  selectedorga:string="";
  selectedmetier:string="";
  selectedetude:string="";
  selectedvavmetier:string="";
  selectedvavorga:string="";
  selectedvavetude: string="";
  domaine!:Domaine;
  constructor(private userService: UserService, private projectservice: ProjectsService  , private router: Router , private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getUsersByRole_vavorga("orga");
    this.getUsersByRole_vavmetier("metier");
    this.getUsersByRole_vavetude("etude");
    this.getUsersByRole_resmetier("resmetier");
    this.getUsersByRole_respetude("resetude");
    this.getUsersByRole_resorga("resorga")
    this.domaineidtoupdate=this.route.snapshot.params['id'];
    this.projectservice.getdomainbyid(this.domaineidtoupdate).subscribe(
      data2 =>{console.log(data2)
        this.domaine=data2
        this.selectedvavorga = this.domaine.vav_orga;
        this.selectedvavmetier=this.domaine.vav_metier;
        this.selectedvavetude=this.domaine.vav_etude;
        this.selectedorga=this.domaine.resorga;
        this.selectedmetier=this.domaine.respmetier;
        this.selectedetude=this.domaine.respEtude;
        console.log(this.domaine)
      },error => console.log(error));
  }

  updatedomaine(updatedomainForm: NgForm) {
    this.isLoading = true;
    const name=updatedomainForm.value['name'];
    if(name===""){

      alert(" Le nom du domaine est obligatoire")
      this.isLoading = false;
    }else {

    const domaintoadd:Domaine ={
    name : updatedomainForm.value.name,
    vav_metier:this.selectedvavmetier,
    vav_etude:this.selectedvavetude,
    respEtude:this.selectedetude,
    respmetier:this.selectedmetier,
    resorga:this.selectedorga,
      vav_orga:this.selectedvavorga}
    this.projectservice.updatedomain(this.domaineidtoupdate,domaintoadd).subscribe(
      (response: any) => {
        this.isLoading = false;
        alert(response.name + 'added succesfully');
      },
      (error) => {
        console.log(error);
      }
    );}
  }
  getUsersByRole_vavmetier(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.vav_metier1 = data;
      })
    console.log(this.vav_metier1)
  }
  getUsersByRole_vavorga(role: string) {
    this.userService.getusersbyrole(role)
      .subscribe((data: Users[]) => {
        this.vav_orga1 = data;
      })
    console.log(this.vav_orga1)
  }
  getUsersByRole_vavetude(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.vav_etude1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_respetude(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.respEtude1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_resorga(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.resorga1 = data;
      })
    console.log(this.user2)
  }
  getUsersByRole_resmetier(role: string) {
    this.userService.getusersbyprofile(role)
      .subscribe((data: User2[]) => {
        this.respmetier1 = data;
      })
    console.log(this.user2)
  }
}
