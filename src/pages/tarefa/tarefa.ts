import { Tarefa } from './../../models/tarefa.model';
import { Component } from '@angular/core';
import { WsTarefas } from '../../providers/wsTarefas';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Mudanca } from "../../models/mudanca.model";
import { AddTarefaPage } from "../addTarefa/addTarefa";
import { StatusPage } from "../status/status";
import { AddMudancaPage } from "../addMudanca/addMudanca";
import { Janela } from "../../models/janela.model";
import { AddJiraPage } from "../addJira/addJira";
import { WsJira } from "../../providers/wsJira";


@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html'
})
export class TarefaPage {

  tarefas: Tarefa[] = [];
  mudanca: Mudanca = new Mudanca();
  janela: Janela = new Janela();

  constructor(public webservice: WsTarefas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, 
              public viewCtrl: ViewController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public wsJira: WsJira) {
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
    let loaderTarefa = this.loadingCtrl.create({
      content: "Buscando Tarefas..."
    });
    loaderTarefa.present();

    this.webservice.getTarefas(this.mudanca._id).subscribe(
      (res) => {
        this.tarefas = res;
        loaderTarefa.dismiss();
      },
      (err) => {
        loaderTarefa.dismiss();
        this.showErrorAlert("Não foi possível buscar tarefas!");
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
      tarefa: tarefa,
      mudanca: this.mudanca
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
    console.log("start", tarefa);
    this.webservice.startTarefa(tarefa).subscribe(
      (res) => {
        this.readTarefas();
        this.showAlert('Testes iniciados!');
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );
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
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  //-- FIM ALERTAS

  //JIRA
  jiraMudanca(){

    if(this.mudanca.idSubTaskPAM){
      this.showConfirmtarefas();
    }else{
      let modal = this.modalCtrl.create(AddJiraPage, {mudanca: this.mudanca});
      modal.present();
    }
  }

  showConfirmtarefas() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Jira',
      message: 'Deseja enviar as tarefas para a PAM: ' + this.mudanca.idSubTaskPAM + '?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loaderJira = this.loadingCtrl.create({
              content: "Enviando a Tarefas para o Jira..."
            });
            loaderJira.present();

            that.wsJira.anexarItens(that.mudanca).subscribe(
              (res) => {
                loaderJira.dismiss();
                that.showAlert('Tarefas Enviadas!');
              },
              (err) => {
                loaderJira.dismiss();
                that.showErrorAlert(err);
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }
}
