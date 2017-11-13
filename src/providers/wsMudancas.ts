import { Mudanca } from './../models/mudanca.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { WsTarefas } from "./wsTarefas";


@Injectable()
export class WsMudancas {

  private url:string = 'http://172.16.93.227:3000/api/mudanca';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http, public wsTarefas: WsTarefas) {
  }

  public getMudancas(idJanela: string) : Observable<Mudanca[]> {
    return this.http.get(this.url + "/" + idJanela)
      .map(res => res.json())
      .map(
        (mudancas) => {
          let newMudancas : Mudanca[] = [];
          mudancas.forEach(
            element => {
              newMudancas.push(element);
            }
          );
        return newMudancas;
      });
  }

  public saveMudanca(mudanca: Mudanca){
    if(mudanca._id) {
      return this.http.put(this.url, mudanca);
    } else {
      return this.http.post(this.url, mudanca);
    }
  }

  public deleteMudanca(id: string){

    // Apaga Tarefas desta mudanca
    // this.wsTarefas.getTarefas(id).subscribe(
    //   (res) => {
    //     res.forEach(element => {
    //       this.wsTarefas.deleteTarefa(element._id).subscribe();
    //     });
    //   }
    // );

    return this.http.delete(this.url + '/' + id);
  }

  public startMudanca(mudanca: Mudanca){
    return this.http.put(this.url + "/inicia", {_id: mudanca._id});
  }
  
}
