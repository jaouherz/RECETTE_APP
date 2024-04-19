import { Injectable } from '@angular/core';
import {environement} from "../../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Users} from "../users";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Projects} from "@angular/cli/lib/config/workspace-schema";
import {Project} from "../project";
import {Domaine} from "../Domain";
interface addprojectdata{

  name: string;
  description: string;
  url: string;
  domaine:string;

  dpt_id: File;
  T_U: File;
envi:string;
intervention:string;


}
interface  etatcount{
  etat:string ;
  number:number;


}
interface projectinfo{
  id:string ;
  name: string;
  description: string;
  url: string;
 domaine : string ;

  dpt_file_name: string;
  tu_file_name: string;
  datedajout: Date;
  date: Date;
  time: Date;
  etat:string;

}
interface adddomain{

  name: string;
  vav_metier:string;
  respmetier:string;

  vav_orga:string;
  respEtude:string;
  vav_etude:string;
resorga: string ;


}
interface domaininfo{
id:number;
  name: string;
  vav_metier:string;
  respmetier:string;

  vav_orga:string;
  respEtude:string;
  vav_etude:string;
  resorga: string ;


}
@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpclient: HttpClient) {
  }

  public addproject(projectData: addprojectdata) {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('url', projectData.url);
    formData.append('domaine', projectData.domaine);

    formData.append('file', projectData.dpt_id);
    formData.append('file2', projectData.T_U);
    formData.append('intervention', projectData.intervention);
    formData.append('envi', projectData.envi);
    console.log(formData);
    return this.httpclient.post(this.PATH_OF_API + "/api/v2/project/add2", formData)
  }

  public updateProject(id: number, projectData: addprojectdata) {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('url', projectData.url);
    formData.append('domaine', projectData.domaine);
    formData.append('file', projectData.dpt_id);
    formData.append('file2', projectData.T_U);
    formData.append('intervention', projectData.intervention);
    formData.append('envi', projectData.envi);
    console.log(formData);
    return this.httpclient.put(this.PATH_OF_API + "/api/v2/project/update/" + id, formData)
  }

  public getprojects(): Observable<projectinfo[]> {
    return this.httpclient.get<projectinfo[]>(this.PATH_OF_API + '/api/v2/project/projects');
  }
  public getprojectbyemailorga(email :string): Observable<projectinfo[]> {
    return this.httpclient.get<projectinfo[]>(this.PATH_OF_API + '/api/v2/project/vavorgaid2/'+email);
  }

  public getprojectdetailsbyid(projectid: number) {
    return this.httpclient.get<Project>(this.PATH_OF_API + '/api/v2/project/find/' + projectid);

  }


  public getprojectdetailsbyid2(projectid: number) {
    return this.httpclient.get<projectinfo>(this.PATH_OF_API + '/api/v2/project/find2/' + projectid);

  }

  public downloadfile(fileid: string): Observable<Blob> {
    console.log(fileid)
    return this.httpclient.get(this.PATH_OF_API + '/file/download/' + fileid, {responseType: 'blob'});

  }

  public findFileIdByProjectId(projectid: number, type: string): Observable<string> {
    return this.httpclient.get(this.PATH_OF_API + '/api/v2/project/projects/' + projectid + "/files/" + type + "/id", {responseType: 'text'});
  }

  public deleteproject(idconge: string): Observable<void> {
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v2/project/delete/' + idconge);
  }

  public sendintervention(idproj: number, email: string[], msg: string) {
    const formData = new FormData();
    formData.append('toEmailAddresses', email.join(','));
    formData.append('msg', msg);
    console.log(formData)
    return this.httpclient.post(this.PATH_OF_API + '/api/v2/project/sendEmail/' + idproj, formData);

  }

  public adddomain(Adddomain: adddomain) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v4/Domaine/adddomaine", Adddomain)
  }

  public getdomainbyname(name: string) {
    return this.httpclient.get<Domaine>(this.PATH_OF_API + '/api/v4/Domaine/adddomaine' + name);

  }
  public getdomains(): Observable<domaininfo[]> {
    return this.httpclient.get<domaininfo[]>(this.PATH_OF_API + '/api/v4/Domaine/Domaines');
  }
  public deletedomain(id: number): Observable<void> {
    console.log(id)
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/v4/Domaine/delete/'+id);
  }
  public updatedomain(id:number,Adddomain: adddomain) {
    return this.httpclient.put(this.PATH_OF_API + "/api/v4/Domaine/updatedomaine/"+id, Adddomain)
  }
  public getdomainbyid(id: number) {
    return this.httpclient.get<Domaine>(this.PATH_OF_API + '/api/v4/Domaine/findid/' + id);

  }

  public getprojectcount(etat: string): Observable<number> {

    return   this.httpclient.get<number>(this.PATH_OF_API + "/api/v2/project/count/"+etat)



  }
  public countetat() :Observable<etatcount[]> {
    return this.httpclient.get<etatcount[]>(this.PATH_OF_API + "/api/v2/project/etat/count")


  }
  public countetatbyyear(year:number) :Observable<etatcount[]> {
    return this.httpclient.get<etatcount[]>(this.PATH_OF_API + "/api/v2/project/etat/count/"+year)


  }
  public countetatbyyearandmonth(year:number,month:number) :Observable<etatcount[]> {
    return this.httpclient.get<etatcount[]>(this.PATH_OF_API + "/api/v2/project/etat/count/"+year+"/"+month)

  }
  public countstatut() :Observable<etatcount[]> {
    return this.httpclient.get<etatcount[]>(this.PATH_OF_API + "/api/v5/seance/etat/count")


  }
  public countstatutbyyear(year:number) :Observable<etatcount[]> {
    return this.httpclient.get<etatcount[]>(this.PATH_OF_API + "/api/v5/seance/etat/count/"+year)


  }
  public averagetime() :Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/v8/History/projects/duration")


  }
  public numberofprojectsbyyear(year:number) :Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/v2/project/etat/count2/"+year)


  }
  public getretour(year:number): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + '/api/v8/History/projects/duration/'+year);
  }
}
