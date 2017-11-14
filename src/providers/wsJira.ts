import { TaskJira } from './../models/taskJira.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsJira {

  private url:string = 'http://172.16.93.227:3000/api/jira/';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
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
}
