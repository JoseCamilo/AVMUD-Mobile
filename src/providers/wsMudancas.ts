import { Janela } from './../models/janela.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsMudancas {

  private url:string = 'http://172.16.93.227:3000/api/janela';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getJanelas() : Observable<Janela[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(
        (janelas) => {
          let newJanelas : Janela[] = [];
          janelas.forEach(
            element => {
              newJanelas.push(element);
            }
          );
        return newJanelas;
      });
  }

  public saveJanela(janela: Janela){

    if(janela._id) {
      return this.http.put(this.url, janela);
    } else {
      return this.http.post(this.url, janela);
    }
  }

  public deleteJanela(id: string){
    return this.http.delete(this.url + '/' + id);
  }

  public startJanela(janela: Janela){
    return this.http.put(this.url + "/inicia", {idJanela: janela._id});
  }
  
}
