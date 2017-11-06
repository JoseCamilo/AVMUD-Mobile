import { Tarefa } from './../../models/tarefa.model';
import { Component } from '@angular/core';
import { WsJanelas } from '../../providers/wsJanelas';
import { WsTarefas } from '../../providers/wsTarefas';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { Janela } from "../../models/janela.model";
import { Mudanca } from "../../models/mudanca.model";
import { AddTarefaPage } from "../addTarefa/addTarefa";
import { StatusPage } from "../status/status";
import { AddMudancaPage } from "../addMudanca/addMudanca";


@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html'
})
export class TarefaPage {

  tarefas: Tarefa[] = [];
  mudanca: Mudanca = new Mudanca();

  constructor(public wsJanelas: WsJanelas, public wsTarefas: WsTarefas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    }
  }

  addTarefa(){
    this.navCtrl.push(AddTarefaPage,{});
  }

  itemTapped(event, tarefa) {
    this.navCtrl.push(AddTarefaPage, {
      tarefa: tarefa
    });
  }

  ionViewDidEnter() {
    this.readTarefas();
  }

  readTarefas() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );
    this.tarefas = [];

    let element = new Tarefa();
    let element2 = new Tarefa();
    let element3 = new Tarefa();

    element._id = "1";
    element.type = "campo";
    element.status = "ok";
    element.alias = "SA1";
    element.field = "A1_XSELCT";
    element.Result = [{mensagem: "Campo físico criado"}];
    this.tarefas.push(element);

    element2._id = "2";
    element2.type = "arquivo";
    element2.status = "ok";
    element2.path = "/workflow/FT600CRF.HTM";
    element2.Result = [{mensagem: "Arquivo encontrado no servidor"}];
    this.tarefas.push(element2);

    element3._id = "3";
    element3.type = "parametro";
    element3.status = "erro";
    element3.SX6 = {x6_var:"TI_PARAM",
                        x6_conteud:"55;RT;9I",
                        x6_contspa:"55;RT;9I",
                        x6_conteng:"55;RT;9I"};
    element3.Result = [{mensagem: "Parametro não existe no ambiente"}];
    this.tarefas.push(element3);

    let element4 = new Tarefa();
    let element5 = new Tarefa();
    let element6 = new Tarefa();

    element4._id = "4";
    element4.type = "campo";
    element4.status = "erro";
    element4.alias = "SB1";
    element4.field = "B1_ATRAVA";
    element4.Result = [{mensagem: "Campo físico não criado"}];
    this.tarefas.push(element4);

    element5._id = "5";
    element5.type = "arquivo";
    element5.status = "erro";
    element5.path = "/system/DocAR/por_trad_capa.dot";
    element5.Result = [{mensagem: "Arquivo não encontrado no servidor"}];
    this.tarefas.push(element5);

    element6._id = "6";
    element6.type = "parametro";
    element6.status = "ok";
    element6.SX6 = {x6_var:"PS_TUTORA",
                        x6_conteud:"andre.miller@totvs.com.br",
                        x6_contspa:"andre.miller@totvs.com.br",
                        x6_conteng:"andre.miller@totvs.com.br"};
    element6.Result = [{mensagem: "Parametro confirmado"}];
    this.tarefas.push(element6);
  }

  resultTarefa(tarefa){

    this.navCtrl.push(StatusPage, {
      tarefa: tarefa
    });

  }

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readTarefas();
      refresher.complete();
      
    }, 2000);
  }

  jiraMudanca(){
    this.showConfirmJira();
  }

  showConfirmJira() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Jira',
      message: 'Enviar a Mudança '+ this.mudanca.title +' para o Jira em PAM-789?' ,
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

  editMudanca(){
    this.navCtrl.push(AddMudancaPage, {
      mudanca: this.mudanca
    });
  }

  startTarefa(tarefa){
    console.log(this.tarefas);
    console.log(tarefa);
    
    for (var index = 0; index < this.tarefas.length; index++) {
      if(this.tarefas[index]._id === tarefa._id){
        this.tarefas[index].status = "executando";
        console.log("execut ",index);
      }
      
    }
  }

}
