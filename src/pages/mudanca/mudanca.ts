import { Janela } from './../../models/janela.model';
import { TarefaPage } from './../tarefa/tarefa';
import { Component } from '@angular/core';
import { WsMudancas } from '../../providers/wsMudancas';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Mudanca } from "../../models/mudanca.model";
import { AddMudancaPage } from "../addMudanca/addMudanca";
import { StatusPage } from "../status/status";
import { AddJanelaPage } from "../addJanela/addJanela";



@Component({
  selector: 'page-mudanca',
  templateUrl: 'mudanca.html'
})
export class MudancaPage {

  mudancas: Mudanca[] = [];
  janela: Janela = new Janela();
  msg: Object;

  constructor(public webservice: WsMudancas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    }
  }

  addMudanca() {
    this.navCtrl.push(AddMudancaPage, {
      janela: this.janela
    },{isNavRoot: false});
  }

  itemTapped(event, mudanca) {
    this.navCtrl.push(TarefaPage, {
      mudanca: mudanca,
      janela: this.janela
    });
  }

  editJanela(){
    this.navCtrl.push(AddJanelaPage, {
      janela: this.janela
    });
  }

  ionViewDidEnter() {
    this.readMudancas();
  }

  readMudancas() {
    this.webservice.getMudancas(this.janela._id).subscribe(
      (res) => {
        this.mudancas = res;
      }
    );
  }

  startMudanca(mudanca){

    this.webservice.startMudanca(mudanca).subscribe(
      (res) => {
        this.readMudancas();
        this.showAlert('Testes iniciados!');
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );
  
  }

  resultMudanca(mudanca){

    this.navCtrl.push(StatusPage, {
      mudanca: mudanca
    });

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
      this.readMudancas();
      refresher.complete();
      
    }, 2000);
  }
}

