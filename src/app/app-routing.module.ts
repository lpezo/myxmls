import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './loginmanager/helpers/auth.guard';
/**Componenets */
import { LoginComponent } from './loginmanager/login/login.component';
import { RegisterComponent } from './loginmanager/register/register.component';

const routes: Routes = [
  { path:'proymanager', loadChildren:'./proymanager/proymanager.module#ProymanagerModule', canActivate: [AuthGuard]},
  { path:'demo', loadChildren:'./demo/demo.module#DemoModule'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'proymanager'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
