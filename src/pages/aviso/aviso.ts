import { Janela } from './../../models/janela.model';
import { AddMudancaPage } from './../addMudanca/addMudanca';
import { TarefaPage } from './../tarefa/tarefa';
import { Component } from '@angular/core';
import { WsJanelas } from '../../providers/wsJanelas';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Aviso } from "../../models/aviso.model";
import { StatusPage } from "../status/status";
import { AddAvisoPage } from "../addAviso/addAviso";


@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html'
})
export class AvisoPage {

  avisos: Aviso[] = [];

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParam: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

  }

  addAviso() {
    this.navCtrl.push(AddAvisoPage, {});
  }

  itemTapped(event, janela) {
    // this.navCtrl.push(TarefaPage, {
    //   janela: janela
    // });
  }

  ionViewDidEnter() {
    this.readAvisos();
  }

  readAvisos() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );
    this.avisos = [];

    let elemento = new Aviso();
    
    elemento.title = "Reaplicação TOTVS12";
    elemento.comentario = "Nos testes em pré produção no TOTVS12, foram apontados falhas de compilação e estamos reaplicando a Janela. Mensagem enviada em 03/10/2017 14:31";
    this.avisos.push(elemento);

    let elemento2 = new Aviso();
    
    elemento2.title = "Pré Produção Fora CRM/TOTVS12";
    elemento2.comentario = "Nosso ambiente de pré produção está sendo atualizado com dados de produção. Previsão de entrega: 02/10/2017 9:00. Mensagem enviada em 28/09/2017 11:31";
    this.avisos.push(elemento2);

    let elemento3 = new Aviso();
    
    elemento3.title = "Pré produção CRM/TOTVS12";
    elemento3.comentario = "Ambientes pré produção atualizados. Mensagem enviada em 13/09/2017 18:31";
    this.avisos.push(elemento3);



  }

  
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
      this.readAvisos();
      refresher.complete();
      
    }, 2000);
  }
}

