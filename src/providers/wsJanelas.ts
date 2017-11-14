import { Janela } from './../models/janela.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { WsMudancas } from "./wsMudancas";


@Injectable()
export class WsJanelas {

  private url:string = 'http://172.16.93.227:3000/api/janela/';
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http, public wsMudancas: WsMudancas) {
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

  public getJanela(id: string) : Observable<Janela> {
    return this.http.get(this.url + id)
      .map(res => res.json())
      .map(
        (janela) => {
          let newJanela: Janela = new Janela();
          newJanela = janela;
        return newJanela;
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

    // Apaga Mudancas desta Janela
    // this.wsMudancas.getMudancas(id).subscribe(
    //   (res) => {
    //     res.forEach(element => {
    //       this.wsMudancas.deleteMudanca(element._id).subscribe();
    //     });
    //   }
    // );

    return this.http.delete(this.url + id);
  }

  public startJanela(janela: Janela){
    return this.http.put(this.url + "/inicia", {_id: janela._id});
  }
  
}