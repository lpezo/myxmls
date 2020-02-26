import { Component, OnInit, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Proy } from '../../models/proy';
import { ProyService } from '../../services/proy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  proyecto: Proy;
  files: any[] = [];
  cancelar: boolean = false;
  form: FormGroup;

  constructor(private proyectoService: ProyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) 
    {
    }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const id = params['id'];
      
        this.proyectoService.proysSet.subscribe(proys =>{
          if(proys.length == 0) return;
          this.proyecto = this.proyectoService.proyById(id);
        });
        
        console.log('proyecto',this.proyecto);
        if (!this.proyecto)
          this.backToHome();
        else
          this.createForm();

    });
  }

  createForm() {
    this.form = this.fb.group({
      //user: [localStorage.getItem('idUser'), Validators.required],
      proyecto: this.proyecto,
      avatar: null
    });
  }

  backToHome(){
    this.router.navigate(['proyecto']);
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
      if (index === this.files.length) {
        this.proyecto.progress = 100;
        this.refrescar();
        this.backToHome();
        return;
      } 
      else if (this.cancelar) {
        this.openSnackBar("Cancelado por usuario", "Mensaje")
        .onAction().subscribe(()=>{
          this.refrescar();
          return;
        });
      }
      else {
        this.sendFile(this.files[index]).then(data => {
          console.log('data: ' , data.value);
          this.proyecto.progress = (index / this.files.length) * 100;
          this.uploadFilesSimulator(index + 1);
        }).catch(error => {
          this.openSnackBarError(error.error).onAction().subscribe(() =>{
            console.log('error.error', error.error)
            this.uploadFilesSimulator(index + 1);
          })
        })
      }
  }

refrescar(){
  this.proyectoService.refresh(this.proyecto).then(data=>{
    console.log('data:', data);
    this.proyecto.total = data.total;
  })
}

  sendFile(file:any): Promise<FormGroup> {
    return new Promise((resolver,reject)  =>{
     let reader = new FileReader();
     if(file) {
       reader.readAsDataURL(file);
       reader.onload = () => {
         this.form.get('avatar').setValue({
           filename: file.name,
           filetype: file.type,
           value: (reader.result as string).split(',')[1]
         });
         this.proyectoService.sendFile(this.form.value).subscribe({
           next: data=> resolver(this.form),
           error: error=> reject(error)
         })
         
       };
     }
     else
      reject(null);
    });
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    this.cancelar = false;
    this.files = [];
    for (const item of files) {
      this.proyecto.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  cancel() {
    this.cancelar = true;
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
       duration: 2000,
     });
   }
 
  openSnackBarError(message: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, 'Error', {
       duration: 10,
     });
   }
}
