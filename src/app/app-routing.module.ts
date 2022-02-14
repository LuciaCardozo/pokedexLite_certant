import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"perfil",component:PerfilComponent,canActivate:[AuthGuard]},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},//,canActivate:[AuthGuard]
  {path:"addEdit",component:AddEditComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
