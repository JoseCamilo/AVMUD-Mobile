import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Janela } from "../../models/janela.model";
import { MudancaPage } from "../mudanca/mudanca";
import { AddJanelaPage } from "../addJanela/addJanela";
import { StatusPage } from "../status/status";
import { WsJanelas } from "../../providers/wsJanelas";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  janelas: Janela[] = [];

  
  constructor(public navCtrl: NavController, public platform: Platform, public webservice: WsJanelas, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    
  }


  ionViewDidEnter() {
    this.readJanelas();

  }

  addJanela() {
    this.navCtrl.push(AddJanelaPage, {});
  }
  
  itemTapped(event, janela) {
    this.navCtrl.push(MudancaPage, {
      janela: janela
    });
  }

  readJanelas() {

    let loaderJanela = this.loadingCtrl.create({
      content: "Buscando Janelas..."
    });
    loaderJanela.present();

    this.webservice.getJanelas().subscribe(
      (res) => {
        this.janelas = res;
        loaderJanela.dismiss();
      },
      (err) => {
        loaderJanela.dismiss();
        this.showErrorAlert("Não foi possível buscar Janelas!");
      }
    );
             
  }

  resultJanela(janela){

    this.navCtrl.push(StatusPage, {
      janela: janela
    });

  }
  
  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readJanelas();
      refresher.complete();
      
    }, 2000);
  }

  startJanela(janela){
    this.webservice.startJanela(janela).subscribe(
      (res) => {
        this.readJanelas();
        this.showAlert('Testes iniciados!');
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );
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
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}