import { Injectable } from '@angular/core';
import {environement} from "../../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seance} from "../Seance";
interface Seance2 {

  startTime: Date;
  endTime: Date;

  poste: string;

  projectid:number;


}
interface History{

  dateopeartion:Date;
  nomoperation:string;
  nomprojet:string;
  id:number;
  idprojet:number;



}
interface feedData {

  statut: string;
  description: string;
  seanceid:number;


 finale:boolean;


}
export interface Seance3 {
  id: number;
  startTime: String;
  endTime: String;

  poste: string;
  etats: string;
  projectname: string;
  statut :string ;
cause:string ;
}
interface feedcount{
  description:string;
  count:number;

}
@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpclient: HttpClient) {
  }
  public getseances(): Observable<Seance[]> {
    return this.httpclient.get<Seance[]>(this.PATH_OF_API + '/api/v5/seance/all');
  }
  public deleteproject(idconge: number): Observable<void> {
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v5/seance/del/' + idconge);
  }
  public add(RegisterData: Seance2) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v5/seance/adddomaine", RegisterData)
  }
  public getbyorga(email:string): Observable<Seance[]> {
    return this.httpclient.get<Seance[]>(this.PATH_OF_API + '/api/v5/seance/Seancebyvavorgaemail/'+email);
  }
  public getseancestringtime(): Observable<Seance3[]> {
    return this.httpclient.get<Seance3[]>(this.PATH_OF_API + '/api/v5/seance/all2');
  }
  public getbyorga2(email:string): Observable<Seance3[]> {
    return this.httpclient.get<Seance3[]>(this.PATH_OF_API + '/api/v5/seance/Seancebyvavorgaemail2/'+email);
  }
  public getbyid(id:number): Observable<Seance3> {
    return this.httpclient.get<Seance3>(this.PATH_OF_API + '/api/v5/seance/find/'+id);
  }
  public update(RegisterData: Seance2,id:number) {
    return this.httpclient.put(this.PATH_OF_API + "/api/v5/seance/seances/"+id, RegisterData)
  }
  public getSeancesCount(email: string, statut: string, etats: string): Observable<number> {

    return   this.httpclient.get<number>(this.PATH_OF_API + "/api/v5/seance/count/"+email+"/"+statut+"/"+etats)



  }
  public addfeed(feeddata: feedData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v6/feedback/addfeedback", feeddata)
  }
  public deletefeed(idfeed: number): Observable<void> {
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v6/feedback/delfeed/' + idfeed);
  }
  public getseancesbyproject(id:number): Observable<Seance3[]> {
    return this.httpclient.get<Seance3[]>(this.PATH_OF_API + '/api/v5/seance/findbyproject/'+id);
  }
  public getseancehistory(id:number): Observable<History[]> {
    return this.httpclient.get<History[]>(this.PATH_OF_API + '/api/v8/History/find/'+id);
  }

  public countfeedko(year:number) :Observable<feedcount[]> {
    return this.httpclient.get<feedcount[]>(this.PATH_OF_API + "/api/v6/feedback/feedback/count/"+year)


  }
}
