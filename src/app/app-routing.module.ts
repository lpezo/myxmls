import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'proymanager', loadChildren:'./proymanager/proymanager.module#ProymanagerModule'},
  { path:'demo', loadChildren:'./demo/demo.module#DemoModule'},
  { path: '**', redirectTo: 'proymanager'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
