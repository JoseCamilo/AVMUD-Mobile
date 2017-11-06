import { Janela } from './../../models/janela.model';

import { TarefaPage } from './../tarefa/tarefa';
import { Component } from '@angular/core';
import { WsJanelas } from '../../providers/wsJanelas';
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

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    }

    this.readMudancas();
  }

  addMudanca() {
    this.navCtrl.push(AddMudancaPage, {
      janela: this.janela
    });
  }

  itemTapped(event, mudanca) {
    this.navCtrl.push(TarefaPage, {
      mudanca: mudanca
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

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );

    this.mudancas = [];

    let element = new Mudanca();
    let element2 = new Mudanca();
    let element3 = new Mudanca();
    
    element._id = "1";
    element.title = "Projeto Intera";
    element.status = "erro";
    element.descricao = "Cliente: Estratégia Comercial" + "\n" +
                        "Analista TI: Marcio Tiltscher"+ "\n" +
                        "Descrição da Demanda: Proposta de migração intera com valor de reajuste negativo.";
    element.Result = "Executada em 06/10/2017 21:34";
    this.mudancas.push(element);
    
    element2._id = "2";
    element2.title = "Manutenção MTI-6565";
    element2.status = "ok";
    element2.descricao = "Cliente: Engenharia Corporativa"+ "\n" +
                          "Analista TI: Moises Osti"+ "\n" +
                        "Descrição da Demanda: Ajustar sincronismo com os novos campos.";
    element2.Result = "Executada em 06/10/2017 21:34";
    this.mudancas.push(element2);

    element3._id = "3";
    element3.title = "Projeto Regras de Dependência";
    element3.status = "ok";
    element3.descricao = "Cliente: Modelos de Negócios"+ "\n" +
                        "Analista TI: Eder Oliveira" + "\n" +
                        "Descrição da Demanda: Validação das Regras de Dependência na gravação da proposta";
    element3.Result = "Executada em 06/10/2017 21:34";
    this.mudancas.push(element3);
  }

  startMudanca(mudanca){

    // this.webservice.startJanela(janela).subscribe(
    //   (res) => {
    //     this.readMudancas();
    //     this.showAlert('Testes iniciados!');
    //   },
    //   (err) => {
    //     this.showErrorAlert(err);
    //   }
    // ); 

        
    for (var index = 0; index < this.mudancas.length; index++) {
      if(this.mudancas[index]._id === mudanca._id){
        this.mudancas[index].status = "executando";
        console.log("execut ",index);
      }
      
    }
  
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

