import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environement} from "../../../environement/environement";
import {Observable} from "rxjs";
import {Users} from "../users";
import jwt_decode from 'jwt-decode';
import {NgForm} from "@angular/forms";
import {User2} from "../User2";
interface LoginData {
  email: string;
  password: string;
}
interface registerData{
   id: string;
  firstname: string;
  lastname: string;
  email: string;
   password: string;
  Role : string ;
}
interface registeruser2{

  firstname: string;
  lastname: string;
  email: string;
nbabs:number;
  profile : string ;
}
interface ChangepassData{

  currentPassword : string ;
  newPassword: string ;
}

interface forgetData{
  email : string;

}
interface updatedata{
  firstname: string;
  lastname: string;
  email: string;
  role : string ;



}
interface forgetpassData{
  newpassword : string;

}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpclient: HttpClient ) {
  }

  public login(loginData: LoginData) {

    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/authenticate", loginData)
  }

  public register(RegisterData: registerData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/register", RegisterData)
  }

  public changepass(changepassData: ChangepassData) {
    const email = localStorage.getItem('email');

    const body = { email, ...changepassData };
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/changepass", body)
  }

  public getusers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.PATH_OF_API + '/api/v1/auth/users');
  }
  public forgetpass(ForgetData: forgetData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass", ForgetData)
  }

  public logout(token : string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/logout", null,{headers})
  }
  public forgetpass2(Forgetpassdata: forgetpassData) {
    const email = localStorage.getItem('email');

    const body = { email , ...Forgetpassdata };
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass2", body)
  }
  public deleteUser(id: number): Observable<void>{
    const userid=localStorage.getItem("id")
    const userid2=parseInt(userid || '');
    if(userid2){
      return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v1/auth/delete/'+userid2);
    }
    throw new Error("User ID not found");
  }
  public updateuserr(id: number, value: Users){
console.log((value))
    const userToUpdate: updatedata = {

      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,

      role: value.role,

    };
    return this.httpclient.put(this.PATH_OF_API + '/api/v1/auth/update/'+id,userToUpdate);
  }
  public getuserdetailsbyid(userid: number){
    return this.httpclient.get<Users>(this.PATH_OF_API+'/api/v1/auth/find/'+userid);

  }
  public getuserbymail(email:string){
    return this.httpclient.get<Users>(this.PATH_OF_API+'/api/v1/auth/findbymail/'+email);


  }
  public getusersbyrole(role:string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.PATH_OF_API + '/api/v1/auth/users/role/'+role);
  }
  public getusersbyprofile(role:string): Observable<User2[]> {
    return this.httpclient.get<User2[]>(this.PATH_OF_API + '/api/v3/user2/findbyrole/'+role);
  }
  public registeruser2(RegisterData: registeruser2) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v3/user2/adduser2", RegisterData)
  }
  public getuser2bymail2(email:string):Observable<User2>{
    return this.httpclient.get<User2>(this.PATH_OF_API+'/api/v3/user2/findbymail/'+email);


  }
  public getuser2detailsbyid(userid: number){
    return this.httpclient.get<User2>(this.PATH_OF_API+'/api/v3/user2/findid/'+userid);

  }
  public updateuser2(id: number, value: registeruser2):Observable<User2[]>{
    console.log((value))

    return this.httpclient.put<User2[]>(this.PATH_OF_API + '/api/v3/user2/updateuser2/'+id,value);
  }
  public getusers2(): Observable<User2[]> {
    return this.httpclient.get<User2[]>(this.PATH_OF_API + '/api/v3/user2/users');
  }
  public deleteUser2(id: number): Observable<void> {


    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v3/user2/delete/' + id);
  }

}
