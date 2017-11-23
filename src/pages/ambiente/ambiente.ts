import { Component } from '@angular/core';
import { WsAmbientes } from '../../providers/wsAmbientes';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { Ambiente } from "../../models/ambiente.model";
import { AddAmbientePage } from "../addAmbiente/addAmbiente";
import { Produto } from "../../models/produto.model";


@Component({
  selector: 'page-ambiente',
  templateUrl: 'ambiente.html'
})
export class AmbientePage {

  ambientes: Ambiente[] = [];
  produto: Produto = new Produto();

  constructor(public webservice: WsAmbientes, private toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

    if (navParams.get('produto')) {
      this.produto = navParams.get('produto') as Produto;
    }

  }

  ionViewDidEnter() {
    this.readAmbientes();
  }

  readAmbientes() {

    let loader = this.loadingCtrl.create({
      content: "Buscando Ambientes..."
    });
    loader.present();

    this.webservice.getAmbientes(this.produto._id).subscribe(
      (res) => {
        this.ambientes = res;
        loader.dismiss();
      }
    );

  }

  itemTapped(event, ambiente) {
    this.navCtrl.push(AddAmbientePage, {
      ambiente: ambiente
    });
  }

  addAmbiente(){
    this.navCtrl.push(AddAmbientePage, {
      produto: this.produto
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
      subTitle: msg,
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

