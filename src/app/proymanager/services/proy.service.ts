import { Injectable } from '@angular/core';
import { Proy } from '../models/proy';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProyService {

   private _proysSet: BehaviorSubject<Proy[]>;

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
          this.dataStore.proysSet = data;
          this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
      }), catchError(error => {
          return throwError('Unable to fetch proys set!');
      });
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
          this.http.put(`proy/upd`, proy).subscribe({
            next: data => {
              this.dataStore.proysSet[index] = proy;
              this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
              resolver(proy);     
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
}
