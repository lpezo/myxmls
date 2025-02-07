import { Injectable } from '@angular/core';
import { Proy } from '../models/proy';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, find } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyService {

   private _proysSet: BehaviorSubject<Proy[]>;

   socket;

  private dataStore: {
     proysSet: Proy[]
  }

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient) { 
    this.dataStore = { proysSet:[] };
    this._proysSet = new BehaviorSubject<Proy[]>([]);
  }


  get proysSet(): Observable<Proy[]>{
    return this._proysSet.asObservable();
  }

 
  getJSON() {
    return this.http.post<Proy[]>('proy/list', {user: localStorage.getItem('idUser')})
    .subscribe(data =>{
          for (let item of data){
            this.agregacampos(item);
          }
          this.dataStore.proysSet = data;
          this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
      }), catchError(error => {
          return throwError('Unable to fetch proys set!');
      });
  }

  agregacampos(item:Proy){
    if (item.status == 'proc')
      item.estado = 'procesando';
    else if (item.status == 'ver')
      item.estado = 'verificando';
    else if (item.status == "ok")
      item.estado = "pendiente";
    else
      item.estado = item.status
  }

proyById(_id : string){
  return this.dataStore.proysSet.find(x=>x._id == _id);
}

indexById(_id: string)
{
  return this.dataStore.proysSet.findIndex(x=>x._id == _id);
}

  addProy(proy:Proy): Promise<Proy>{
    return new Promise((resolver,reject) =>{
      //let currentuser = JSON.parse(localStorage.getItem('currentUser'));
      proy.id = this.dataStore.proysSet.length + 1;
      proy.user = localStorage.getItem('idUser');
      this.http.post<Proy>(`proy/add`, proy).subscribe({
        next: data => {
          this.dataStore.proysSet.splice(0, 0, data);
          this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
          resolver(data);
        },
        error: error => reject(error.message)
      });
    });
  }

  update(index:number, proy: Proy): Promise<Proy> {
    return new Promise((resolver,reject) =>{
          this.http.put<Proy>(`proy/upd`, proy).subscribe({
            next: data => {
              this.agregacampos(data);
              this.dataStore.proysSet[index] = data;
              this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
              resolver(data);     
            },
            error: error => reject(error.message)
          });
 
    })
    
  }

  deleteProy(index:number, id:string){
    this.http.delete(`proy/del/${id}`, {}).subscribe({
      next: data => this.dataStore.proysSet.splice(index,1),
    })
  }

  sendFile(data: any){
    return this.http.post('proy/send', data);
  }

  refresh(id: string) : Promise<Proy> {
    return new Promise((resolve,reject) => {
      this.http.get('proy/refresh/' + id, {}).subscribe({
        next: data => resolve(data as Proy),
        error: error => reject(error)
      })
    })
  }

  refreshIndice(index:number, proy:Proy){
    this.refresh(proy._id).then(data=>{
      this.agregacampos(data);
      this.dataStore.proysSet[index] = data
    })
  }

  procesa({ index, id, cb }: { index: number; id: string; cb: (err: any, res: Proy) => any; }){
    this.http.put<Proy>(`proy/setproc/${id}`, null).subscribe({
      //this.http.post<Proy>(`proy/tick`, null).subscribe({
      next: data => {
        this.agregacampos(data);
        this.dataStore.proysSet[index] = data;
        cb(null, data);
      },
      error: error => cb(error, null)
    })
  }

  download(proy:Proy, cb: (err:any, reponse)=>any) {
       this.http.get(`proy/excel/${proy._id}`,  {observe: 'response', responseType: 'blob'}).subscribe ({
        next: res => {
                      let namezip = proy.filename;
                      if (!proy.filename)
                        namezip = proy.name.replace('.', '_');
                      let data = {
                         image: new Blob([res.body], {type: res.headers.get('Content-Type')}),
                         filename: namezip
                      };
                      cb(null, data);
                    },
        error: error=> {
          cb(error, null);
        }
      })
    }

    setupSocketConnection() {
      console.log(environment.apiBaseUrl);
      this.socket = io(environment.apiBaseUrl);

	    this.socket.emit("messages", "Hola desde angular");

      this.socket.on('refresh', (data: any) => {
        if (data.user == localStorage.getItem('idUser')){
          console.log(data);
          let index = this.dataStore.proysSet.findIndex(p => p._id == data.proy);
          if (index >= 0){
            console.log('refresca ', index);
            this.refreshIndice(index, this.dataStore.proysSet[index]);
          }
        }
      });

 	 this.socket.on('error', function(err){
	 	console.log(err);
		});

    }

}
