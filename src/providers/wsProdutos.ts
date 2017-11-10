import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Produto } from './../models/produto.model';
import { WsEmpresas } from "./wsEmpresas";
import { WsAmbientes } from "./wsAmbientes";


@Injectable()
export class WsProdutos {

  private url:string = 'http://172.16.93.227:3000/api/produto';
  public headers = new Headers({ 'Content-Type': 'application/json' });
  

  constructor(public http: Http, public wsEmpresas: WsEmpresas, public wsAmbientes: WsAmbientes) {
  }

  public getProdutos() : Observable<Produto[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(
        (produtos) => {
          let newProdutos : Produto[] = [];
          produtos.forEach(
            element => {
              newProdutos.push(element);
            }
          );
        return newProdutos;
      });
  }

  public saveProduto(produto: Produto){

    if(produto._id) {
      return this.http.put(this.url, produto);
    } else {
      return this.http.post(this.url, produto);
    }
  }

  public deleteProduto(id: string){

    // Apaga Empresas deste produto
    // this.wsEmpresas.getEmpresas(id).subscribe(
    //   (res) => {
    //     res.forEach(element => {
    //       this.wsEmpresas.deleteEmpresa(element._id).subscribe();  
    //     });
    //   }
    // );

    // Apaga Ambientes deste produto
    // this.wsAmbientes.getAmbientes(id).subscribe(
    //   (res) => {
    //     res.forEach(element => {
    //       this.wsAmbientes.deleteAmbiente(element._id).subscribe();
    //     });
    //   }
    // );

    return this.http.delete(this.url + '/' + id);
  }
  
}