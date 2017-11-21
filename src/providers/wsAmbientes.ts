import { Ambiente } from './../models/ambiente.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsAmbientes {

  private url:string = 'http://172.16.93.227:3000/api/ambiente/';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getAmbientes(idProduto: string) : Observable<Ambiente[]> {
    return this.http.get(this.url + idProduto)
      .map(res => res.json())
      .map(
        (ambientes) => {
          let newAmbientes : Ambiente[] = [];
          ambientes.forEach(
            element => {
              newAmbientes.push(element);
            }
          );
        return newAmbientes;
      });
  }

  public getAllAmbientes() : Observable<Ambiente[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(
        (ambientes) => {
          let newAmbientes : Ambiente[] = [];
          ambientes.forEach(
            element => {
              newAmbientes.push(element);
            }
          );
        return newAmbientes;
      });
  }

  public saveAmbiente(ambiente: Ambiente){

    if(ambiente._id) {
      return this.http.put(this.url, ambiente);
    } else {
      return this.http.post(this.url, ambiente);
    }
  }

  public deleteAmbiente(id: string){
    return this.http.delete(this.url + id);
  }
}
