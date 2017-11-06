import { Janela } from './../../models/janela.model';
import { AddMudancaPage } from './../addMudanca/addMudanca';
import { TarefaPage } from './../tarefa/tarefa';
import { Component } from '@angular/core';
import { WsJanelas } from '../../providers/wsJanelas';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Ambiente } from "../../models/ambiente.model";
import { AddAmbientePage } from "../addAmbiente/addAmbiente";
import { Produto } from "../../models/produto.model";
import { AddProdutoPage } from "../addProduto/addProduto";
import { AmbientePage } from "../ambiente/ambiente";
import { EmpresaPage } from "../empresa/empresa";


@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html'
})
export class ProdutoPage {

  produtos: Produto[] = [];

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParam: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

  }

  itemTapped(event, produto) {
    // this.navCtrl.push(AddProdutoPage, {
    //   produto: produto
    // });
    
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

  ionViewDidEnter() {
    this.readProdutos();
  }

  readProdutos() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );

    this.produtos = [];
    let element = new Produto();
    let element2 = new Produto();
    let element3 = new Produto();
    let element4 = new Produto();

    
    element.title = "CRM";
    this.produtos.push(element);

    
    element2.title = "TOTVS12";
    this.produtos.push(element2);

    
    element3.title = "SERVICOS";
    this.produtos.push(element3);

    element4.title = "SSIM";
    this.produtos.push(element4);
  }

  // startJanela(janela){

  //   this.webservice.startJanela(janela).subscribe(
  //     (res) => {
  //       this.readAmbientes();
  //       this.showAlert('Testes iniciados!');
  //     },
  //     (err) => {
  //       this.showErrorAlert(err);
  //     }
  //   ); 
  // }

  // resultJanela(janela){

  //   this.navCtrl.push(StatusPage, {
  //     janela: janela
  //   });

  // }

showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readProdutos();
      refresher.complete();
      
    }, 2000);
  }
}

