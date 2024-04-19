import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Users} from "../../users";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})

export class UpdateuserComponent implements OnInit {
public useridtoupdate: number=0;
user!: Users;


  constructor(
    private userauthservice: UserAuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
this.useridtoupdate=this.route.snapshot.params['id'];
this.userService.getuserdetailsbyid(this.useridtoupdate).subscribe(
  data =>{console.log(data)
  this.user=data
  },error => console.log(error));





  }
updateUserjaou(){

  const firstname=this.user.firstname;

  const lastname=this.user.lastname;
  const email=this.user.email;
  const role=this.user.role;
  if( firstname===""|| lastname===""|| email===""|| role===""){
    alert('all fields are required')



  }
  else
    if (!(this.isAlphabetical(firstname))){
      alert("firstname should be alphabetical")
    }else
    if (!(this.isAlphabetical(lastname))){
      alert("lastname should be alphabetical")
    }else
    if(!(this.isValidEmail(email))){
      alert("email should have the email form")
    }else{
   this.userService.updateuserr(this.useridtoupdate,this.user).subscribe(
     data=>{console.log(data);
alert("user updated successfully")
       this.gotolist();

     },error=>console.log(error)) ;}}

  onSubmit() {
    this.updateUserjaou();
  }


  gotolist() {
    this.router.navigate(['/register']);
  }

  isAlphabetical(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
  isValidEmail(email: string): boolean {

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(email);
  }

}
