import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { ProymanagerRoutingModule } from './proymanager-routing.module';
import { ProymanagerComponent } from './proymanager.component';

import { NewProyectoDialogComponent } from './components/new-proyecto-dialog/new-proyecto-dialog.component';
import { EditProyectoDialogComponent } from './components/edit-proyecto-dialog/edit-proyecto-dialog.component';

import { MatFileUploadModule } from 'angular-material-fileupload';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

@NgModule({
  declarations: [ProymanagerComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewProyectoDialogComponent,
    EditProyectoDialogComponent,
    UploadFilesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ProymanagerRoutingModule,
    MatFileUploadModule
  ],
  entryComponents: [NewProyectoDialogComponent, EditProyectoDialogComponent]
})
export class ProymanagerModule { }
