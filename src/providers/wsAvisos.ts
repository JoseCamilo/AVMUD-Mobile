import { Aviso } from './../models/aviso.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsAvisos {

  private url:string = 'http://172.16.93.227:3000/api/aviso/';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getAvisos() : Observable<Aviso[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(
        (avisos) => {
          let newAvisos : Aviso[] = [];
          avisos.forEach(
            element => {
              newAvisos.push(element);
            }
          );
        return newAvisos;
      });
  }

  public saveAviso(aviso: Aviso){

    if(aviso._id) {
      return this.http.put(this.url, aviso);
    } else {
      return this.http.post(this.url, aviso);
    }
  }

  public deleteAviso(id: string){
    return this.http.delete(this.url + id);
  }
}
