import { Empresa } from './../models/empresa.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsEmpresas {

  private url:string = 'http://172.16.93.227:3000/api/empresa';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public getEmpresas(idProduto: string) : Observable<Empresa[]> {
    return this.http.get(this.url + "/" + idProduto)
      .map(res => res.json())
      .map(
        (empresas) => {
          let newEmpresas : Empresa[] = [];
          empresas.forEach(
            element => {
              newEmpresas.push(element);
            }
          );
        return newEmpresas;
      });
  }

  public saveEmpresa(empresa: Empresa){

    if(empresa._id) {
      return this.http.put(this.url, empresa);
    } else {
      return this.http.post(this.url, empresa);
    }
  }

  public deleteEmpresa(id: string){
    return this.http.delete(this.url + '/' + id);
  }
}
