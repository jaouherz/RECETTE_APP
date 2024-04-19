import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userauthservice: UserAuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {

  }

  public isLoggedIn() {
    return this.userauthservice.isLoggedIn();

  }

  public onlogout() {



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

}
