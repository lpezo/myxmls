import { Component, OnInit } from '@angular/core';
import { Proy } from '../../models/proy';
import { ProyService } from '../../services/proy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  proyecto: Proy;
  constructor(private proyectoService: ProyService,
    private router: Router,
    private route: ActivatedRoute) 
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
    });
  }

  backToHome(){
    this.router.navigate(['proyecto']);
  }

}
