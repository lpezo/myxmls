import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Proy } from '../../models/proy';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBarRef, SimpleSnackBar, MatSnackBar, MatDialogConfig } from '@angular/material';
import { ProyService } from '../../services/proy.service';
import { EditProyectoDialogComponent } from '../edit-proyecto-dialog/edit-proyecto-dialog.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @Input() proysData: Observable<Proy[]>;
  proy: Proy;
  constructor(private proyService: ProyService,
     private router: Router,
     private route: ActivatedRoute,
     private dialog:MatDialog,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.proysData = this.proyService.proysSet;
    this.proyService.getJSON();
    this.proysData.subscribe(data =>{
      console.log(data);
    });
  }

  __cardClick(proy){
    console.log("cardclick()",  proy);
    this.router.navigate(['proyecto', proy._id]);
  }
  
  openProyectoDialog(index:number,{_id, name}:Proy){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "450px";
    dialogConfig.data= {_id, name, index};
    const dialogRef = this.dialog.open(EditProyectoDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
  );
}

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
       duration: 2000,
     });
   }
   
   deleteItem(i:number, _id:string){
     if (confirm('Esta seguro de eliminar?'))
      this.proyService.deleteProy(i, _id);
   }

}
