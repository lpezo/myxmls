import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewProyectoDialogComponent } from '../new-proyecto-dialog/new-proyecto-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  constructor(private dialog:MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  openProyectoDialog(){
   let dialogRef =  this.dialog.open(NewProyectoDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog closed', result);

      if(result){
        this.openSnackBar("Proyecto agregado", "Navigate")
        .onAction().subscribe(()=>{
          //navigate
          this.router.navigate(['/proymanager']);
        });
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
   return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
