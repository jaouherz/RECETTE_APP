import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor() { }
  public setfistname(firstname:string){
    localStorage.setItem("firstname",JSON.stringify( firstname));
  }
  public  getfirstname() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("firstname"));

  }
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken" , jwtToken);

  }
  public getToken() :string | null{
    return  localStorage.getItem("jwtToken");
  }
  public setlastname(lastname:string){
    localStorage.setItem("lastname",JSON.stringify( lastname));
  }
  public  getlastname() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("lastname"));

  }
  public setemail(email:string){
    localStorage.setItem("lastname",JSON.stringify( email));
  }
  public  getemail() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("email"));

  }
  public setpassword(password:string){
    localStorage.setItem("lastname",JSON.stringify( password));
  }
  public  getpassword() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("password"));

  }
  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify( roles));
  }
  public  getRoles() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("roles"));

  }
  public clear(){
    localStorage.clear();
  }
  public  isLoggedIn(){
    return this.getRoles()&&this.getToken();
  }
}
