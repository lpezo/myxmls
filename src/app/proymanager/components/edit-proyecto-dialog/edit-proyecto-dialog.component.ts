import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyService } from '../../services/proy.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-proyecto-dialog',
  templateUrl: './edit-proyecto-dialog.component.html',
  styleUrls: ['./edit-proyecto-dialog.component.scss']
})
export class EditProyectoDialogComponent implements OnInit {
  @ViewChild('idvalue', { static: true }) idvalue: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue : ElementRef;
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProyectoDialogComponent>,
    private proyectoService: ProyService,
    @Inject(MAT_DIALOG_DATA) { id, _id, name, index }) { 
      
      this.form = fb.group({
        id: [id],
        _id: [_id],
        name: [name],
        index: [index]
      });
    }

  ngOnInit() {
    
  }

  onEdit(){

    this.proyectoService.update(this.indexvalue.nativeElement.value, this.form.value).then(proy=>{
      this.dialogRef.close(proy);
    });
    
   }

  onCancel(){
    this.dialogRef.close();
  }

}
