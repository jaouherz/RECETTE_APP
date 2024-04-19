import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './AuthenticationCRUD/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {RestapiService} from "./restapi.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { UserComponent } from './pages/user2/user/user.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './AuthenticationCRUD/forbidden/forbidden.component';
import { RegisterComponent } from './AuthenticationCRUD/register/register.component';
import {RouterModule} from "@angular/router";
import { ChangepasswordComponent } from './AuthenticationCRUD/changepassword/changepassword.component';
import { ForgetpassComponent } from './AuthenticationCRUD/forgetpass/forgetpass.component';
import { Forgotpass2Component } from './AuthenticationCRUD/forgotpass2/forgotpass2.component';
import { AdduserComponent } from './AuthenticationCRUD/adduser/adduser.component';
import { UpdateuserComponent } from './AuthenticationCRUD/updateuser/updateuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './Projectcomponents/project/project.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListprojectComponent } from './Projectcomponents/listproject/listproject.component';
import { UpdateprojectsComponent } from './Projectcomponents/updateprojects/updateprojects.component';
import { InfoprojectComponent } from './Projectcomponents/infoproject/infoproject.component';
import { InterventionComponent } from './Projectcomponents/intervention/intervention.component';
import { MakeintComponent } from './Projectcomponents/makeint/makeint.component';
import { DomaineComponent } from './Projectcomponents/domaine/domaine.component';
import { ListedomaineComponent } from './Projectcomponents/listedomaine/listedomaine.component';
import { UpdatedomaineComponent } from './Projectcomponents/updatedomaine/updatedomaine.component';
import { SeanceComponent } from './Seance/seance/seance.component';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import { AddseanceComponent } from './Seance/addseance/addseance.component';
import { SeancelisteComponent } from './Seance/seanceliste/seanceliste.component';
import { UpdateseanceComponent } from './Seance/updateseance/updateseance.component';
import { FeedbackComponent } from './Seance/feedback/feedback.component';
import { SeancebyprojectComponent } from './Seance/seancebyproject/seancebyproject.component';
import { Updateuser2Component } from './pages/user2/updateuser2/updateuser2.component';
import { Listeuser2Component } from './pages/user2/listeuser2/listeuser2.component';
import { HistoryComponent } from './Seance/history/history.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { DashboardComponent } from './charts/dashboard/dashboard.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    UserComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ForgetpassComponent,
    Forgotpass2Component,
    AdduserComponent,
    UpdateuserComponent,
    ProjectComponent,
    SidebarComponent,
    ListprojectComponent,
    UpdateprojectsComponent,
    InfoprojectComponent,
    InterventionComponent,
    MakeintComponent,
    DomaineComponent,
    ListedomaineComponent,
    UpdatedomaineComponent,
    SeanceComponent,
    AddseanceComponent,
    SeancelisteComponent,
    UpdateseanceComponent,
    FeedbackComponent,
    SeancebyprojectComponent,
    Updateuser2Component,
    Listeuser2Component,
    HistoryComponent,
    ChartsComponent,
    DashboardComponent,




  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
         DayPilotModule,


    ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
