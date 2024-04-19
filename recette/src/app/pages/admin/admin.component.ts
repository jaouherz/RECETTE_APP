import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private userauthservice: UserAuthService,
              private router: Router, private userService: UserService){}
  public onlogout()
{


  const token = localStorage.getItem('jwtToken');
  this.userauthservice.clear();
  if (token) {
    this.userService.logout(token).subscribe(
      () => {
        localStorage.removeItem('jwtToken');


      },
      error => console.error(error)
    );
  }

}

  ngOnInit(): void {
  }
}
