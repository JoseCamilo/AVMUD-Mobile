import { Tarefa } from './../../models/tarefa.model';
import { Component } from '@angular/core';
import { WsTarefas } from '../../providers/wsTarefas';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { Mudanca } from "../../models/mudanca.model";
import { AddTarefaPage } from "../addTarefa/addTarefa";
import { StatusPage } from "../status/status";
import { AddMudancaPage } from "../addMudanca/addMudanca";
import { Janela } from "../../models/janela.model";


@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html'
})
export class TarefaPage {

  tarefas: Tarefa[] = [];
  mudanca: Mudanca = new Mudanca();
  janela: Janela = new Janela();

  constructor(public webservice: WsTarefas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();
    }

    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    } else {
      this.janela = Janela.adatp();
    }
  }

  ionViewDidEnter() {
    this.readTarefas();
  }

  readTarefas() {
    this.webservice.getTarefas(this.mudanca._id).subscribe(
      (res) => {
        this.tarefas = res;
      }
    );
  }

  addTarefa(){
    this.navCtrl.push(AddTarefaPage,{
      mudanca: this.mudanca
    });
  }

  itemTapped(event, tarefa) {
    this.navCtrl.push(AddTarefaPage, {
      tarefa: tarefa
    });
  }

  resultTarefa(tarefa){

    this.navCtrl.push(StatusPage, {
      tarefa: tarefa
    });

  }

  editMudanca(){
    this.navCtrl.push(AddMudancaPage, {
      mudanca: this.mudanca,
      janela: this.janela
    },
    {
      isNavRoot: false
    });
  }

  startTarefa(tarefa){

  }

// REFRESHER
  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readTarefas();
      refresher.complete();
      
    }, 2000);
  }
//--FIM REFRESHER

// ALERTAS
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
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
  //-- FIM ALERTAS

  //JIRA
  jiraMudanca(){
    this.showConfirmJira();
  }

  showConfirmJira() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Jira',
      message: 'Enviar a Mudança '+ this.mudanca.title +' para o Jira em '+this.mudanca.idPAM+'?' ,
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {
            
            this.presentLoading();
            
          }
        }
      ]
    });
    confirm.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Criando Sub-Task no Jira..."
    });
    loader.present();

    setTimeout(() => {
      loader.dismiss();
      this.showAlert('PAM-803 criada para a Mudança: '+this.mudanca.title);
    }, 10000);
  }
  //-- FIM JIRA

}
