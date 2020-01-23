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
    return this.http.get<Proy[]>("assets/proyData.json")
    .subscribe(data =>{
          this.dataStore.proysSet = data;
          this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
      }), catchError(error => {
          return throwError('Unable to fetch proys set!');
});

}

proyById(id : number){
  return this.dataStore.proysSet.find(x=>x.id == id);
}

  addProy(proy:Proy): Promise<Proy>{
    return new Promise((resolver,reject) =>{
      proy.id = this.dataStore.proysSet.length + 1;
      this.dataStore.proysSet.push(proy);
      this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
      resolver(proy);
    });
  }

  update(index:number, proy: Proy): Promise<Proy> {
    return new Promise((resolver,reject) =>{
          this.dataStore.proysSet[index] = proy;
          this._proysSet.next(Object.assign({}, this.dataStore).proysSet);
          resolver(proy);      
    })
    
  }

  deleteProy(index:number){
    this.dataStore.proysSet.splice(index,1);
  }
}
