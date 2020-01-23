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


@NgModule({
  declarations: [ProymanagerComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ProymanagerRoutingModule
  ]
})
export class ProymanagerModule { }
