import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { Produto } from "../../models/produto.model";
import { AddProdutoPage } from "../addProduto/addProduto";
import { AmbientePage } from "../ambiente/ambiente";
import { EmpresaPage } from "../empresa/empresa";
import { WsProdutos } from "../../providers/wsProdutos";


@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html'
})
export class ProdutoPage {

  produtos: Produto[] = [];

  constructor(public webservice: WsProdutos, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  itemAmbientes(event, produto) {
    this.navCtrl.push(AmbientePage, {
      produto: produto
    });
  }

  itemEmpresas(event, produto) {
    this.navCtrl.push(EmpresaPage, {
      produto: produto
    });
  }

  addProduto(){
    this.navCtrl.push(AddProdutoPage, {});
  }

  editProduto(event, produto){
    this.navCtrl.push(AddProdutoPage, {
      produto: produto
    });
  }

  ionViewDidEnter() {
    this.readProdutos();
  }

  readProdutos() {

    let loader = this.loadingCtrl.create({
      content: "Buscando Produtos..."
    });
    loader.present();
    
    this.webservice.getProdutos().subscribe(
      (res) => {
        this.produtos = res;
        loader.dismiss();
      }
    );

  }

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readProdutos();
      refresher.complete();
      
    }, 2000);
  }
}

