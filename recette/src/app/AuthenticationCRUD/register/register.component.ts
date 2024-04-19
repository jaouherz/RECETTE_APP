import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserAuthService} from "../../services/user-auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserRegisterService} from "../../services/user-register.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Users} from "../../users";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public users: Users[] = []
  public editUsers: any = null;
  usera!: Users;
  user5!: Users;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService) {
  }

  ngOnInit(): void {
    this.getusers();

  }

  register(registerform: NgForm) {

    this.userService.register(registerform.value).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response.id);
        console.log(response.firstname);
        console.log(response.lastname);
        console.log(response.email);
        console.log(response.role);
        this.userregisterservice.setRoles(response.role);
        this.userregisterservice.setToken(response.token);
        this.userregisterservice.setfistname(response.firstname);
        this.userregisterservice.setlastname(response.lastname);
        this.userregisterservice.setemail(response.email);
        this.userregisterservice.setpassword(response.password);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getusers(): void {
    this.userService.getusers().subscribe(
      (response: Users[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteuserr(id: number ): void {
    this.userService.getuserdetailsbyid(id).subscribe(
      data =>{console.log(data)
        this.usera=data
      },error => console.log(error));

    if (confirm('Are you sure you want to delete this user?')) {
      if(this.usera.role==="ADMIN"){alert('impossible de supprimer un admin ')}
      else{
      this.userAuthService.setid(id)
      this.userService.deleteUser(id)
        .subscribe(
          (response: void) => {
            console.log(response);
            this.getusers();
            this.userService.getuserdetailsbyid(id).subscribe(
              data2 =>{console.log(data2)
                this.user5=data2
                if(this.user5!=null){alert("impossible de supprimer ce compte car il a des projets en cours...")
                  this.getusers();}
              },error => console.log(error));


            localStorage.removeItem('id');
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
      );
    }}
  }
  updateEmployee(id: number){
    this.router.navigate(['/updateuser', id]);
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Users[] = [];
    for (const user of this.users) {
      if (user.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getusers();
    }
  }
}

