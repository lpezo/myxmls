import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProymanagerComponent } from './proymanager.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

const routes: Routes = [
  { path:'', component: ProymanagerComponent, 
  children:[
      { path: '', component: MainContentComponent },
      { path: ':id', component: UploadFilesComponent }
  ]    
},
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProymanagerRoutingModule { }
