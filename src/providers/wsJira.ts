import { TaskJira } from './../models/taskJira.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ScrumMaster } from "../models/scrumMaster.model";
import { Mudanca } from "../models/mudanca.model";
import { WsMudancas } from "./wsMudancas";


@Injectable()
export class WsJira {

  private url:string = 'http://172.16.93.227:3000/api/jira/';
  private urlAnx:string = "http://172.16.93.227:3000/api/mudanca/jira/";
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http, public wsMudanca: WsMudancas) {
  }

  public getTasks() : Observable<TaskJira[]> {
    return this.http.get(this.url + "tasks")
      .map(res => res.json())
      .map(
        (tasks) => {
          let newTasks : TaskJira[] = [];
          tasks.forEach(
            element => {
              newTasks.push(element);
            }
          );
        return newTasks;
      });
  }

  public getScrumMaster() : Observable<ScrumMaster[]> {
    return this.http.get(this.url + "users")
      .map(res => res.json())
      .map(
        (users) => {
          let newUsers : ScrumMaster[] = [];
          users.forEach(
            element => {
              newUsers.push(element);
            }
          );
        return newUsers;
      });
  }

  public createTask(mudanca: Mudanca, scrum: string, issueType: string){

    let descricao = "";
    descricao += "Cliente: " + mudanca.cliente;
    descricao += "Analista: " + mudanca.responsavel;
    descricao += "Descrição da Demanda: " + mudanca.descricao;
     
    return this.http.post(this.url + "createtask", {  "task": mudanca.idPAM,
                                                      "summary": mudanca.title,
                                                      "assignee": scrum,
                                                      "reporter": scrum,
                                                      "description": mudanca.descricao,
                                                      "issuetype": issueType})
              .map((res) => {
                    let retorno = res.json();
                    mudanca.idSubTaskPAM = retorno.key;

                    // salva a subtask criada
                    this.wsMudanca.saveMudanca(mudanca).subscribe();
                    
                    return mudanca;
              })
              .map((err) => {
                return err;
              });
  }

  public anexarItens(mudanca: Mudanca){     
    return this.http.post(this.urlAnx , mudanca);
  }
}
