import { Tarefa } from './../models/tarefa.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsTarefas {

  private url:string = 'http://172.16.93.227:4000/api/tarefa/';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getTarefas(idMudanca: string) : Observable<Tarefa[]> {
    return this.http.get(this.url + idMudanca)
      .map(res => res.json())
      .map(
        (tarefa) => {
          let newTarefas : Tarefa[] = [];
          tarefa.forEach(
            element => {
              newTarefas.push(element);
            }
          );
        return newTarefas;
      });
  }

  public saveTarefa(tarefa: Tarefa){
    if(tarefa._id) {
      return this.http.put(this.url, tarefa);
    } else {
      return this.http.post(this.url, tarefa);
    }
  }

  public deleteTarefa(id: string){
    return this.http.delete(this.url + id);
  }

  public startTarefa(tarefa: Tarefa){
    return this.http.put(this.url + "inicia", {_id: tarefa._id});
  }
  
}
