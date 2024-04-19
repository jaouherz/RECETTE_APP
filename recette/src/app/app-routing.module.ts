import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

import {UserComponent} from "./pages/user2/user/user.component";
import {LoginComponent} from "./AuthenticationCRUD/login/login.component";
import {ForbiddenComponent} from "./AuthenticationCRUD/forbidden/forbidden.component";
import {RegisterComponent} from "./AuthenticationCRUD/register/register.component";
import {ChangepasswordComponent} from "./AuthenticationCRUD/changepassword/changepassword.component";
import {ForgetpassComponent} from "./AuthenticationCRUD/forgetpass/forgetpass.component";
import {AuthGuard} from "./_auth/shared/auth.guard";
import {Forgotpass2Component} from "./AuthenticationCRUD/forgotpass2/forgotpass2.component";
import {AdduserComponent} from "./AuthenticationCRUD/adduser/adduser.component";
import {UpdateuserComponent} from "./AuthenticationCRUD/updateuser/updateuser.component";
import {ProjectComponent} from "./Projectcomponents/project/project.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RoleguardGuard} from "./_auth/shared/roleguard.guard";
import {RecetteGuard} from "./_auth/shared/recette.guard";
import {ListprojectComponent} from "./Projectcomponents/listproject/listproject.component";
import {UpdateprojectsComponent} from "./Projectcomponents/updateprojects/updateprojects.component";
import {InfoprojectComponent} from "./Projectcomponents/infoproject/infoproject.component";
import {InterventionComponent} from "./Projectcomponents/intervention/intervention.component";
import {MakeintComponent} from "./Projectcomponents/makeint/makeint.component";
import {DomaineComponent} from "./Projectcomponents/domaine/domaine.component";
import {ListedomaineComponent} from "./Projectcomponents/listedomaine/listedomaine.component";
import {UpdatedomaineComponent} from "./Projectcomponents/updatedomaine/updatedomaine.component";
import {OrgaroleGuard} from "./_auth/shared/orgarole.guard";
import {SeanceComponent} from "./Seance/seance/seance.component";
import {AddseanceComponent} from "./Seance/addseance/addseance.component";
import {SeancelisteComponent} from "./Seance/seanceliste/seanceliste.component";
import {UpdateseanceComponent} from "./Seance/updateseance/updateseance.component";
import {FeedbackComponent} from "./Seance/feedback/feedback.component";
import {SeancebyprojectComponent} from "./Seance/seancebyproject/seancebyproject.component";
import {Updateuser2Component} from "./pages/user2/updateuser2/updateuser2.component";
import {Listeuser2Component} from "./pages/user2/listeuser2/listeuser2.component";
import {HistoryComponent} from "./Seance/history/history.component";
import {SuperadminGuard} from "./_auth/shared/superadmin.guard";
import {OrgaonlyGuard} from "./_auth/shared/orgaonly.guard";
import {ChartsComponent} from "./charts/charts/charts.component";
import {DashboardComponent} from "./charts/dashboard/dashboard.component";



const routes: Routes = [
  {path:'' ,redirectTo:'forbiden',pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},

  {path:'user',component:UserComponent,canActivate:[AuthGuard,SuperadminGuard]},
  {path:'login',component:LoginComponent},
  {path:'forbiden',component:ForbiddenComponent},
  {path:"register",component:RegisterComponent,canActivate:[AuthGuard,RoleguardGuard]},
  {path:"changepass",component:ChangepasswordComponent,canActivate:[AuthGuard]},
  {path:"forgetpass",component:ForgetpassComponent},
  {path:"forgetpass2",component:Forgotpass2Component},
  {path:"adduser",component:AdduserComponent,canActivate:[AuthGuard,RoleguardGuard]},
  {path:"updateuser/:id",component:UpdateuserComponent,canActivate:[AuthGuard,RoleguardGuard]},
  {path:"project",component:ProjectComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"sidebar",component:SidebarComponent,canActivate:[AuthGuard]},
  {path:"list", component:ListprojectComponent,canActivate:[AuthGuard,OrgaroleGuard]},
  {path:"updateprojects/:id",component:UpdateprojectsComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"infoproject/:id",component:InfoprojectComponent,canActivate:[AuthGuard,OrgaroleGuard]},
  {path:"intervention/:id",component:InterventionComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"makeint",component:MakeintComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"domaine",component:DomaineComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"listdomaine",component:ListedomaineComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"updatedomaine/:id",component:UpdatedomaineComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"Seance",component:SeanceComponent,canActivate:[AuthGuard,OrgaroleGuard]},
  {path:"addseance/:id",component:AddseanceComponent,canActivate:[AuthGuard,OrgaonlyGuard]},
  {path:"listseance",component:SeancelisteComponent,canActivate:[AuthGuard,OrgaonlyGuard]},
  {path:"updateseance/:id",component:UpdateseanceComponent,canActivate:[AuthGuard,OrgaonlyGuard]},
  {path:"feedback/:id",component:FeedbackComponent,canActivate:[AuthGuard,OrgaonlyGuard]},
  {path:"seancebyproject",component:SeancebyprojectComponent,canActivate:[AuthGuard,RecetteGuard]},
  {path:"updateuser2/:id",component:Updateuser2Component,canActivate:[AuthGuard,SuperadminGuard]},
  {path:"listuser2",component:Listeuser2Component,canActivate:[AuthGuard,SuperadminGuard]},
  {path:"History",component:HistoryComponent,canActivate:[AuthGuard,SuperadminGuard]},
  {path:"charts",component:ChartsComponent,canActivate:[AuthGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
