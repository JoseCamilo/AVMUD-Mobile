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
import { Empresa } from "../../models/empresa.model";
import { AddEmpresaPage } from "../addEmpresa/addEmpresa";


@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html'
})
export class EmpresaPage {

  empresas: Empresa[] = [];
  produto: Produto = new Produto();

  constructor(public webservice: WsJanelas, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController) {

    if (navParams.get('produto')) {
      this.produto = navParams.get('produto') as Produto;
    }

    this.readEmpresas();

  }


  itemTapped(event, empresa) {
    this.navCtrl.push(AddEmpresaPage, {
      empresa: empresa
    });
  }

  addEmpresa(){
    this.navCtrl.push(AddEmpresaPage, {});
  }

  ionViewDidEnter() {
    this.readEmpresas();
  }

  readEmpresas() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );

    this.empresas = [];
    let element = new Empresa();
    let element2 = new Empresa();
    let element3 = new Empresa();
    let element4 = new Empresa();

    element._id = '1';
    element.title = "Matriz";
    element.codSM0 = "00";
    element.envServer = "";
    this.empresas.push(element);

    element2._id = '2';
    element2.title = "MI Mexico";
    element2.codSM0 = "03";
    element2.envServer = "TOTVS_MI";
    this.empresas.push(element2);

    element3._id = '3';    
    element3.title = "MI Argentina";
    element3.codSM0 = "04";
    element3.envServer = "TOTVS_MI";
    this.empresas.push(element3);

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
      this.readEmpresas();
      refresher.complete();
      
    }, 2000);
  }
}

