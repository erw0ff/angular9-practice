import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {AuthService} from "./shared/services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/services/auth.guard";



const routes: Routes = [
  {path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id', component: EditPageComponent, canActivate: [AuthGuard]}
    ]
  }
]


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})

export class AdminModule {

}
