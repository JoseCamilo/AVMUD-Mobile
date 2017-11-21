import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsUtil {

  private url:string = 'http://172.16.93.227:3000/api/';
  private urlFluig:string = 'https://wscorp.totvs.com.br/authusrfluig/';
  public retorno: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http) {
  }

  public vldUrl(endereco: string){
      return this.http.put(this.url + "url", {"url": endereco});
  }

  public buscaArquivo(endereco: string){
      return this.http.put(this.url + "arquivos", {"path": endereco});
  }

  public buscaPastas(endereco: string){
      return this.http.put(this.url + "pastas", {"path": endereco})
      .map((res) => {
        let retorno = res.json();
        return retorno;
    });
  }

  public buscaRoot(endereco: string){
      return this.http.get(endereco + "rootpath")
      .map((res) => {
        let retorno = res.json();
        return retorno.rootpath;
    });
  }

  public authFluig(user: string, pwd: string){
      let myHeaders = new Headers({ 'Content-Type': 'application/json', 'userrede': user, "pwdrede" : pwd });
      let opt = new RequestOptions({
        headers: myHeaders
        }) 

    return this.http.get(this.urlFluig, opt )
    .map((res) => {
        let retorno = res.json();
        return retorno;
        })
    .map( (err) => {
        return err;
    });
  }

}
