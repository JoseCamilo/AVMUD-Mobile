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


@Component({
  selector: 'page-ambiente',
  templateUrl: 'ambiente.html'
})
export class AmbientePage {

  ambientes: Ambiente[] = [];
  produto: Produto = new Produto();

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

    if (navParams.get('produto')) {
      this.produto = navParams.get('produto') as Produto;
    }

    this.readAmbientes();

  }


  itemTapped(event, ambiente) {
    this.navCtrl.push(AddAmbientePage, {
      ambiente: ambiente
    });
  }

  addAmbiente(){
    this.navCtrl.push(AddAmbientePage, {});
  }

  ionViewDidEnter() {
    this.readAmbientes();
  }

  readAmbientes() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );

    this.ambientes = [];
    let element = new Ambiente();
    let element2 = new Ambiente();
    let element3 = new Ambiente();
    let element4 = new Ambiente();

    element._id = "1";
    element.title = "Homologação 198";
    element.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element.fase = "Homologação";
    this.ambientes.push(element);

    element2._id = "1";
    element2.title = "Pré Oficial";
    element2.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element2.fase = "Pré-Produção";
    this.ambientes.push(element2);

    element3._id = "1";
    element3.title = "Produção Oficial";
    element3.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element3.fase = "Produção";
    this.ambientes.push(element3);

    element4._id = "1";
    element4.title = "Homologação 191";
    element4.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element4.fase = "Homologação";
    this.ambientes.push(element4);
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
      this.readAmbientes();
      refresher.complete();
      
    }, 2000);
  }
}

