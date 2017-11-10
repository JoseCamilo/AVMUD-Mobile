import { Component } from '@angular/core';
import { WsAvisos } from '../../providers/wsAvisos';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Aviso } from "../../models/aviso.model";
import { AddAvisoPage } from "../addAviso/addAviso";


@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html'
})
export class AvisoPage {

  avisos: Aviso[] = [];

  constructor(public webservice: WsAvisos, private toastCtrl: ToastController, public navParam: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
    this.readAvisos();
  }

  readAvisos() {

    this.webservice.getAvisos().subscribe(
      (res) => {
        this.avisos = res;
      }
    );
  }

  addAviso() {
    this.navCtrl.push(AddAvisoPage, {});
  }

  itemTapped(event, janela) {
    // this.navCtrl.push(TarefaPage, {
    //   janela: janela
    // });
  } 

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readAvisos();
      refresher.complete();
      
    }, 2000);
  }
}

