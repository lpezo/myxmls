import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Proy } from '../../models/proy';
import { FormControl, Validators } from '@angular/forms';
import { ProyService } from '../../services/proy.service';

@Component({
  selector: 'app-new-proyecto-dialog',
  templateUrl: './new-proyecto-dialog.component.html',
  styleUrls: ['./new-proyecto-dialog.component.scss']
})
export class NewProyectoDialogComponent implements OnInit {

  proyecto:Proy;

  constructor(private dialogRef: MatDialogRef<NewProyectoDialogComponent>,
              private proyService: ProyService) { }

      
  ngOnInit() {
    this.proyecto = new Proy();
  }
  onSave(){
    this.proyService.addProy(this.proyecto).then(proy=>{
      this.dialogRef.close(proy);
    });
    
  }
  onCancel(){
    this.dialogRef.close(null);
  }
}
