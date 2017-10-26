import { Tarefa } from './../models/tarefa.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsTarefas {

  private url:string = 'http://172.16.93.227:3000/api/janela/itens';
  private urlGrv:string = 'http://172.16.93.227:3000/api/janela';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getTarefas(id: string) : Observable<Tarefa[]> {
    return this.http.get(this.url + '/' + id)
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

  public saveTarefas(tarefa: Tarefa){
    if(tarefa._id) {
      return this.http.put(this.urlGrv, tarefa);
    } else {
      return this.http.post(this.urlGrv, tarefa);
    }
  }

  public deleteTarefa(id: string){
    return this.http.delete(this.urlGrv + '/' + id);
  }

  public startTarefa(tarefa: Tarefa){
    return this.http.put(this.urlGrv + "/inicia", {idJanela: tarefa.idMudanca , id: tarefa._id});
  }
  
}
