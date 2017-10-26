import { Janela } from './../../models/janela.model';
import { AddMudancaPage } from './../addMudanca/addMudanca';
import { TarefaPage } from './../tarefa/tarefa';
import { Component } from '@angular/core';
import { WsJanelas } from '../../providers/wsJanelas';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Ambiente } from "../../models/ambiente.model";
import { AddAmbientePage } from "../addAmbiente/addAmbiente";


@Component({
  selector: 'page-ambiente',
  templateUrl: 'ambiente.html'
})
export class AmbientePage {

  ambientes: Ambiente[] = [];

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParam: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

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

    
    element.title = "CRM";
    element.producao = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element.preprod = "http://pre-erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element.homolog = "http://172.16.93.182:8080/ws_ssimxtfs/";
    this.ambientes.push(element);

    
    element2.title = "TOTVS12";
    element2.producao = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element2.preprod = "http://pre-erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element2.homolog = "http://172.16.93.182:8080/ws_ssimxtfs/";
    this.ambientes.push(element2);

    
    element3.title = "SERVICOS";
    element3.producao = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element3.preprod = "http://pre-erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element3.homolog = "http://172.16.93.182:8080/ws_ssimxtfs/";
    this.ambientes.push(element3);

    element4.title = "SSIM";
    element4.producao = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element4.preprod = "http://pre-erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element4.homolog = "http://172.16.93.182:8080/ws_ssimxtfs/";
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

